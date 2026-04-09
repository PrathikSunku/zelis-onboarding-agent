import { useState, useRef, useEffect } from 'react';
import type { AgentName } from '../../types';
import { agentRegistry } from '../../data/agents';
import { useChat } from '../../context/ChatContext';

// Simulated direct agent queries (no Claude needed — instant responses)
import { simulateWorkday } from '../../agents/simulators/workday';
import { simulateJira } from '../../agents/simulators/jira';
import { simulateBenefits } from '../../agents/simulators/benefits';
import { simulateZhub } from '../../agents/simulators/zhub';
import { simulateItAccess } from '../../agents/simulators/itAccess';
import { simulateBuddy } from '../../agents/simulators/buddy';

interface Props {
  agentName: AgentName;
  onClose: () => void;
  onOpenChat: () => void;
}

const sampleQueries: Record<AgentName, { label: string; action: string; input: Record<string, any> }[]> = {
  workday_training: [
    { label: '📋 Check my assignments', action: 'check_assignments', input: { action: 'check_assignments' } },
    { label: '⏰ Compliance deadlines', action: 'check_compliance', input: { action: 'check_compliance' } },
    { label: '🔍 Search courses', action: 'search_courses', input: { action: 'search_courses', query: 'leadership' } },
    { label: '📊 My completion rate', action: 'check_completion', input: { action: 'check_completion' } },
  ],
  jira_ticket: [
    { label: '📝 Create IT ticket', action: 'create', input: { action: 'create', category: 'IT', summary: 'System access request' } },
    { label: '📝 Create P&C ticket', action: 'create', input: { action: 'create', category: 'P&C', summary: 'HR support request' } },
    { label: '🔍 Check ticket status', action: 'check_status', input: { action: 'check_status' } },
    { label: '📋 My open tickets', action: 'list_open', input: { action: 'list_open' } },
  ],
  benefits_lookup: [
    { label: '📊 Enrollment status', action: 'enrollment_status', input: { action: 'enrollment_status' } },
    { label: '🏥 Medical plans', action: 'plan_details', input: { action: 'plan_details', plan_type: 'medical' } },
    { label: '⏰ Deadlines', action: 'deadlines', input: { action: 'deadlines' } },
    { label: '⚖️ Compare plans', action: 'compare_plans', input: { action: 'compare_plans', plan_type: 'medical' } },
  ],
  zhub_search: [
    { label: '📖 Onboarding resources', action: 'search', input: { query: 'onboarding', source: 'all' } },
    { label: '💰 How Zelis makes money', action: 'search', input: { query: 'product', source: 'all' } },
    { label: '📋 PTO policy', action: 'search', input: { query: 'pto', source: 'all' } },
    { label: '🏢 My department info', action: 'search', input: { query: 'department', source: 'all' } },
    { label: '🔧 How to use Jira', action: 'search', input: { query: 'jira', source: 'all' } },
    { label: '🏠 Remote work policy', action: 'search', input: { query: 'remote', source: 'all' } },
  ],
  it_provisioning: [
    { label: '📊 My access status', action: 'check_status', input: { action: 'check_status' } },
    { label: '🔑 Request Salesforce', action: 'request_access', input: { action: 'request_access', system_name: 'Salesforce' } },
    { label: '📋 Available systems', action: 'list_systems', input: { action: 'list_systems' } },
  ],
  buddy_connect: [
    { label: '👋 Meet my buddy', action: 'get_buddy', input: { action: 'get_buddy' } },
    { label: '👥 Team introductions', action: 'team_intro', input: { action: 'team_intro' } },
    { label: '💡 Culture tips', action: 'culture_tips', input: { action: 'culture_tips' } },
    { label: '📅 Upcoming events', action: 'upcoming_events', input: { action: 'upcoming_events' } },
  ],
};

const simulators: Record<AgentName, (input: any, persona: any) => any> = {
  workday_training: simulateWorkday,
  jira_ticket: simulateJira,
  benefits_lookup: simulateBenefits,
  zhub_search: simulateZhub,
  it_provisioning: simulateItAccess,
  buddy_connect: simulateBuddy,
};

