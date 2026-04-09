import type { Persona } from '../../types';

export function simulateBuddy(input: Record<string, any>, persona: Persona) {
  const buddies: Record<string, any> = {
    'Sales & Client Management': { name: 'Alex Rivera', role: 'Senior Client Service Rep', tenure: '3 years', email: 'alex.rivera@zelis.com', funFact: 'Runs a fantasy football league that half the department is in' },
    'ZEDI': { name: 'Priya Mehta', role: 'Staff Engineer', tenure: '4 years', email: 'priya.mehta@zelis.com', funFact: 'Started the ZEDI book club and loves hiking' },
    'Payments Optimization': { name: 'David Kim', role: 'Provider Enrollment Lead', tenure: '2 years', email: 'david.kim@zelis.com', funFact: 'Previously worked at a health plan and knows the provider ecosystem inside out' },
  };

  switch (input.action) {
    case 'get_buddy':
      const buddy = buddies[persona.department] || { name: 'Taylor Brooks', role: 'Senior Associate', tenure: '2 years', email: 'taylor.brooks@zelis.com', funFact: 'Organized last year\'s team offsite' };
      return {
        source: 'Buddy Program',
        buddy,
        program: {
          description: 'Your buddy is a peer who can help you navigate the company culture, answer informal questions, and make introductions.',
          suggestedMeetings: ['Coffee chat in first week', 'Bi-weekly 30-min check-ins for first 90 days'],
          tips: 'Don\'t hesitate to ask your buddy "dumb" questions — that\'s exactly what they\'re here for!',
        },
      };

    case 'team_intro':
      return {
        source: 'Viva Engage / Teams',
        team: {
          department: persona.department,
          manager: persona.manager,
          directTeam: [
            { name: 'Your Manager', role: persona.manager.split(' (')[0], relationship: 'Direct manager' },
            { name: buddies[persona.department]?.name || 'Taylor Brooks', role: 'Onboarding Buddy', relationship: 'Buddy' },
            { name: 'Jordan Lee', role: 'Team Lead', relationship: 'Skip-level' },
            { name: 'Sam Patel', role: 'Peer', relationship: 'Teammate' },
            { name: 'Casey Martinez', role: 'Peer', relationship: 'Teammate' },
          ],
          suggestedIntros: [
            'Schedule 1:1 with your manager in your first week',
            'Set up a coffee chat with each teammate',
            'Join your department channel on Viva Engage',
            'Introduce yourself in the #new-hires channel',
          ],
        },
      };

    case 'culture_tips':
      return {
        source: 'Zhub / Culture',
        tips: [
          { category: 'Communication', tip: 'Zelis values transparent, direct communication. Don\'t hesitate to ask questions in team channels.' },
          { category: 'Meetings', tip: 'Most meetings have agendas shared beforehand. Camera-on is encouraged but not required.' },
          { category: 'Work Style', tip: 'Zelis supports flexible work. Coordinate with your manager on expectations for in-office vs remote days.' },
          { category: 'Recognition', tip: 'Use Cheerz! to recognize colleagues. It\'s a great way to build relationships early.' },
          { category: 'Giving Back', tip: 'Check out YourCause for volunteering opportunities and charitable giving matching.' },
          { category: 'Learning', tip: 'Zelly (AI Learning Companion) can help you learn how to use AI tools effectively. Try asking it for prompting tips!' },
        ],
        vivaEngageChannels: [
          '#new-hires', '#zelis-life', `#${persona.department.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`, '#wellness', '#pets-of-zelis',
        ],
      };

    case 'upcoming_events':
      return {
        source: 'Viva Engage / Calendar',
        events: [
          { name: 'New Hire Welcome Lunch', date: '2026-04-10', time: '12:00 PM ET', location: 'Virtual / Office Cafeteria', description: 'Meet other new hires and company leaders' },
          { name: 'CEO Town Hall', date: '2026-04-15', time: '2:00 PM ET', location: 'Virtual (Teams)', description: 'Monthly all-hands with company updates' },
          { name: 'New People Leader Orientation', date: '2026-04-17', time: '10:00 AM ET', location: 'Virtual', description: persona.jobLevel === 'people_leader' || persona.jobLevel === 'senior_leader' ? 'Required for all new people leaders' : 'For people leaders only' },
          { name: `${persona.department} Team Standup`, date: 'Daily', time: '9:30 AM', location: 'Teams', description: 'Daily team sync' },
        ],
      };

    default:
      return { error: 'Unknown action' };
  }
}
