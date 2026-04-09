import type { Persona } from '../../types';
import { simulateWorkday } from './workday';
import { simulateJira } from './jira';
import { simulateBenefits } from './benefits';
import { simulateZhub } from './zhub';
import { simulateItAccess } from './itAccess';
import { simulateBuddy } from './buddy';

export function handleToolCall(toolName: string, input: Record<string, any>, persona: Persona) {
  switch (toolName) {
    case 'workday_training': return simulateWorkday(input, persona);
    case 'jira_ticket': return simulateJira(input, persona);
    case 'benefits_lookup': return simulateBenefits(input, persona);
    case 'zhub_search': return simulateZhub(input, persona);
    case 'it_provisioning': return simulateItAccess(input, persona);
    case 'buddy_connect': return simulateBuddy(input, persona);
    default: return { error: `Unknown tool: ${toolName}` };
  }
}