export function AgentPanel({ agentName, onClose, onOpenChat }: Props) {
  const { persona } = useChat();
  const agent = agentRegistry.find(a => a.name === agentName)!;
  const [results, setResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults([]);
    setSearchQuery('');
  }, [agentName]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [results]);

  const runQuery = (input: Record<string, any>, label: string) => {
    const simulator = simulators[agentName];
    const result = simulator(input, persona);
    setResults(prev => [...prev, { label, input, result, timestamp: new Date() }]);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    if (agentName === 'zhub_search') {
      runQuery({ query: searchQuery, source: 'all' }, `Search: "${searchQuery}"`);
    } else {
      runQuery({ action: 'search_courses', query: searchQuery }, `Search: "${searchQuery}"`);
    }
    setSearchQuery('');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 py-3 border-b border-slate-200" style={{ background: `linear-gradient(135deg, ${agent.color}08, ${agent.color}15)` }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${agent.color}20` }}>
              {agent.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">{agent.label}</h3>
              <p className="text-[10px] text-slate-500">Connected to {agent.system}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onOpenChat} className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-blue-600 text-white hover:bg-blue-700">
              💬 Ask Zara
            </button>
            <button onClick={onClose} className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-100 text-slate-500 hover:bg-slate-200">
              ✕ Close
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2">{agent.description}</p>
      </div>

      {/* Search bar (for knowledge base and training) */}
      {(agentName === 'zhub_search' || agentName === 'workday_training') && (
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
          <div className="flex gap-2">
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder={agentName === 'zhub_search' ? 'Search Zhub & Confluence...' : 'Search courses...'}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleSearch} className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="px-4 py-3 border-b border-slate-100">
        <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Quick Actions</h4>
        <div className="flex flex-wrap gap-1.5">
          {sampleQueries[agentName].map((q, i) => (
            <button
              key={i}
              onClick={() => runQuery(q.input, q.label)}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {results.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
            <span className="text-4xl mb-3">{agent.icon}</span>
            <p className="text-sm font-medium">Click a quick action or search to query this agent</p>
            <p className="text-xs mt-1">Results will appear here in real-time</p>
          </div>
        )}

        {results.map((r, i) => (
          <div key={i} className="rounded-xl border border-slate-200 overflow-hidden animate-fade-in">
            <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-700">{r.label}</span>
              <span className="text-[10px] text-slate-400">
                {r.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="p-3">
              <ResultRenderer agentName={agentName} result={r.result} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultRenderer({ agentName, result }: { agentName: AgentName; result: any }) {
  // Zhub search — show articles as cards
  if (agentName === 'zhub_search' && result.results) {
    return (
      <div className="space-y-2">
        {result.results.map((article: any, i: number) => (
          <div key={i} className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
            <div className="text-xs font-semibold text-slate-800">{article.title}</div>
            <div className="text-[10px] text-amber-600 mt-0.5">{article.source}</div>
            <p className="text-[11px] text-slate-600 mt-1">{article.summary}</p>
            <div className="text-[10px] text-blue-600 mt-1 truncate">{article.url}</div>
          </div>
        ))}
        <p className="text-[10px] text-slate-400">{result.resultCount} results found</p>
      </div>
    );
  }

  // Training assignments
  if (result.assignments) {
    return (
      <div className="space-y-1.5">
        {result.assignments.map((t: any, i: number) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 border border-blue-100">
            <span className="text-xs">{t.status === 'completed' ? '✅' : t.status === 'in_progress' ? '🔄' : '📋'}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-slate-700 truncate">{t.title}</div>
              <div className="text-[10px] text-slate-400">{t.duration} · Due {t.dueDate}</div>
            </div>
            {t.completionPct > 0 && (
              <span className="text-[10px] font-medium text-blue-600">{t.completionPct}%</span>
            )}
          </div>
        ))}
        <p className="text-[10px] text-slate-400">
          {result.summary.completed}/{result.summary.total} completed
        </p>
      </div>
    );
  }

  // Jira tickets
  if (result.ticket) {
    const t = result.ticket;
    return (
      <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-purple-800">{t.id}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
            t.status === 'Open' ? 'bg-amber-100 text-amber-700' :
            t.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
          }`}>{t.status}</span>
        </div>
        <div className="text-xs text-slate-700 mt-1">{t.summary}</div>
        <div className="text-[10px] text-slate-400 mt-1">Assigned to: {t.assignee}</div>
      </div>
    );
  }

  // Benefits plans
  if (result.plans) {
    const plans = result.plans;
    if (plans.medical && Array.isArray(plans.medical)) {
      return (
        <div className="space-y-1.5">
          {plans.medical.map((p: any, i: number) => (
            <div key={i} className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="text-xs font-semibold text-slate-800">{p.name}</div>
              <div className="text-[10px] text-slate-500 mt-1">
                {p.monthlyPremium} · Deductible: {p.deductible} · Max: {p.outOfPocketMax}
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

  // IT provisioning
  if (result.standardAccess) {
    return (
      <div className="space-y-1.5">
        {[...result.standardAccess, ...(result.roleBasedAccess || [])].map((s: any, i: number) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-xs">{s.status === 'provisioned' ? '✅' : s.status === 'pending' ? '⏳' : '🔒'}</span>
            <span className="text-xs text-slate-700 flex-1">{s.name}</span>
            <span className={`text-[10px] font-medium ${
              s.status === 'provisioned' ? 'text-green-600' : 'text-amber-600'
            }`}>{s.status.replace('_', ' ')}</span>
          </div>
        ))}
      </div>
    );
  }

  // Buddy info
  if (result.buddy) {
    const b = result.buddy;
    return (
      <div className="p-2.5 rounded-lg bg-pink-50 border border-pink-200">
        <div className="text-xs font-semibold text-slate-800">{b.name}</div>
        <div className="text-[10px] text-slate-500">{b.role} · {b.tenure}</div>
        <div className="text-[10px] text-pink-600 mt-1">Fun fact: {b.funFact}</div>
        <div className="text-[10px] text-blue-600 mt-1">{b.email}</div>
      </div>
    );
  }

  // Fallback: pretty JSON
  return (
    <pre className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded-lg overflow-x-auto max-h-48">
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}
