import { useChat } from '../../context/ChatContext';
import { personas, phaseLabels, levelLabels } from '../../data/newHireProfiles';
import { agentRegistry } from '../../data/agents';

export function NewHireProfile() {
  const { persona, setPersona, activeTools, allToolCalls } = useChat();

  // Count tool calls per agent
  const agentCallCounts: Record<string, number> = {};
  allToolCalls.forEach(tc => {
    agentCallCounts[tc.name] = (agentCallCounts[tc.name] || 0) + 1;
  });

  return (
    <div className="w-72 border-l border-slate-200 bg-slate-50 flex flex-col overflow-y-auto">
      {/* Persona selector */}
      <div className="p-4 border-b border-slate-200">
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Demo Persona</label>
        <select
          value={persona.id}
          onChange={e => {
            const p = personas.find(p => p.id === e.target.value);
            if (p) setPersona(p);
          }}
          className="mt-1 w-full text-sm rounded-lg border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {personas.map(p => (
            <option key={p.id} value={p.id}>{p.name} - {p.role}</option>
          ))}
        </select>
      </div>

      {/* Profile card */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            {persona.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-semibold text-sm text-slate-800">{persona.name}</div>
            <div className="text-xs text-slate-500">{persona.role}</div>
          </div>
        </div>
        <div className="mt-3 space-y-1.5 text-xs">
          <Row label="Department" value={persona.department} />
          <Row label="Country" value={persona.country} />
          <Row label="Level" value={levelLabels[persona.jobLevel]} />
          <Row label="Phase" value={phaseLabels[persona.phase]} />
          <Row label="Manager" value={persona.manager} />
          <Row label="Start Date" value={persona.startDate} />
        </div>
      </div>

      {/* Connected Agents */}
      <div className="p-4 flex-1">
        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Connected Agents</label>
        <div className="mt-2 space-y-2">
          {agentRegistry.map(agent => {
            const isActive = activeTools.includes(agent.name);
            const callCount = agentCallCounts[agent.name] || 0;
            return (
              <div
                key={agent.name}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-all ${
                  isActive ? 'bg-blue-50 border border-blue-300 shadow-sm' : 'bg-white border border-slate-200'
                }`}
              >
                <span className="text-base">{agent.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-700 truncate">{agent.label}</div>
                  <div className="text-slate-400 text-[10px]">{agent.system}</div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                )}
                {callCount > 0 && !isActive && (
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{callCount}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-700 font-medium text-right">{value}</span>
    </div>
  );
}
