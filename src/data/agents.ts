import type { AgentInfo } from '../types';

export const agentRegistry: AgentInfo[] = [
  {
    name: 'workday_training',
    label: 'Training & Compliance',
    description: 'Manages training assignments, compliance tracking, and LMS content via Workday',
    icon: '📚',
    color: '#3b82f6',
    system: 'Workday LMS',
  },
  {
    name: 'jira_ticket',
    label: 'Service Desk',
    description: 'Creates and tracks Jira tickets for P&C and IT support requests',
    icon: '🎫',
    color: '#8b5cf6',
    system: 'Jira',
  },
  {
    name: 'benefits_lookup',
    label: 'Benefits Advisor',
    description: 'Guides benefits enrollment, plan details, and deadline tracking',
    icon: '🏥',
    color: '#10b981',
    system: 'Workday Benefits',
  },
  {
    name: 'zhub_search',
    label: 'Knowledge Base',
    description: 'Searches Zhub intranet, policies, SOPs, and Confluence documentation',
    icon: '🔍',
    color: '#f59e0b',
    system: 'Zhub / Confluence',
  },
  {
    name: 'it_provisioning',
    label: 'IT Access',
    description: 'Manages role-based system access requests and provisioning status',
    icon: '🔑',
    color: '#ef4444',
    system: 'IT Fulfillment',
  },
  {
    name: 'buddy_connect',
    label: 'Buddy & Culture',
    description: 'Connects with team members, provides culture tips and introductions',
    icon: '🤝',
    color: '#ec4899',
    system: 'Viva Engage / Teams',
  },
];
