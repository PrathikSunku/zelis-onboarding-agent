import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { toolDefinitions } from './src/agents/tools.ts';
import { handleToolCall } from './src/agents/simulators/index.ts';
import { buildSystemPrompt } from './src/agents/orchestrator.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(path.join(__dirname, '.env'), 'utf-8');
for (const line of envContent.split('\n')) {
  const idx = line.indexOf('=');
  if (idx > 0) process.env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
}

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/api/chat', async (req, res) => {
  const { messages, persona } = req.body;

  try {
    // Initial call to Claude with tools
    let response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: buildSystemPrompt(persona),
      tools: toolDefinitions as any,
      messages,
    });

    const allToolCalls: any[] = [];

    // Agentic loop: keep processing tool calls until Claude gives a final text response
    while (response.stop_reason === 'tool_use') {
      const toolUseBlocks = response.content.filter((b: any) => b.type === 'tool_use');
      const toolResults: any[] = [];

      for (const block of toolUseBlocks) {
        const result = handleToolCall(block.name, block.input as any, persona);
        allToolCalls.push({ name: block.name, input: block.input, result });
        toolResults.push({
          type: 'tool_result' as const,
          tool_use_id: block.id,
          content: JSON.stringify(result),
        });
      }

      // Continue the conversation with tool results
      response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: buildSystemPrompt(persona),
        tools: toolDefinitions as any,
        messages: [
          ...messages,
          { role: 'assistant', content: response.content },
          { role: 'user', content: toolResults },
        ],
      });
    }

    const textBlock = response.content.find((b: any) => b.type === 'text');
    res.json({
      response: textBlock?.text || '',
      toolCalls: allToolCalls,
    });
  } catch (error: any) {
    console.error('Claude API error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Zelis Onboarding API proxy running on http://localhost:${PORT}`);
});
