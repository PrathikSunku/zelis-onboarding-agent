export const toolDefinitions = [
  {
    name: 'workday_training',
    description: 'Check training assignments, completion status, and compliance deadlines in Workday LMS. Use this when the new hire asks about training, courses, compliance requirements, or learning paths.',
    input_schema: {
      type: 'object' as const,
      properties: {
        action: {
          type: 'string',
          enum: ['check_assignments', 'check_compliance', 'search_courses', 'check_completion'],
          description: 'The action to perform in Workday LMS',
        },
        query: {
          type: 'string',
          description: 'Optional search query for courses or specific training topic',
        },
      },
      required: ['action'],
    },
  },
  {
    name: 'jira_ticket',
    description: 'Create or check Jira tickets for IT or People & Culture (P&C) support requests. Use when the new hire needs help with access issues, IT problems, or HR questions that need a specialist.',
    input_schema: {
      type: 'object' as const,
      properties: {
        action: {
          type: 'string',
          enum: ['create', 'check_status', 'list_open'],
          description: 'Create a new ticket, check status, or list open tickets',
        },
        category: {
          type: 'string',
          enum: ['IT', 'P&C', 'Benefits', 'Facilities'],
          description: 'The category for the ticket',
        },
        summary: {
          type: 'string',
          description: 'Summary/title of the ticket (for create action)',
        },
        ticket_id: {
          type: 'string',
          description: 'Ticket ID to check (for check_status action)',
        },
      },
      required: ['action'],
    },
  },
  {
    name: 'benefits_lookup',
    description: 'Look up benefits enrollment information, plan details, deadlines, and enrollment status. Use when the new hire asks about health insurance, dental, vision, 401k, PTO, or any benefits.',
    input_schema: {
      type: 'object' as const,
      properties: {
        action: {
          type: 'string',
          enum: ['enrollment_status', 'plan_details', 'deadlines', 'compare_plans'],
          description: 'The benefits action to perform',
        },
        plan_type: {
          type: 'string',
          enum: ['medical', 'dental', 'vision', '401k', 'pto', 'life_insurance', 'all'],
          description: 'Type of benefit plan to look up',
        },
      },
      required: ['action'],
    },
  },
  {
    name: 'zhub_search',
    description: 'Search the Zhub intranet (SharePoint), New Associate Hub, People Leader Hub, and Confluence for policies, procedures, SOPs, and company information. Use for any "how to" or policy questions.',
    input_schema: {
      type: 'object' as const,
      properties: {
        query: {
          type: 'string',
          description: 'Search query for Zhub/Confluence',
        },
        source: {
          type: 'string',
          enum: ['zhub', 'new_associate_hub', 'people_leader_hub', 'confluence', 'all'],
          description: 'Which knowledge source to search',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'it_provisioning',
    description: 'Check or request role-based system access and provisioning status. Use when the new hire needs access to specific tools, software, or systems for their role.',
    input_schema: {
      type: 'object' as const,
      properties: {
        action: {
          type: 'string',
          enum: ['check_status', 'request_access', 'list_systems'],
          description: 'Check current access status, request new access, or list available systems',
        },
        system_name: {
          type: 'string',
          description: 'Name of the system to check/request access for',
        },
      },
      required: ['action'],
    },
  },
  {
    name: 'buddy_connect',
    description: 'Connect with onboarding buddy, team members, or get culture and team information. Use when the new hire wants social connection, team introductions, or culture guidance.',
    input_schema: {
      type: 'object' as const,
      properties: {
        action: {
          type: 'string',
          enum: ['get_buddy', 'team_intro', 'culture_tips', 'upcoming_events'],
          description: 'The type of social/culture connection to make',
        },
      },
      required: ['action'],
    },
  },
];
