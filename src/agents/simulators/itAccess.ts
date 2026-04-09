import type { Persona } from '../../types';

export function simulateItAccess(input: Record<string, any>, persona: Persona) {
  const baseSystems = [
    { name: 'Email (Outlook)', status: 'provisioned', accessDate: '2026-04-07' },
    { name: 'Microsoft Teams', status: 'provisioned', accessDate: '2026-04-07' },
    { name: 'Workday', status: 'provisioned', accessDate: '2026-04-07' },
    { name: 'Zhub (SharePoint)', status: 'provisioned', accessDate: '2026-04-07' },
    { name: 'Jira', status: 'provisioned', accessDate: '2026-04-07' },
    { name: 'Viva Engage', status: 'provisioned', accessDate: '2026-04-07' },
    { name: 'VPN', status: persona.phase === 'day_one' ? 'pending' : 'provisioned', accessDate: persona.phase === 'day_one' ? null : '2026-04-08' },
  ];

  const roleSystems: Record<string, any[]> = {
    'Sales & Client Management': [
      { name: 'Salesforce', status: 'pending_approval', estimatedDate: '2026-04-11', approver: 'Lisa Rodriguez' },
      { name: 'Gainsight', status: 'not_requested', estimatedDate: null },
      { name: 'ZoomInfo', status: 'pending', estimatedDate: '2026-04-10' },
    ],
    'ZEDI': [
      { name: 'GitHub Enterprise', status: 'provisioned', accessDate: '2026-04-01' },
      { name: 'AWS Console', status: 'pending_approval', estimatedDate: '2026-04-09', approver: 'Ananya Sharma' },
      { name: 'Datadog', status: 'pending', estimatedDate: '2026-04-10' },
      { name: 'Jenkins', status: 'pending', estimatedDate: '2026-04-10' },
    ],
    'Payments Optimization': [
      { name: 'Payment Processing Portal', status: 'pending', estimatedDate: '2026-04-12' },
      { name: 'Provider Database', status: 'pending_approval', estimatedDate: '2026-04-11', approver: 'Karen Phillips' },
    ],
  };

  switch (input.action) {
    case 'check_status':
      if (input.system_name) {
        const all = [...baseSystems, ...(roleSystems[persona.department] || [])];
        const system = all.find(s => s.name.toLowerCase().includes(input.system_name.toLowerCase()));
        if (system) return { source: 'IT Fulfillment', system };
        return { source: 'IT Fulfillment', message: `System "${input.system_name}" not found in your access profile. You may need to request access.` };
      }
      return {
        source: 'IT Fulfillment',
        employee: persona.name,
        department: persona.department,
        standardAccess: baseSystems,
        roleBasedAccess: roleSystems[persona.department] || [],
        summary: {
          provisioned: baseSystems.filter(s => s.status === 'provisioned').length,
          pending: [...baseSystems, ...(roleSystems[persona.department] || [])].filter(s => s.status !== 'provisioned').length,
        },
      };

    case 'request_access':
      return {
        source: 'IT Fulfillment',
        request: {
          system: input.system_name || 'Unknown',
          status: 'submitted',
          ticketId: `ZEL-${Math.floor(1050 + Math.random() * 50)}`,
          estimatedProvisioning: '2-3 business days',
          requiresApproval: true,
          approver: persona.manager,
          message: `Access request for ${input.system_name} has been submitted. Your manager ${persona.manager} will be notified for approval.`,
        },
      };

    case 'list_systems':
      return {
        source: 'IT Fulfillment',
        availableSystems: [
          'Salesforce', 'Gainsight', 'ZoomInfo', 'GitHub Enterprise', 'AWS Console',
          'Datadog', 'Jenkins', 'Payment Processing Portal', 'Provider Database',
          'Tableau', 'Power BI', 'Confluence (extended)', 'Adobe Creative Suite',
        ],
        message: 'These are systems available for request. Your manager must approve role-based access.',
      };

    default:
      return { error: 'Unknown action' };
  }
}
