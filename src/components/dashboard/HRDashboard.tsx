import { personas, phaseLabels } from '../../data/newHireProfiles';
import { useChat } from '../../context/ChatContext';

const mockMetrics = {
  activeNewHires: 24,
  complianceOnTrack: 18,
  complianceAtRisk: 4,
  complianceOverdue: 2,
  benefitsEnrolled: 14,
  avgSatisfactionNps: 72,
  avgQuestionsPerHire: 8.3,
  avgResolutionTime: '4.2 min',
  topQuestions: [
    { question: 'Benefits enrollment', count: 34 },
    { question: 'System access requests', count: 28 },
    { question: 'Compliance training deadlines', count: 22 },
    { question: 'Company policies', count: 19 },
    { question: 'Team introductions', count: 15 },
  ],
  agentUtilization: [
    { agent: 'Training & Compliance', calls: 89, pct: 28 },
    { agent: 'Service Desk', calls: 72, pct: 23 },
    { agent: 'Benefits Advisor', calls: 65, pct: 21 },
    { agent: 'Knowledge Base', calls: 48, pct: 15 },
    { agent: 'IT Access', calls: 28, pct: 9 },
    { agent: 'Buddy & Culture', calls: 12, pct: 4 },
  ],
};

export function HRDashboard() {
  const { allToolCalls } = useChat();

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">HR Command Center</h2>
            <p className="text-sm text-slate-500">Real-time onboarding metrics across all new hires</p>
          </div>
          <div className="text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
            Last updated: just now
          </div>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard label="Active New Hires" value={mockMetrics.activeNewHires} color="blue" />
          <StatCard label="Compliance On Track" value={mockMetrics.complianceOnTrack} suffix={`/ ${mockMetrics.activeNewHires}`} color="green" />
          <StatCard label="At Risk / Overdue" value={`${mockMetrics.complianceAtRisk} / ${mockMetrics.complianceOverdue}`} color="amber" />
          <StatCard label="Avg NPS Score" value={mockMetrics.avgSatisfactionNps} color="purple" />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Agent utilization */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Agent Utilization</h3>
            <div className="space-y-3">
              {mockMetrics.agentUtilization.map(a => (
                <div key={a.agent}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{a.agent}</span>
                    <span className="text-slate-400">{a.calls} calls ({a.pct}%)</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${a.pct * 3}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top questions */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Top Questions This Week</h3>
            <div className="space-y-2.5">
              {mockMetrics.topQuestions.map((q, i) => (
                <div key={q.question} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 w-5">{i + 1}.</span>
                  <span className="text-sm text-slate-700 flex-1">{q.question}</span>
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{q.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* New hire roster */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">New Hire Roster (Demo Personas)</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Role</th>
                <th className="pb-2 font-medium">Department</th>
                <th className="pb-2 font-medium">Phase</th>
                <th className="pb-2 font-medium">Compliance</th>
                <th className="pb-2 font-medium">AI Interactions</th>
              </tr>
            </thead>
            <tbody>
              {personas.map(p => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="py-2.5 font-medium text-slate-700">{p.name}</td>
                  <td className="py-2.5 text-slate-600">{p.role}</td>
                  <td className="py-2.5 text-slate-500">{p.department}</td>
                  <td className="py-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      {phaseLabels[p.phase]}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.phase === 'first_month' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
                    }`}>
                      {p.phase === 'first_month' ? 'In Progress' : 'On Track'}
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-500">{Math.floor(Math.random() * 15) + 3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live session stats */}
        {allToolCalls.length > 0 && (
          <div className="mt-6 bg-blue-50 rounded-xl border border-blue-200 p-5">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Live Demo Session</h3>
            <p className="text-xs text-blue-600">
              {allToolCalls.length} agent calls made in this session across{' '}
              {new Set(allToolCalls.map(tc => tc.name)).size} different agents.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, suffix, color }: { label: string; value: string | number; suffix?: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
    purple: 'from-purple-500 to-purple-600',
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="text-xs text-slate-400 font-medium">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className={`text-2xl font-bold bg-gradient-to-r ${colors[color]} bg-clip-text text-transparent`}>
          {value}
        </span>
        {suffix && <span className="text-sm text-slate-400">{suffix}</span>}
      </div>
    </div>
  );
}
