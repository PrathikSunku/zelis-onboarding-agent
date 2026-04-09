import React, { useState } from 'react';
import { MessageCircle, Zap, GitBranch, CheckCircle2 } from 'lucide-react';
import type { Persona } from '../../types';

interface OrchestrationStep {
  type: 'query' | 'reasoning' | 'agent_call' | 'agent_response' | 'synthesis';
  content: string;
  agents?: string[];
  timestamp?: number;
}

interface OrchestrationShowcaseProps {
  persona: Persona;
}

export function OrchestrationShowcase({ persona }: OrchestrationShowcaseProps) {
  const [query, setQuery] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<OrchestrationStep[]>([]);

  const showcaseExamples = [
    {
      title: 'Benefits & Compensation',
      description: 'Complex multi-agent query requiring data from multiple systems',
      query: `What benefits should I review first, and how does my health insurance affect my ability to get on my spouse's plan?`,
    },
    {
      title: 'System Access & Onboarding',
      description: 'IT setup with role-based personalization',
      query: 'What systems do I need access to in my role, and how long does it usually take?',
    },
    {
      title: 'Role-Specific First Steps',
      description: 'Role and department-aware guidance',
      query: `What should my focus be in my first week as a ${persona.role} in ${persona.department}?`,
    },
    {
      title: 'Compliance & Timeline',
      description: 'Deadline-aware multi-agent planning',
      query: 'Which compliance trainings are critical in my first 30 days, and which can wait?',
    },
  ];

  const runOrchestration = async (selectedQuery: string) => {
    setQuery(selectedQuery);
    setIsRunning(true);
    setSteps([]);

    // Simulate orchestration flow
    const newSteps: OrchestrationStep[] = [];

    // Step 1: Query received
    newSteps.push({
      type: 'query',
      content: selectedQuery,
      timestamp: Date.now(),
    });
    setSteps([...newSteps]);
    await new Promise((r) => setTimeout(r, 800));

    // Step 2: Claude reasoning
    const reasoning =
      selectedQuery.includes('benefits') || selectedQuery.includes('spouse')
        ? 'This query requires understanding benefits options, health insurance details, and spouse plan compatibility. I need to call Benefits Advisor first, then cross-reference with policy information.'
        : selectedQuery.includes('system') || selectedQuery.includes('access')
          ? 'Role-based system access is specific to the new hire\'s position. I need to check IT provisioning for their role, then supplement with Zhub documentation about onboarding systems.'
          : selectedQuery.includes('first week') || selectedQuery.includes('first steps')
            ? 'Department and role-specific guidance requires checking their team structure, training requirements, and role-specific onboarding tasks. I\'ll consult buddy/culture info, training requirements, and knowledge base.'
            : 'This is about compliance timeline and priorities. I need to pull compliance requirements from training data, then reference policy docs for deadline clarity.';

    newSteps.push({
      type: 'reasoning',
      content: reasoning,
      timestamp: Date.now(),
    });
    setSteps([...newSteps]);
    await new Promise((r) => setTimeout(r, 1200));

    // Step 3-5: Agent calls
    const agentSequence = [
      {
        name: 'benefits_lookup',
        displayName: 'Benefits Advisor',
        query: 'Get benefits details and health plan options',
      },
      {
        name: 'zhub_search',
        displayName: 'Knowledge Base',
        query: 'Find policy documentation relevant to query',
      },
      {
        name: selectedQuery.includes('compliance')
          ? 'workday_training'
          : 'buddy_connect',
        displayName: selectedQuery.includes('compliance')
          ? 'Training & Compliance'
          : 'Buddy & Culture',
        query: selectedQuery.includes('compliance')
          ? 'Get compliance training requirements and deadlines'
          : 'Get team context and role-specific guidance',
      },
    ];

    for (const agent of agentSequence) {
      newSteps.push({
        type: 'agent_call',
        content: `Calling ${agent.displayName}...`,
        agents: [agent.displayName],
        timestamp: Date.now(),
      });
      setSteps([...newSteps]);
      await new Promise((r) => setTimeout(r, 600));

      // Simulate response
      const responseTexts: Record<string, string> = {
        benefits_lookup:
          'Benefits enrollment window: 30-day deadline from start date. Health insurance options include PPO (allows spouse plan coordination) and HMO. Spouse plan compatibility depends on employer eligibility.',
        zhub_search:
          'Found 3 relevant documents: Benefits_Enrollment_Guide.pdf, Health_Insurance_FAQ.docx, Spouse_Coverage_Policy.md. Documents indexed and ready for reference.',
        workday_training:
          'Compliance training checklist: HIPAA (required Day 1), Harassment Prevention (required Day 1), Medicare Compliance (required by Day 30), Cybersecurity (required by Day 30). All trainings available in Workday LMS.',
        buddy_connect:
          'Your buddy is experienced in your department. First week focuses on: system access, team introductions, understanding department workflows, and attending team standup. Key milestone: first 1:1 with manager by Day 3.',
      };

      newSteps.push({
        type: 'agent_response',
        content: responseTexts[agent.name] || 'Agent response received.',
        agents: [agent.displayName],
        timestamp: Date.now(),
      });
      setSteps([...newSteps]);
      await new Promise((r) => setTimeout(r, 1000));
    }

    // Step 6: Synthesis
    const synthesisTexts: Record<string, string> = {
      benefits:
        'Recommended action: Enroll in benefits within your 30-day window. If considering spouse coverage, your PPO option allows flexibility for coordination with their plan. Schedule a benefits call with HR before Day 15 to discuss options.',
      system:
        'Your role requires access to: Workday (HRIS), Zhub (intranet), Jira (ticketing), your department tools. IT provisioning typically takes 1-2 days. Start the request on Day 1; you\'ll have most access by end of Week 1.',
      first_week:
        'First week priorities (in order): 1) System setup & access (IT), 2) Manager 1:1 (connect with leadership), 3) Team introductions (buddy + direct team), 4) Process documentation (Zhub), 5) First training modules (compliance start). This foundation sets you up for Month 1 depth.',
      compliance:
        'Priority order: HIPAA and Harassment Prevention first (required Day 1), then Cybersecurity & Medicare by Day 30. Total time: ~2 hours. Stagger over first 2 weeks. Use Workday LMS to track completion. Alert: These unlock access to certain systems.',
    };

    const synthesisKey = selectedQuery.includes('benefits')
      ? 'benefits'
      : selectedQuery.includes('system')
        ? 'system'
        : selectedQuery.includes('compliance')
          ? 'compliance'
          : 'first_week';

    newSteps.push({
      type: 'synthesis',
      content: synthesisTexts[synthesisKey],
      timestamp: Date.now(),
    });
    setSteps([...newSteps]);

    setIsRunning(false);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="border-b border-blue-100 bg-white px-6 py-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Agent Orchestration Showcase
          </h2>
        </div>
        <p className="text-sm text-slate-600">
          Watch how Claude reasons about complex queries and orchestrates multiple
          agents to synthesize answers
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          {/* Examples grid */}
          {steps.length === 0 ? (
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-700 mb-4">
                Try one of these complex queries to see multi-agent orchestration:
              </p>
              <div className="grid gap-3">
                {showcaseExamples.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => runOrchestration(example.query)}
                    disabled={isRunning}
                    className="text-left p-4 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="font-medium text-slate-900">
                      {example.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {example.description}
                    </div>
                    <div className="text-sm text-slate-700 mt-2 italic">
                      "{example.query}"
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Orchestration flow visualization */
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border transition-all ${
                    step.type === 'query'
                      ? 'bg-blue-50 border-blue-300'
                      : step.type === 'reasoning'
                        ? 'bg-purple-50 border-purple-300'
                        : step.type === 'agent_call'
                          ? 'bg-amber-50 border-amber-300'
                          : step.type === 'agent_response'
                            ? 'bg-cyan-50 border-cyan-300'
                            : 'bg-green-50 border-green-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {step.type === 'query' && (
                      <MessageCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    )}
                    {step.type === 'reasoning' && (
                      <GitBranch className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    )}
                    {(step.type === 'agent_call' || step.type === 'agent_response') && (
                      <Zap className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    )}
                    {step.type === 'synthesis' && (
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    )}

                    <div className="flex-1">
                      <div className="font-medium text-slate-900 mb-2">
                        {step.type === 'query'
                          ? 'Your Query'
                          : step.type === 'reasoning'
                            ? "Claude's Reasoning"
                            : step.type === 'agent_call'
                              ? `Calling Agent: ${step.agents?.[0]}`
                              : step.type === 'agent_response'
                                ? `Response from ${step.agents?.[0]}`
                                : 'Final Synthesis'}
                      </div>
                      <p className="text-sm text-slate-700 whitespace-pre-wrap">
                        {step.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {!isRunning && (
                <button
                  onClick={() => {
                    setSteps([]);
                    setQuery('');
                  }}
                  className="w-full mt-6 px-4 py-2 rounded-lg bg-slate-600 text-white hover:bg-slate-700 transition"
                >
                  Try Another Query
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
