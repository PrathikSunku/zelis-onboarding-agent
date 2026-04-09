import type { Persona } from '../../types';

export function simulateBenefits(input: Record<string, any>, persona: Persona) {
  const isIndia = persona.country === 'India';

  switch (input.action) {
    case 'enrollment_status':
      return {
        source: 'Workday Benefits',
        employee: persona.name,
        enrollmentWindow: { opens: '2026-04-07', closes: '2026-05-07', daysRemaining: 28 },
        status: persona.phase === 'first_month' ? 'partially_enrolled' : 'not_started',
        enrolled: persona.phase === 'first_month' ? ['Medical - PPO Gold'] : [],
        pending: isIndia
          ? ['Group Medical Insurance', 'Group Life Insurance', 'Gratuity']
          : ['Dental', 'Vision', '401(k)', 'Life Insurance', 'HSA/FSA'],
        message: `You have 28 days to complete your benefits enrollment. ${persona.phase === 'first_month' ? 'You\'ve started — keep going!' : 'Start your enrollment in Workday today.'}`,
      };

    case 'plan_details':
      if (isIndia) {
        return {
          source: 'Workday Benefits',
          country: 'India',
          plans: {
            medical: {
              name: 'Group Medical Insurance',
              provider: 'ICICI Lombard',
              coverage: 'Employee + Family',
              sumInsured: '₹5,00,000',
              features: ['Cashless hospitalization', 'Pre/post hospitalization', 'Day care procedures'],
            },
            life: { name: 'Group Term Life Insurance', coverage: '3x Annual CTC' },
            gratuity: { name: 'Gratuity', vesting: '5 years of continuous service' },
          },
        };
      }
      return {
        source: 'Workday Benefits',
        country: 'USA',
        plans: {
          medical: [
            { name: 'PPO Gold', monthlyPremium: '$180/mo', deductible: '$500', outOfPocketMax: '$3,000', network: 'Broad PPO' },
            { name: 'PPO Silver', monthlyPremium: '$120/mo', deductible: '$1,500', outOfPocketMax: '$5,000', network: 'Broad PPO' },
            { name: 'HDHP + HSA', monthlyPremium: '$80/mo', deductible: '$3,000', outOfPocketMax: '$6,000', hsaContribution: 'Zelis contributes $500/yr' },
          ],
          dental: [
            { name: 'Dental PPO', monthlyPremium: '$25/mo', annualMax: '$2,000' },
            { name: 'Dental HMO', monthlyPremium: '$12/mo', annualMax: '$1,500' },
          ],
          vision: { name: 'VSP Vision', monthlyPremium: '$8/mo', examCopay: '$10', frameAllowance: '$200/yr' },
          retirement: { name: '401(k)', matchFormula: '100% match up to 4% of salary', vestingSchedule: 'Immediate vesting' },
          pto: { vacation: '15 days/yr (0-3 yrs)', sick: '10 days/yr', holidays: '11 paid holidays', parental: '12 weeks paid' },
        },
      };

    case 'deadlines':
      return {
        source: 'Workday Benefits',
        employee: persona.name,
        deadlines: [
          { item: 'Benefits Enrollment', deadline: '2026-05-07', daysLeft: 28, status: 'open' },
          { item: 'Beneficiary Designation', deadline: '2026-05-07', daysLeft: 28, status: 'open' },
          { item: '401(k) Enrollment', deadline: 'Anytime (recommended within 30 days)', status: 'open' },
          { item: 'HSA Setup (if HDHP selected)', deadline: 'After medical enrollment', status: 'n/a' },
        ],
      };

    case 'compare_plans':
      return {
        source: 'Workday Benefits',
        comparison: {
          type: input.plan_type || 'medical',
          recommendation: 'Based on your role and coverage needs, here are the key differences between plans. You can enroll through Workday > Benefits > Open Enrollment.',
          enrollUrl: 'https://workday.zelis.com/benefits/enrollment',
        },
      };

    default:
      return { error: 'Unknown action' };
  }
}
