export interface Persona {
  id: string;
  name: string;
  role: string;
  department: string;
  country: 'USA' | 'India';
  jobLevel: 'intern' | 'ic' | 'people_leader' | 'senior_leader';
  roleType: 'associate' | 'non_associate';
  startDate: string;
  phase: 'preboarding' | 'day_one' | 'first_week' | 'first_month' | 'first_60' | 'first_90';
  manager: string;
  avatarUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: ToolCallResult[];
  timestamp: Date;
}

export interface ToolCallResult {
  name: string;
  input: Record<string, any>;
  result: Record<string, any>;
}

export type AgentName =
  | 'workday_training'
  | 'jira_ticket'
  | 'benefits_lookup'
  | 'zhub_search'
  | 'it_provisioning'
  | 'buddy_connect';

export interface AgentInfo {
  name: AgentName;
  label: string;
  description: string;
  icon: string;
  color: string;
  system: string;
}
