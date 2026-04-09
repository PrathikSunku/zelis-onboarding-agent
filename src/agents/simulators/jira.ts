import type { Persona } from '../../types';

let ticketCounter = 1042;

export function simulateJira(input: Record<string, any>, persona: Persona) {
  switch (input.action) {
    case 'create':
      ticketCounter++;
      return {
        source: 'Jira Service Desk',
        ticket: {
          id: `ZEL-${ticketCounter}`,
          summary: input.summary || 'New hire support request',
          category: input.category || 'IT',
          status: 'Open',
          priority: 'Medium',
          assignee: input.category === 'IT' ? 'IT Service Desk' : input.category === 'P&C' ? 'People & Culture Operations' : 'Support Team',
          reporter: persona.name,
          created: new Date().toISOString(),
          estimatedResponse: '4 business hours',
        },
        message: `Ticket ZEL-${ticketCounter} created successfully. The ${input.category || 'IT'} team will respond within 4 business hours.`,
      };

    case 'check_status':
      return {
        source: 'Jira Service Desk',
        ticket: {
          id: input.ticket_id || 'ZEL-1038',
          summary: 'System access request - Salesforce',
          status: 'In Progress',
          priority: 'High',
          assignee: 'IT Fulfillment Team',
          lastUpdate: '2026-04-08T14:30:00Z',
          comments: [
            { author: 'IT Support', text: 'Access request received. Provisioning in progress.', date: '2026-04-08T10:00:00Z' },
            { author: 'IT Support', text: 'Manager approval obtained. Completing setup.', date: '2026-04-08T14:30:00Z' },
          ],
        },
      };

    case 'list_open':
      return {
        source: 'Jira Service Desk',
        employee: persona.name,
        openTickets: [
          { id: 'ZEL-1038', summary: 'System access request - Salesforce', status: 'In Progress', category: 'IT', created: '2026-04-07' },
          { id: 'ZEL-1035', summary: 'VPN setup for remote access', status: 'Resolved', category: 'IT', created: '2026-04-07' },
        ],
        totalOpen: 1,
        totalResolved: 1,
      };

    default:
      return { error: 'Unknown action' };
  }
}
