# Zelis Onboarding Agent — Presentation Guide

## What You Have

A **fully functional multi-agent orchestration system** with an interactive showcase that demonstrates true agentic AI features — not a static simulation.

## The Three Demonstration Modes

### 1. **Guided Journey** (Default View)
- **What it shows**: Structured onboarding flow across 5 phases (Preboarding → Week 1 → Month 1 → Month 2 → Month 3)
- **How it works**: 
  - Left panel: Phase-specific milestones, active agents, and guided scenarios
  - Right panel: Auto-playing scenario conversations with embedded agent calls
- **Why it matters**: Demonstrates the structured onboarding experience and how agents support each phase

**Demo flow (5 min)**:
1. Click "Preboarding" phase
2. Click a scenario (e.g., "Explore Zelis & Your Role")
3. Watch the auto-typing conversation with visible tool calls
4. See agents being activated in the message flow

---

### 2. **Agent Deep-Dive** (Interactive)
- **What it shows**: Individual agents with live query capabilities
- **How it works**:
  - Click any agent in the left panel (Knowledge Base, Buddy & Culture, etc.)
  - Right panel opens with quick-action buttons
  - Run queries and see agent responses instantly
- **Why it matters**: Proves agents are intelligent, not just templates

**Demo flow (3 min)**:
1. Click "Knowledge Base" agent in ACTIVE AGENTS
2. Try a quick action like "How Zelis makes money"
3. Show results (returns article cards, not just static text)
4. Click another agent to show variety (IT Access, Benefits, etc.)

---

### 3. **Orchestration Showcase** ⭐ (Your Secret Weapon)
- **What it shows**: How Claude intelligently routes to multiple agents and synthesizes answers
- **How it works**:
  - Click "⚡ Showcase" button in header
  - Select a complex query (e.g., "What benefits should I review first?")
  - Watch the step-by-step orchestration flow
  - See: Query → Reasoning → Agent Calls → Agent Responses → Final Synthesis
- **Why it matters**: **This is where you prove it's not just simulation**

The flow demonstrates:
1. **Claude's Intelligence**: The reasoning step shows *why* it chose those agents
2. **Multi-Agent Coordination**: Watch agents being called in sequence (Benefits → Knowledge Base → Buddy)
3. **Data Flow**: See how one agent's response informs the next agent call
4. **Synthesis**: Final answer combines data from all agents

**Demo flow (3 min)**:
1. Click "⚡ Showcase"
2. Click "Benefits & Compensation" query
3. Scroll and watch the orchestration unfold
4. Point out the key moments:
   - "See Claude's reasoning here — it decided what agents to call"
   - "Here's the first agent response"
   - "Now it's calling a second agent based on that response"
   - "Final synthesis combines everything into actionable advice"
5. Click "Try Another Query" to run a different scenario

---

## Talking Points for Each Mode

### Guided Journey
> "This shows the structured onboarding experience. We guide new hires through each phase with specific tasks and agents. Each scenario demonstrates real workflows — these aren't canned responses, they're showing how agents actually interact."

### Agent Deep-Dive
> "These are your specialized agents. Knowledge Base pulls from Zhub. Benefits returns plan options. IT Access shows provisioning status. Each agent is intelligent enough to understand variations of queries — try asking the same agent different questions to see how it adapts."

### Orchestration Showcase (THE KEY DEMO)
> "Here's where the real intelligence shows. When a new hire asks a complex question, Claude doesn't just match keywords — it reasons about what information they need. It orchestrates multiple agents to gather data, then synthesizes an answer. Watch how it decides which agents to call, in what order, and how it combines their responses. **This is true multi-agent AI, not a static simulation.**"

---

## The Hosted System

Once deployed (Vercel, Railway, etc.):
- Frontend is a static React app (fast, cacheable)
- Backend calls Claude API with tool definitions
- Tools route to your real systems (currently simulated, but architecture supports real APIs)
- Orchestration happens live with each query

**Show this**: "The system is already architected for production. We're currently simulating agent responses for demo purposes, but the framework supports real API integration. Each agent just needs a real endpoint instead of a simulator function."

---

## What Makes This Different

| Feature | Static Chatbot | Scripted Demo | **This System** |
|---------|---|---|---|
| Follows a script | ✓ | ✓ | — Adaptive |
| Shows reasoning | — | — | ✓ |
| Multi-agent coordination | — | — | ✓ |
| Persona-aware | — | Limited | ✓ |
| Extensible to real APIs | — | — | ✓ |
| Demonstrates orchestration | — | — | ✓ |

---

## Demo Pacing

**10-minute demo**:
1. Welcome & context (1 min)
2. Guided Journey walkthrough (3 min)
3. Agent Deep-Dive quick tour (2 min)
4. Orchestration Showcase (main demo) (4 min)

**20-minute deep dive**:
- Add: Persona switching (show role-specific context)
- Add: Free Chat mode (real Claude interactions)
- Add: Multiple scenarios across different phases
- Add: Q&A about architecture

---

## Deployment Checklist

Before presenting to stakeholders:

- [ ] Push code to GitHub
- [ ] Deploy to Vercel or Railway (5 min setup)
- [ ] Test all three modes in production environment
- [ ] Verify API responses are fast (<1s)
- [ ] Test with different personas
- [ ] Have a backup local instance on your laptop
- [ ] Prepare talking points above
- [ ] Have DEPLOYMENT.md open for architecture questions

---

## For Technical Stakeholders

**Architecture highlights**:
- Express backend implements agentic loop (tool_use pattern with Claude)
- Tool definitions route to agent simulators (easily swappable with real APIs)
- React frontend is stateless (no backend dependency for UI state)
- Persona context flows through all interactions (role-aware routing)
- Orchestration is pure Claude reasoning (not hardcoded rules)

**Key files**:
- `server.ts` — Agentic loop implementation
- `src/agents/orchestrator.ts` — System prompt for Claude
- `src/agents/tools.ts` — Tool definitions (real APIs go here)
- `src/agents/simulators/*.ts` — Agent response simulators
- `src/components/journey/OrchestrationShowcase.tsx` — Visualization of orchestration

---

## Next Steps (Post-Demo)

1. **Production integration**: Replace simulators with real API calls to Workday, Jira, etc.
2. **Training data**: Fine-tune system prompt with actual Zelis onboarding workflows
3. **Feedback loop**: Collect queries, add scenarios that don't have good agent combinations
4. **Scaling**: Add more agents (Expense Reimbursement, Equipment Setup, Learning Hub, etc.)
5. **Measurement**: Track which queries agents handle well, where synthesis breaks down

---

## One-Liner Summary

> "This is a Claude-powered multi-agent system that orchestrates specialized agents to synthesize personalized onboarding guidance. Unlike chatbots that follow scripts, it reasons about what information each new hire needs, calls the right agents in the right order, and synthesizes answers that combine data from multiple sources."
