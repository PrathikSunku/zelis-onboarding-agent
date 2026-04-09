import { useChat } from '../../context/ChatContext';
import { agentRegistry } from '../../data/agents';

export function AgentNetwork() {
  const { activeTools, allToolCalls } = useChat();

  const agentCallCounts: Record<string, number> = {};
  allToolCalls.forEach(tc => {
    agentCallCounts[tc.name] = (agentCallCounts[tc.name] || 0) + 1;
  });

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Agent Network</h2>
        <p className="text-sm text-slate-500 mb-8">
          Zara orchestrates these specialized agents to provide unified onboarding support across all Zelis systems.
        </p>

        {/* Orchestrator in center */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-3xl text-white font-bold">Z</span>
          </div>
          <div className="mt-2 text-center">
            <div className="font-bold text-slate-800">Zara</div>
            <div className="text-xs text-slate-500">Orchestrator Agent</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Powered by Claude AI</div>
          </div>
        </div>

        {/* Connection lines visual */}
        <div className="grid grid-cols-3 gap-6">
          {agentRegistry.map(agent => {
            const isActive = activeTools.includes(agent.name);
            const callCount = agentCallCounts[agent.name] || 0;
            const lastCall = allToolCalls.filter(tc => tc.name === agent.name).slice(-1)[0];

            return (
              <div
                key={agent.name}
                className={`relative rounded-xl border-2 p-5 transition-all ${
                  isActive
                    ? 'border-blue-400 bg-blue-50 shadow-lg shadow-blue-100'
                    : callCount > 0
                    ? 'border-slate-300 bg-white shadow-sm'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-blue-500 border-2 border-white animate-pulse" />
                )}

                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${agent.color}15` }}
                  >
                    {agent.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-800">{agent.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{agent.system}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-3">{agent.description}</p>

                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-blue-200 text-blue-800' :
                    callCount > 0 ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isActive ? 'Active' : callCount > 0 ? `${callCount} calls` : 'Idle'}
                  </span>
                  <span className="text-[10px] text-slate-400" style={{ color: agent.color }}>
                    {agent.name}
                  </span>
                </div>

                {/* Last call result preview */}
                {lastCall && (
                  <div className="mt-3 p-2 rounded-lg bg-slate-100 text-[10px] text-slate-500 font-mono max-h-20 overflow-hidden">
                    Last: {lastCall.input.action || lastCall.input.query || 'query'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Activity log */}
        {allToolCalls.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Activity Log</h3>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {[...allToolCalls].reverse().map((tc, i) => {
                const agent = agentRegistry.find(a => a.name === tc.name);
                return (
                  <div key={i} className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-white border border-slate-200">
                    <span>{agent?.icon}</span>
                    <span className="font-medium text-slate-700">{agent?.label}</span>
                    <span className="text-slate-400">&middot;</span>
                    <span className="text-slate-500">{tc.input.action || tc.input.query || 'query'}</span>
                    <span className="ml-auto text-emerald-600 text-[10px] font-medium">completed</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
