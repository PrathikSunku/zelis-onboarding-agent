import type { AgentName } from '../types';

export interface ScriptedMessage {
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: { name: AgentName; summary: string }[];
  delay?: number;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  agents: AgentName[];
  messages: ScriptedMessage[];
}

export interface Phase {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  dateRange: string;
  description: string;
  milestones: string[];
  activeAgents: AgentName[];
  scenarios: Scenario[];
}

export const phases: Phase[] = [
  {
    id: 'preboarding',
    label: 'Preboarding',
    shortLabel: 'Pre',
    icon: '📋',
    dateRange: 'Before Day 1',
    description: 'Get ready for your first day at Zelis. Review company information, complete pre-hire paperwork, and connect with your manager before you arrive.',
    milestones: [
      'Complete Rise360 preboarding modules',
      'Review welcome packet & company overview',
      'Connect with your hiring manager',
      'Receive IT equipment & login credentials',
    ],
    activeAgents: ['zhub_search', 'buddy_connect'],
    scenarios: [
      {
        id: 'pre-explore',
        title: 'Explore Zelis & Your Role',
        description: 'Learn about the company, how it makes money, and what your department does',
        icon: '🏢',
        agents: ['zhub_search'],
        messages: [
          { role: 'user', content: 'I just accepted my offer at Zelis! Can you tell me about the company and how it makes money?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'zhub_search', summary: 'Searching Zhub for company overview and business model...' }], delay: 1500 },
          { role: 'assistant', content: "Welcome aboard! I'm so excited you're joining us! 🎉\n\nHere's what you should know about Zelis:\n\n**What Zelis Does:**\nZelis modernizes the financial experience for all healthcare stakeholders — health plans, providers, and members.\n\n**How Zelis Makes Money:**\nWe serve health plans, TPAs (Third-Party Administrators), and self-funded employers through three core solution areas:\n\n• **Price Optimization** — Helping payers achieve fair, transparent pricing\n• **Payment Optimization** — Streamlining how providers get paid\n• **Member Engagement & Transparency** — Giving members clarity on their healthcare costs\n\n**Your Department:**\nYou'll be joining a team that directly supports one of these pillars. I can tell you more about your specific department once you're set up!\n\nWant me to pull up some pre-reading materials from Zhub so you can get a head start?", delay: 2000 },
        ],
      },
      {
        id: 'pre-materials',
        title: 'Pre-Read Materials',
        description: 'Access onboarding resources and reading materials before Day 1',
        icon: '📚',
        agents: ['zhub_search'],
        messages: [
          { role: 'user', content: 'What materials should I review before my first day?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'zhub_search', summary: 'Searching New Associate Hub for preboarding materials...' }], delay: 1500 },
          { role: 'assistant', content: "Great question! Here are the key resources to review before Day 1:\n\n**📖 Must-Read:**\n• **New Associate Hub** — Your central onboarding portal with everything you need\n• **Your First 90 Days at Zelis** — A roadmap of what to expect\n• **Company Overview on Zhub** — Products, departments, and org structure\n\n**👤 About Your Team:**\n• Your department overview page on Zhub\n• Shared Services Directory — how to reach different teams\n\n**📧 Check Your Email:**\n• You should have received Rise360 preboarding modules — complete those before Day 1\n• Welcome email from your manager with team-specific details\n\nDon't worry about memorizing everything — these are just to help you feel oriented. Your onboarding buddy and manager will walk you through the rest! 🙌", delay: 2000 },
        ],
      },
      {
        id: 'pre-manager',
        title: 'Connect With Your Manager',
        description: 'Reach out to your hiring manager and learn about team expectations',
        icon: '👋',
        agents: ['buddy_connect'],
        messages: [
          { role: 'user', content: 'How should I connect with my manager before I start? What should I ask them?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'buddy_connect', summary: 'Getting team and manager info...' }], delay: 1200 },
          { role: 'assistant', content: "Your manager is already expecting to hear from you! Here's how to make a great first impression:\n\n**📧 Send a Quick Email:**\nIntroduce yourself and express your excitement. Keep it short and friendly.\n\n**❓ Great Questions to Ask:**\n• \"What should I focus on in my first week?\"\n• \"Is there anything I should review or prepare before Day 1?\"\n• \"What does a typical day look like on the team?\"\n• \"Who will be my onboarding buddy?\"\n\n**🗓️ Your Manager's 90-Day Plan:**\nYour manager has a comprehensive **Hiring Manager 90-Day Guide** with a checklist for your preboarding through 90 days. They'll be setting up:\n• Your onboarding schedule\n• 1:1 meeting cadence\n• Training plan for your role\n• Buddy program pairing\n\nThey'll be a huge resource throughout your onboarding — don't hesitate to reach out early!", delay: 2000 },
        ],
      },
    ],
  },
  {
    id: 'week1',
    label: 'Week 1',
    shortLabel: 'Wk 1',
    icon: '🚀',
    dateRange: 'Days 1–5',
    description: 'Your first week! Complete IT setup, attend P&C orientation, get your systems provisioned, and meet your team.',
    milestones: [
      'Complete Day 1 IT & P&C Orientation',
      'Get provisioned for all required systems',
      'Meet your onboarding buddy',
      'Set up Workday, Jira, Zhub access',
      'Join Viva Engage & team channels',
    ],
    activeAgents: ['it_provisioning', 'workday_training', 'buddy_connect', 'zhub_search'],
    scenarios: [
      {
        id: 'w1-orientation',
        title: 'Day 1 IT Setup & Orientation',
        description: 'Get your equipment, accounts, and attend the P&C orientation',
        icon: '💻',
        agents: ['it_provisioning', 'zhub_search'],
        messages: [
          { role: 'user', content: "It's my first day! What do I need to do for IT setup and orientation?" },
          { role: 'assistant', content: '', toolCalls: [{ name: 'it_provisioning', summary: 'Checking system access provisioning status...' }, { name: 'zhub_search', summary: 'Finding Day 1 orientation schedule...' }], delay: 1800 },
          { role: 'assistant', content: "Happy Day 1! 🎊 Here's your game plan:\n\n**🖥️ IT Setup Status:**\n✅ Email (Outlook) — Ready\n✅ Microsoft Teams — Ready\n✅ Workday — Ready\n✅ Zhub (SharePoint) — Ready\n✅ Jira — Ready\n✅ Viva Engage — Ready\n⏳ VPN — Being provisioned (should be ready by tomorrow)\n\n**📅 Today's Schedule:**\n• **9:00 AM** — IT Equipment pickup & account setup\n• **10:30 AM** — P&C Orientation (covers company culture, policies, benefits overview)\n• **12:00 PM** — New Hire Welcome Lunch\n• **1:30 PM** — Team introduction with your manager\n\n**⚡ Quick Tasks:**\n1. Log into Workday and verify your profile\n2. Set up your email signature\n3. Join the #new-hires channel on Viva Engage\n4. Bookmark Zhub — you'll use it daily!\n\nNeed help with any of these? Just ask!", delay: 2000 },
        ],
      },
      {
        id: 'w1-access',
        title: 'Get Your System Access',
        description: 'Request and track role-based system provisioning',
        icon: '🔑',
        agents: ['it_provisioning', 'jira_ticket'],
        messages: [
          { role: 'user', content: "I need access to Salesforce for my role but it's not set up yet. Can you help?" },
          { role: 'assistant', content: '', toolCalls: [{ name: 'it_provisioning', summary: 'Checking Salesforce access status...' }], delay: 1500 },
          { role: 'assistant', content: "I checked your IT provisioning status for Salesforce:\n\n**🔑 Salesforce Access:**\n• Status: **Pending Approval**\n• Approver: Your manager (Lisa Rodriguez)\n• Estimated: April 11th\n\nYour manager needs to approve this request. I can see it's already in the queue!\n\nWould you like me to:\n1. **Create a Jira ticket** to expedite this?\n2. **Check status of all your systems** so we can catch any other gaps?\n3. **Show you what other systems** are available for your role?", delay: 1800 },
          { role: 'user', content: 'Yes, create a Jira ticket to expedite the Salesforce access please' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'jira_ticket', summary: 'Creating IT ticket for Salesforce access...' }], delay: 1500 },
          { role: 'assistant', content: "Done! Here's your ticket:\n\n**🎫 Ticket Created:**\n• **ID:** ZEL-1043\n• **Summary:** Expedite Salesforce access for new hire\n• **Category:** IT\n• **Status:** Open\n• **Assigned to:** IT Service Desk\n• **Expected response:** Within 4 business hours\n\nI've flagged it as a new hire priority request. The IT team typically processes these quickly. I'll keep an eye on it — just ask me anytime to check the status!\n\nIn the meantime, you can use Zhub and the training modules in Workday to start learning about our products. 📚", delay: 2000 },
        ],
      },
      {
        id: 'w1-buddy',
        title: 'Meet Your Onboarding Buddy',
        description: 'Get connected with your buddy and learn about team culture',
        icon: '🤝',
        agents: ['buddy_connect'],
        messages: [
          { role: 'user', content: 'Who is my onboarding buddy? How do I connect with them?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'buddy_connect', summary: 'Looking up your assigned onboarding buddy...' }], delay: 1200 },
          { role: 'assistant', content: "You've been paired with a great buddy! 🎉\n\n**Your Onboarding Buddy:**\n• **Name:** Alex Rivera\n• **Role:** Senior Client Service Representative\n• **Tenure:** 3 years at Zelis\n• **Fun Fact:** Runs a fantasy football league that half the department is in! 🏈\n\n**How the Buddy Program Works:**\n• Your buddy is a peer who helps you navigate company culture\n• They're your go-to for \"no dumb questions\" — seriously, ask anything!\n• **Suggested meetings:**\n  - Coffee chat this week (virtual or in-person)\n  - Bi-weekly 30-min check-ins for your first 90 days\n\n**Pro Tips from Alex's Experience:**\n• Join the #new-hires and #zelis-life channels on Viva Engage\n• The CEO Town Hall next week is great for understanding company direction\n• Don't be shy about introducing yourself in team channels!\n\nWant me to help you draft a message to Alex?", delay: 2000 },
        ],
      },
      {
        id: 'w1-navigate',
        title: 'Navigate Your Tools',
        description: 'Learn how to use Zhub, Jira, Workday, and other key platforms',
        icon: '🧭',
        agents: ['zhub_search', 'workday_training'],
        messages: [
          { role: 'user', content: 'There are so many tools and platforms! How do I use Jira to reach P&C or IT when I need help?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'zhub_search', summary: 'Finding Jira how-to guide...' }], delay: 1200 },
          { role: 'assistant', content: "I know it can feel overwhelming — but don't worry, you'll get the hang of it quickly! Here's your quick guide:\n\n**🎫 Jira (For Support Requests):**\nThis is how you reach P&C (People & Culture) or IT when you need help:\n1. Go to the Jira Service Desk portal\n2. Select a category: **IT**, **P&C**, **Benefits**, or **Facilities**\n3. Describe your issue and submit\n4. You'll get a ticket ID and can track status\n\n**💡 Pro tip:** You can always just tell me what you need and I'll create the Jira ticket for you!\n\n**📱 Your Key Platforms:**\n• **Workday** — HR, training, benefits, time-off\n• **Zhub** — Company intranet, policies, guides\n• **Jira** — Support tickets for P&C and IT\n• **Viva Engage** — Internal social network\n• **Teams** — Daily communication\n• **Cheerz!** — Recognize your colleagues\n\nBookmark the New Associate Hub on Zhub — it links to everything! 🔖", delay: 2000 },
        ],
      },
    ],
  },
  {
    id: 'month1',
    label: 'Month 1',
    shortLabel: 'Mo 1',
    icon: '📝',
    dateRange: 'Days 6–30',
    description: 'Complete your compliance training, enroll in benefits, and start building expertise in your role and products.',
    milestones: [
      'Complete all compliance training (30-day deadline)',
      'Enroll in benefits',
      'Finish product knowledge foundations',
      'Submit first Jira ticket independently',
      'Complete Week 1 & Month 1 NPS surveys',
    ],
    activeAgents: ['workday_training', 'benefits_lookup', 'jira_ticket', 'zhub_search'],
    scenarios: [
      {
        id: 'm1-compliance',
        title: 'Complete Compliance Training',
        description: 'Track and complete all required compliance courses before the 30-day deadline',
        icon: '✅',
        agents: ['workday_training'],
        messages: [
          { role: 'user', content: 'What compliance training do I need to complete? I want to make sure I hit my deadlines.' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'workday_training', summary: 'Checking training assignments and compliance deadlines...' }], delay: 1500 },
          { role: 'assistant', content: "Great initiative! Here's your compliance training status:\n\n**⏰ Deadline: May 7th (28 days remaining)**\n\n**Required Compliance Courses:**\n1. ✅ HIPAA Privacy & Security — 45 min\n2. 📋 Harassment Prevention — 60 min\n3. 📋 Medicare Compliance Fundamentals — 30 min\n4. 🔄 Cybersecurity Awareness — 35 min (60% complete!)\n5. 📋 Zelis Internal Policies Review — 20 min\n\n**📊 Your Progress:** 1 of 5 complete (20%)\n\n**🎯 My Recommendation:**\n1. Finish Cybersecurity Awareness first — you're already 60% through!\n2. Then tackle HIPAA and Medicare since you work with healthcare data\n3. Schedule 30 min/day this week and you'll be done well before the deadline\n\nAll courses are in **Workday LMS** — go to Learning > My Assignments. Need help accessing any of them?", delay: 2000 },
        ],
      },
      {
        id: 'm1-benefits',
        title: 'Enroll in Benefits',
        description: 'Choose your health plans, 401(k), and other benefits',
        icon: '🏥',
        agents: ['benefits_lookup'],
        messages: [
          { role: 'user', content: 'I need to enroll in benefits. What plans are available and when is the deadline?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'benefits_lookup', summary: 'Checking enrollment status and available plans...' }], delay: 1500 },
          { role: 'assistant', content: "Let me walk you through your benefits options! 🏥\n\n**⏰ Enrollment Deadline: May 7th (28 days remaining)**\n\n**Medical Plans:**\n| Plan | Monthly | Deductible | Out-of-Pocket Max |\n|------|---------|------------|-------------------|\n| PPO Gold | $180/mo | $500 | $3,000 |\n| PPO Silver | $120/mo | $1,500 | $5,000 |\n| HDHP + HSA | $80/mo | $3,000 | $6,000 |\n\n💡 *HDHP + HSA: Zelis contributes $500/year to your HSA!*\n\n**Other Benefits:**\n• 🦷 Dental PPO ($25/mo) or Dental HMO ($12/mo)\n• 👓 VSP Vision — $8/mo\n• 💰 401(k) — **100% match up to 4%** (immediate vesting!)\n• 🏖️ PTO — 15 days/year + 10 sick days + 11 holidays\n• 👶 Parental Leave — 12 weeks paid\n\n**To Enroll:** Workday > Benefits > Open Enrollment\n\nWould you like me to compare the medical plans in more detail, or help with any specific benefit questions?", delay: 2000 },
        ],
      },
      {
        id: 'm1-jira',
        title: 'Submit Your First Jira Ticket',
        description: 'Learn to use the service desk for P&C and IT support',
        icon: '🎫',
        agents: ['jira_ticket', 'zhub_search'],
        messages: [
          { role: 'user', content: 'I need to update my emergency contact information but I\'m not sure how. Can you help me submit a ticket?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'zhub_search', summary: 'Searching for emergency contact update process...' }, { name: 'jira_ticket', summary: 'Creating P&C support ticket...' }], delay: 1800 },
          { role: 'assistant', content: "I can help with that! I actually found two ways to do this:\n\n**Option 1 — Self-Service (Fastest):**\nYou can update emergency contacts directly in Workday:\n1. Go to Workday > Personal Information\n2. Click \"Emergency Contacts\"\n3. Add or edit your contacts\n4. Save — no approval needed!\n\n**Option 2 — I created a ticket just in case:**\n🎫 **Ticket ZEL-1043** has been created with P&C Operations in case you need assistance:\n• Category: P&C\n• Status: Open\n• Expected response: 4 business hours\n\n**💡 Jira Tips for the Future:**\n• For HR questions → Select **P&C** category\n• For tech issues → Select **IT** category\n• For plan questions → Select **Benefits** category\n• Or just ask me and I'll create the ticket for you!\n\nThis is how most support works at Zelis — Jira is your go-to for anything a specialist needs to answer. 🎯", delay: 2000 },
        ],
      },
      {
        id: 'm1-products',
        title: 'Learn About Zelis Products',
        description: 'Build foundational knowledge about products and the business',
        icon: '💡',
        agents: ['zhub_search', 'workday_training'],
        messages: [
          { role: 'user', content: 'I want to understand Zelis products better. Where can I learn about what we sell and how our department fits in?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'zhub_search', summary: 'Searching for product overview and department info...' }, { name: 'workday_training', summary: 'Finding product training courses...' }], delay: 1800 },
          { role: 'assistant', content: "Love the curiosity! Understanding our products will make you so much more effective. Here's your learning path:\n\n**📖 Start Here (Zhub Articles):**\n• **Zelis Product Overview** — Complete suite of solutions\n• **How Zelis Makes Money** — Revenue model, key clients, value prop\n• **Solutions by Department** — How each department maps to products\n\n**🎓 Formal Training (Workday LMS):**\n• **Zelis Product Portfolio Overview** — 2 hours (due by May 15th)\n• **Client Engagement Best Practices** — 1 hour (due by May 15th)\n\n**🗺️ The Big Picture:**\nZelis has three solution pillars:\n1. **Price Optimization** — Fair, transparent pricing for healthcare\n2. **Payment Optimization** — Streamlining provider payments\n3. **Member Engagement** — Clarity for members on costs\n\nYour department directly supports these solutions. I'd recommend starting with the Zhub articles this week, then diving into the formal training courses next week.\n\nWant me to find more resources specific to your department?", delay: 2000 },
        ],
      },
    ],
  },
  {
    id: 'month2',
    label: 'Month 2',
    shortLabel: 'Mo 2',
    icon: '📈',
    dateRange: 'Days 31–60',
    description: 'Deepen your role-specific skills, contribute to team projects, and prepare for your first performance conversations.',
    milestones: [
      'Complete role-specific training courses',
      'Join team projects and start contributing',
      'First performance check-in with manager',
      'Build cross-functional relationships',
    ],
    activeAgents: ['workday_training', 'zhub_search', 'buddy_connect', 'jira_ticket'],
    scenarios: [
      {
        id: 'm2-roletraining',
        title: 'Complete Role-Specific Training',
        description: 'Finish department and role-specific courses in Workday LMS',
        icon: '🎓',
        agents: ['workday_training'],
        messages: [
          { role: 'user', content: 'I finished my compliance training! What role-specific training should I focus on now?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'workday_training', summary: 'Checking role-specific training assignments...' }], delay: 1500 },
          { role: 'assistant', content: "Congratulations on finishing compliance! 🎉 Now let's level up your role skills:\n\n**🎯 Your Role-Specific Training:**\n• **Zelis Product Portfolio Overview** — 2 hours (due May 15th)\n• **Client Engagement Best Practices** — 1 hour (due May 15th)\n\n**📊 Training Progress:**\n• Compliance: ✅ 5/5 Complete\n• Role-specific: 📋 0/2 Complete\n• Overall: 71% done!\n\n**💡 Recommended Approach:**\n1. Start with Product Portfolio — it builds the foundation\n2. Then do Client Engagement — it'll make more sense after products\n3. Ask your manager about any department-specific shadowing opportunities\n\n**🌟 Beyond Formal Training:**\n• Shadow a senior team member on client calls\n• Review recent case studies on Zhub\n• Ask your buddy Alex about real-world examples\n\nYou're making great progress! 🚀", delay: 2000 },
        ],
      },
      {
        id: 'm2-department',
        title: 'Deep Dive Into Your Department',
        description: 'Understand your department\'s role, key contacts, and current initiatives',
        icon: '🏗️',
        agents: ['zhub_search', 'buddy_connect'],
        messages: [
          { role: 'user', content: 'I want to better understand how my department works and who the key people are. Can you help?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'zhub_search', summary: 'Searching for department overview and org structure...' }, { name: 'buddy_connect', summary: 'Getting team introductions...' }], delay: 1800 },
          { role: 'assistant', content: "Absolutely! Let me connect you with your department ecosystem:\n\n**👥 Your Immediate Team:**\n• **Lisa Rodriguez** — Your Manager (direct)\n• **Alex Rivera** — Your Onboarding Buddy\n• **Jordan Lee** — Team Lead (skip-level)\n• **Sam Patel** & **Casey Martinez** — Teammates\n\n**🏢 Department Overview:**\nYour department page on Zhub has the full org chart, current initiatives, and key contacts.\n\n**🤝 Suggested Next Connections:**\n1. Schedule 1:1 coffee chats with each teammate\n2. Ask Jordan Lee about the team's current priorities\n3. Join your department channel on Viva Engage\n4. Attend the daily team standup (9:30 AM on Teams)\n\n**📋 Shared Services You'll Work With:**\n• P&C Operations — for HR questions\n• IT Service Desk — for tech support\n• Marketing/Creative — for client-facing materials\n\nWant me to help you set up intro meetings with any of these teams?", delay: 2000 },
        ],
      },
      {
        id: 'm2-checkin',
        title: 'Prepare for Performance Check-In',
        description: 'Get ready for your first formal check-in with your manager',
        icon: '📝',
        agents: ['zhub_search', 'buddy_connect'],
        messages: [
          { role: 'user', content: 'I have my first performance check-in coming up. How should I prepare?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'zhub_search', summary: 'Finding performance review guidance...' }], delay: 1200 },
          { role: 'assistant', content: "Great question — preparation shows initiative! Here's how to make it a great conversation:\n\n**📋 Before the Meeting:**\n1. **Reflect on your first 45 days** — What went well? What was challenging?\n2. **Review your training progress** — You've completed compliance and are working on role-specific\n3. **List your accomplishments** — Even small wins count!\n4. **Prepare questions** for your manager\n\n**❓ Great Questions to Ask:**\n• \"How am I tracking against your expectations for this stage?\"\n• \"What should I focus on over the next 30 days?\"\n• \"Are there any skills or areas I should develop?\"\n• \"How can I contribute more to the team's current priorities?\"\n\n**🎯 Topics Your Manager May Cover:**\n• Progress against your onboarding plan\n• Initial MITs (Most Important Things) — these are due by Day 90\n• Development goals\n• Feedback on your integration with the team\n\n**💡 Pro Tip:** Take notes during the meeting and send a follow-up email summarizing action items. It shows professionalism and keeps you aligned!\n\nYou're doing great — this is a conversation, not a test! 🙌", delay: 2000 },
        ],
      },
    ],
  },
  {
    id: 'month3',
    label: 'Month 3',
    shortLabel: 'Mo 3',
    icon: '🏆',
    dateRange: 'Days 61–90',
    description: 'Set your development goals, complete your MITs, and prepare for your 90-day review. You\'re almost a fully onboarded Zelis team member!',
    milestones: [
      'Set development goals in Workday',
      'Complete MITs (Most Important Things)',
      'Prepare for 90-day review with manager',
      'Complete Month 1 NPS survey',
      'Transition from onboarding to ongoing development',
    ],
    activeAgents: ['workday_training', 'buddy_connect', 'zhub_search'],
    scenarios: [
      {
        id: 'm3-goals',
        title: 'Set Development Goals & MITs',
        description: 'Define your Most Important Things and long-term development goals',
        icon: '🎯',
        agents: ['workday_training', 'zhub_search'],
        messages: [
          { role: 'user', content: 'I need to set my MITs and development goals before my 90-day review. Where do I start?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'workday_training', summary: 'Checking MIT and goals setup in Workday...' }, { name: 'zhub_search', summary: 'Finding goal-setting resources...' }], delay: 1800 },
          { role: 'assistant', content: "This is one of the most important milestones in your onboarding! Let's break it down:\n\n**📌 MITs (Most Important Things) — Due by Day 90:**\nThese are 3-5 key objectives for your first year. Work with your manager to define them.\n\n**Example MITs for your role:**\n1. Achieve full proficiency in core client service processes\n2. Build relationships with X key internal stakeholders\n3. Complete all product knowledge training\n4. Handle X client interactions independently\n\n**🌱 Development Goals:**\nLonger-term growth objectives. Think about:\n• Skills you want to develop\n• Career aspirations at Zelis\n• Areas where you want mentorship\n\n**📍 Where to Set Them:**\nWorkday > Performance > Goals > Add Goal\n\n**💡 Tips:**\n• Make them SMART (Specific, Measurable, Achievable, Relevant, Time-bound)\n• Align with your department's priorities\n• Discuss with your manager first — they can help calibrate\n• Your buddy Alex can share what goals look like on the team\n\nWant me to help you draft some goals based on your role?", delay: 2000 },
        ],
      },
      {
        id: 'm3-review',
        title: 'Prepare for 90-Day Review',
        description: 'Get ready for your milestone review and reflect on your journey',
        icon: '📊',
        agents: ['workday_training', 'buddy_connect'],
        messages: [
          { role: 'user', content: 'My 90-day review is coming up. How should I prepare and what should I expect?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'workday_training', summary: 'Pulling training completion summary...' }, { name: 'buddy_connect', summary: 'Getting team feedback tips...' }], delay: 1800 },
          { role: 'assistant', content: "You've come so far! Here's how to make your 90-day review shine:\n\n**✅ Your Onboarding Scorecard:**\n• Compliance Training: ✅ Complete (5/5)\n• Role-Specific Training: ✅ Complete (2/2)\n• Benefits Enrolled: ✅ Done\n• MITs Set: ✅ In Workday\n• Buddy Check-ins: ✅ Completed\n• Systems Provisioned: ✅ All active\n\n**📋 How to Prepare:**\n1. **Review your MITs** — What progress have you made?\n2. **Gather highlights** — Key projects, contributions, learnings\n3. **Self-reflect honestly** — Strengths, growth areas, surprises\n4. **Prepare questions** for future development\n\n**🗣️ What Your Manager Will Discuss:**\n• Overall performance assessment\n• Feedback from team members\n• Goal alignment for next quarter\n• Ongoing development plan\n• Transition from \"new hire\" to full team member\n\n**🌟 You've Accomplished:**\n• Navigated 10+ systems\n• Completed all required training\n• Built relationships across the team\n• Started contributing to real work\n\nYou should feel proud — the hard part is done! 🏆", delay: 2000 },
        ],
      },
      {
        id: 'm3-reflect',
        title: 'Reflect & Plan Ahead',
        description: 'Look back on your journey and set yourself up for continued success',
        icon: '🔮',
        agents: ['buddy_connect', 'zhub_search'],
        messages: [
          { role: 'user', content: 'I\'m wrapping up my onboarding. What resources are available for my ongoing development at Zelis?' },
          { role: 'assistant', content: '', toolCalls: [{ name: 'zhub_search', summary: 'Finding ongoing development resources...' }, { name: 'buddy_connect', summary: 'Getting culture and development info...' }], delay: 1500 },
          { role: 'assistant', content: "Congratulations on completing your onboarding journey! 🎉🏆\n\nHere's how to keep growing at Zelis:\n\n**📚 Ongoing Learning:**\n• **Workday LMS** — Browse the full course catalog anytime\n• **Zelly** (AI Learning Companion) — Get help with AI tools and prompting\n• **People Leader Coach** — If you move into management\n• **LinkedIn Learning** — Additional professional development\n\n**🤝 Stay Connected:**\n• Continue buddy check-ins (even informally)\n• Attend the monthly CEO Town Halls\n• Participate in Viva Engage communities\n• Use **Cheerz!** to recognize colleagues\n• Explore **YourCause** for volunteering\n\n**📈 Career Growth:**\n• Talk to your manager about career path options\n• Seek cross-functional project opportunities\n• Consider mentoring future new hires!\n\n**💬 I'm Always Here:**\nEven after your 90 days, you can come back to me for:\n• Policy questions → I'll search Zhub\n• IT/P&C help → I'll create Jira tickets\n• Training info → I'll check Workday\n• Benefits questions → I've got you covered\n\nWelcome to the team, officially! 🙌✨", delay: 2000 },
        ],
      },
    ],
  },
];
