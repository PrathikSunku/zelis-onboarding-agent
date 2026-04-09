import type { Persona } from '../../types';

export function simulateZhub(input: Record<string, any>, persona: Persona) {
  const query = (input.query || '').toLowerCase();
  const source = input.source || 'all';

  const articles: Record<string, any[]> = {
    pto: [
      { title: 'PTO Policy & Guidelines', source: 'Zhub > People & Culture', url: 'https://zhub.zelis.com/pc/pto-policy', summary: 'Covers PTO accrual rates, request process, blackout periods, and carryover rules.' },
      { title: 'How to Request Time Off in Workday', source: 'Zhub > How-To Guides', url: 'https://zhub.zelis.com/guides/pto-request', summary: 'Step-by-step guide to submitting PTO requests through Workday.' },
    ],
    jira: [
      { title: 'How to Submit a Jira Ticket', source: 'Zhub > IT Help', url: 'https://zhub.zelis.com/it/jira-guide', summary: 'Guide to creating P&C and IT support tickets in Jira, including common categories and priority levels.' },
      { title: 'Jira Service Desk FAQ', source: 'Confluence > P&C', url: 'https://confluence.zelis.com/pc/jira-faq', summary: 'Frequently asked questions about using Jira for internal support requests.' },
    ],
    product: [
      { title: 'Zelis Product Overview', source: 'Zhub > About Zelis', url: 'https://zhub.zelis.com/about/products', summary: 'Overview of Zelis product suite: pricing optimization, payment optimization, and member engagement solutions.' },
      { title: 'How Zelis Makes Money', source: 'Zhub > About Zelis', url: 'https://zhub.zelis.com/about/business-model', summary: 'Explains Zelis revenue model, key clients (health plans, TPAs, self-funded employers), and value proposition.' },
      { title: 'Zelis Solutions by Department', source: 'Zhub > Departments', url: 'https://zhub.zelis.com/departments/solutions-map', summary: 'Maps each department to the products and services they support.' },
    ],
    expense: [
      { title: 'Expense Reimbursement Policy', source: 'Zhub > Finance', url: 'https://zhub.zelis.com/finance/expenses', summary: 'Covers eligible expenses, approval workflow, and reimbursement timelines.' },
      { title: 'How to Submit Expenses in Workday', source: 'Zhub > How-To Guides', url: 'https://zhub.zelis.com/guides/expense-submit', summary: 'Step-by-step guide for submitting expense reports.' },
    ],
    remote: [
      { title: 'Remote Work Policy', source: 'Zhub > People & Culture', url: 'https://zhub.zelis.com/pc/remote-work', summary: 'Covers eligibility, expectations, equipment, and communication standards for remote workers.' },
      { title: 'Setting Up Your Home Office', source: 'Zhub > IT Help', url: 'https://zhub.zelis.com/it/home-office', summary: 'Equipment provided, VPN setup, and ergonomic guidelines.' },
    ],
    onboarding: [
      { title: 'New Associate Hub', source: 'Zhub > Onboarding', url: 'https://zhub.zelis.com/onboarding/new-associate', summary: 'Central hub with all onboarding resources, checklists, and links for new hires.' },
      { title: 'Your First 90 Days at Zelis', source: 'Zhub > Onboarding', url: 'https://zhub.zelis.com/onboarding/90-day-guide', summary: 'Comprehensive guide outlining milestones and expectations for your first 90 days.' },
      { title: 'Hiring Manager 90-Day Guide', source: 'Zhub > People Leader Hub', url: 'https://zhub.zelis.com/leaders/90-day-guide', summary: 'Manager checklist for supporting new hires through preboarding to 90 days.' },
    ],
    department: [
      { title: `${persona.department} Team Overview`, source: 'Zhub > Departments', url: `https://zhub.zelis.com/departments/${persona.department.toLowerCase().replace(/ /g, '-')}`, summary: `Overview of the ${persona.department} department, key contacts, org chart, and current initiatives.` },
      { title: 'Shared Services Directory', source: 'Zhub > Departments', url: 'https://zhub.zelis.com/departments/shared-services', summary: 'Directory of shared service departments and how to reach each team.' },
    ],
  };

  // Match articles based on query
  let matched: any[] = [];
  for (const [key, arts] of Object.entries(articles)) {
    if (query.includes(key) || key.includes(query.split(' ')[0])) {
      matched = [...matched, ...arts];
    }
  }

  // Default: return onboarding + department articles
  if (matched.length === 0) {
    matched = [...(articles.onboarding || []), ...(articles.department || [])];
  }

  return {
    source: `Zhub / Confluence`,
    query: input.query,
    resultCount: matched.length,
    results: matched.slice(0, 5),
    suggestion: 'You can browse all resources at https://zhub.zelis.com',
  };
}
