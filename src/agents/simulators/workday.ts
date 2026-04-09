import type { Persona } from '../../types';

export function simulateWorkday(input: Record<string, any>, persona: Persona) {
  const baseTraining = [
    { id: 'HIPAA-101', title: 'HIPAA Privacy & Security', status: persona.phase === 'first_month' ? 'completed' : 'assigned', dueDate: '2026-05-07', completionPct: persona.phase === 'first_month' ? 100 : 0, duration: '45 min' },
    { id: 'HARASS-201', title: 'Harassment Prevention', status: 'assigned', dueDate: '2026-05-07', completionPct: 0, duration: '60 min' },
    { id: 'MEDICARE-101', title: 'Medicare Compliance Fundamentals', status: 'assigned', dueDate: '2026-05-07', completionPct: 0, duration: '30 min' },
    { id: 'CYBER-301', title: 'Cybersecurity Awareness', status: persona.phase === 'first_month' ? 'in_progress' : 'assigned', dueDate: '2026-05-07', completionPct: persona.phase === 'first_month' ? 60 : 0, duration: '35 min' },
    { id: 'POLICY-101', title: 'Zelis Internal Policies Review', status: 'assigned', dueDate: '2026-05-07', completionPct: 0, duration: '20 min' },
  ];

  const leaderTraining = persona.jobLevel === 'people_leader' || persona.jobLevel === 'senior_leader'
    ? [{ id: 'MGMT-401', title: 'Managing Within the Law', status: 'assigned', dueDate: '2026-05-07', completionPct: 0, duration: '90 min' }]
    : [];

  const departmentTraining: Record<string, any[]> = {
    'Sales & Client Management': [
      { id: 'SALES-101', title: 'Zelis Product Portfolio Overview', status: 'not_started', dueDate: '2026-05-15', completionPct: 0, duration: '120 min' },
      { id: 'SALES-102', title: 'Client Engagement Best Practices', status: 'not_started', dueDate: '2026-05-15', completionPct: 0, duration: '60 min' },
    ],
    'ZEDI': [
      { id: 'ZEDI-101', title: 'ZEDI Platform Architecture', status: 'not_started', dueDate: '2026-05-15', completionPct: 0, duration: '90 min' },
      { id: 'ZEDI-102', title: 'Development Standards & CI/CD', status: 'not_started', dueDate: '2026-05-15', completionPct: 0, duration: '60 min' },
    ],
    'Payments Optimization': [
      { id: 'PAY-101', title: 'Payment Processing Fundamentals', status: 'not_started', dueDate: '2026-05-15', completionPct: 0, duration: '75 min' },
      { id: 'PAY-102', title: 'Provider Enrollment Workflows', status: 'not_started', dueDate: '2026-05-15', completionPct: 0, duration: '90 min' },
    ],
  };

  switch (input.action) {
    case 'check_assignments':
      return {
        source: 'Workday LMS',
        employee: persona.name,
        assignments: [...baseTraining, ...leaderTraining, ...(departmentTraining[persona.department] || [])],
        summary: {
          total: baseTraining.length + leaderTraining.length + (departmentTraining[persona.department]?.length || 0),
          completed: baseTraining.filter(t => t.status === 'completed').length,
          in_progress: baseTraining.filter(t => t.status === 'in_progress').length,
          overdue: 0,
        },
      };

    case 'check_compliance':
      return {
        source: 'Workday LMS',
        employee: persona.name,
        complianceDeadline: '2026-05-07',
        daysRemaining: 28,
        requiredCourses: baseTraining,
        leaderCourses: leaderTraining,
        status: 'on_track',
        message: `${persona.name} has ${28} days remaining to complete ${baseTraining.length} required compliance courses.`,
      };

    case 'search_courses':
      return {
        source: 'Workday LMS',
        query: input.query,
        results: [
          { id: 'OPT-201', title: `${input.query} - Fundamentals`, type: 'e-learning', duration: '45 min', rating: 4.5 },
          { id: 'OPT-202', title: `${input.query} - Advanced Topics`, type: 'e-learning', duration: '60 min', rating: 4.2 },
          { id: 'OPT-203', title: `${input.query} - Practical Workshop`, type: 'ILT', duration: '2 hours', nextSession: '2026-04-18' },
        ],
      };

    case 'check_completion':
      return {
        source: 'Workday LMS',
        employee: persona.name,
        completedCourses: baseTraining.filter(t => t.status === 'completed'),
        totalCompleted: baseTraining.filter(t => t.status === 'completed').length,
        totalAssigned: baseTraining.length + leaderTraining.length,
        completionRate: Math.round((baseTraining.filter(t => t.status === 'completed').length / baseTraining.length) * 100),
      };

    default:
      return { error: 'Unknown action' };
  }
}
