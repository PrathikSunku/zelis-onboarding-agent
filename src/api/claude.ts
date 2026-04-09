import type { ChatMessage, Persona, ToolCallResult } from '../types';

const API_URL = 'http://localhost:3001/api/chat';

interface ChatResponse {
  response: string;
  toolCalls: ToolCallResult[];
}

export async function sendMessage(
  messages: { role: 'user' | 'assistant'; content: string }[],
  persona: Persona
): Promise<ChatResponse> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, persona }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `API error: ${res.status}`);
  }

  return res.json();
}
