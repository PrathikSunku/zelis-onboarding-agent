import type { Persona } from '../types';

export const personas: Persona[] = [
  {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Client Service Representative',
    department: 'Sales & Client Management',
    country: 'USA',
    jobLevel: 'ic',
    roleType: 'associate',
    startDate: '2026-04-07',
    phase: 'day_one',
    manager: 'Lisa Rodriguez',
  },
  {
    id: 'raj',
    name: 'Raj Patel',
    role: 'Software Engineer',
    department: 'ZEDI',
    country: 'India',
    jobLevel: 'ic',
    roleType: 'associate',
    startDate: '2026-03-31',
    phase: 'first_week',
    manager: 'Ananya Sharma',
  },
  {
    id: 'jennifer',
    name: 'Jennifer Walsh',
    role: 'VP of Sales',
    department: 'Sales & Client Management',
    country: 'USA',
    jobLevel: 'senior_leader',
    roleType: 'associate',
    startDate: '2026-04-14',
    phase: 'preboarding',
    manager: 'Michael Torres (CEO)',
  },
  {
    id: 'marcus',
    name: 'Marcus Johnson',
    role: 'Provider Enrollment Advisor',
    department: 'Payments Optimization',
    country: 'USA',
    jobLevel: 'ic',
    roleType: 'associate',
    startDate: '2026-03-10',
    phase: 'first_month',
    manager: 'Karen Phillips',
  },
];

export const phaseLabels: Record<string, string> = {
  preboarding: 'Preboarding',
  day_one: 'Day One',
  first_week: 'First Week',
  first_month: 'First Month',
  first_60: 'First 60 Days',
  first_90: 'First 90 Days',
};

export const levelLabels: Record<string, string> = {
  intern: 'Intern',
  ic: 'Individual Contributor',
  people_leader: 'People Leader',
  senior_leader: 'Senior Leader / Executive',
};
