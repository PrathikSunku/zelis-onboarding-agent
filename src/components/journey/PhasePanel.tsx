import type { Phase, Scenario } from '../../data/phases';
import type { AgentName } from '../../types';
import { agentRegistry } from '../../data/agents';

interface Props {
  phase: Phase;
  onSelectScenario: (scenario: Scenario) => void;
  onSelectAgent: (agentName: AgentName) => void;
  activeScenarioId: string | null;
  activeAgentCalls: Record<string, number>;
}

export function PhasePanel({ phase, onSelectScenario, onSelectAgent, activeScenarioId, activeAgentCalls }: Props) {
  return (
    <div className="h-full overflow-y-auto bg-slate-50 border-r border-slate-200">
      {/* Phase header */}
      <div className="p-5 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{phase.icon}</span>
          <div>
            <h2 className="text-lg font-bold text-slate-800">{phase.label}</h2>
            <span className="text-xs text-slate-400">{phase.dateRange}</span>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">{phase.description}</p>
      </div>

      {/* Milestones */}
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Milestones</h3>
        <div className="space-y-1.5">
          {phase.milestones.map((m, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
              <span className="text-slate-300 mt-0.5">○</span>
              <span>{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active agents */}
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Active Agents</h3>
        <div className="grid grid-cols-2 gap-2">
          {phase.activeAgents.map(agentName => {
            const agent = agentRegistry.find(a => a.name === agentName);
            if (!agent) return null;
            const calls = activeAgentCalls[agentName] || 0;
            return (
              <button
                key={agentName}
                onClick={() => onSelectAgent(agentName)}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
              >
                <span className="text-lg">{agent.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-slate-700 truncate group-hover:text-blue-700">{agent.label}</div>
                  <div className="text-[10px] text-slate-400">{agent.system}</div>
                </div>
                {calls > 0 && (
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">{calls}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Guided scenarios */}
      <div className="p-4">
        <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Guided Experiences</h3>
        <div className="space-y-2.5">
          {phase.scenarios.map(scenario => {
            const isActive = scenario.id === activeScenarioId;
            return (
              <button
                key={scenario.id}
                onClick={() => onSelectScenario(scenario)}
                className={`w-full text-left p-3.5 rounded-xl border-2 transition-all ${
                  isActive
                    ? 'border-blue-400 bg-blue-50 shadow-md shadow-blue-100'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-xl mt-0.5">{scenario.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm font-semibold ${isActive ? 'text-blue-800' : 'text-slate-800'}`}>
                      {scenario.title}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{scenario.description}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {scenario.agents.map(an => {
                        const ag = agentRegistry.find(a => a.name === an);
                        return ag ? (
                          <span key={an} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">
                            {ag.icon} {ag.label}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className={`mt-1 transition-transform ${isActive ? 'rotate-90' : ''}`}>
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
