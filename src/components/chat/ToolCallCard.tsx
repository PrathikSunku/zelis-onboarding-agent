import type { ToolCallResult } from '../../types';
import { agentRegistry } from '../../data/agents';

export function ToolCallCard({ toolCall }: { toolCall: ToolCallResult }) {
  const agent = agentRegistry.find(a => a.name === toolCall.name);
  if (!agent) return null;

  return (
    <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-white/60 border border-slate-200 text-xs">
      <span className="text-base leading-none mt-0.5">{agent.icon}</span>
      <div className="min-w-0">
        <div className="font-semibold text-slate-700">{agent.label}</div>
        <div className="text-slate-500 truncate">
          Queried {agent.system}
          {toolCall.input.action && <span> &middot; {toolCall.input.action.replace(/_/g, ' ')}</span>}
        </div>
      </div>
      <div className="ml-auto">
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Done
        </span>
      </div>
    </div>
  );
}

export function ToolCallLoading({ names }: { names: string[] }) {
  return (
    <div className="space-y-1.5">
      {names.map(name => {
        const agent = agentRegistry.find(a => a.name === name);
        return (
          <div key={name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 text-xs animate-pulse">
            <span className="text-base">{agent?.icon || '...'}</span>
            <span className="text-blue-700 font-medium">Querying {agent?.system || name}...</span>
            <div className="ml-auto w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          </div>
        );
      })}
    </div>
  );
}
