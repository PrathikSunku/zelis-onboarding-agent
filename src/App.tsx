import { useState, useCallback } from 'react';
import { ChatProvider, useChat } from './context/ChatContext';
import { ChatWindow } from './components/chat/ChatWindow';
import { AgentPanel } from './components/journey/AgentPanel';
import { PhaseTimeline } from './components/journey/PhaseTimeline';
import { PhasePanel } from './components/journey/PhasePanel';
import { ScenarioPlayer } from './components/journey/ScenarioPlayer';
import { OrchestrationShowcase } from './components/journey/OrchestrationShowcase';
import { phases } from './data/phases';
import { personas } from './data/newHireProfiles';
import type { AgentName } from './types';
import type { Scenario } from './data/phases';

type RightPanel = 'welcome' | 'chat' | 'agent' | 'scenario' | 'showcase';

function JourneyApp() {
  const { persona, setPersona, allToolCalls } = useChat();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [completedPhases] = useState<Set<number>>(new Set());
  const [rightPanel, setRightPanel] = useState<RightPanel>('welcome');
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [activeAgent, setActiveAgent] = useState<AgentName | null>(null);

  const currentPhase = phases[phaseIndex];

  const agentCallCounts: Record<string, number> = {};
  allToolCalls.forEach(tc => {
    agentCallCounts[tc.name] = (agentCallCounts[tc.name] || 0) + 1;
  });

  const handleSelectScenario = useCallback((scenario: Scenario) => {
    setActiveScenario(scenario);
    setActiveAgent(null);
    setRightPanel('scenario');
  }, []);

  const handleSelectAgent = useCallback((agentName: AgentName) => {
    setActiveAgent(agentName);
    setActiveScenario(null);
    setRightPanel('agent');
  }, []);

  const handleOpenChat = useCallback(() => {
    setActiveAgent(null);
    setActiveScenario(null);
    setRightPanel('chat');
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <header className="h-12 flex items-center justify-between border-b border-slate-200 bg-white px-5 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">Z</span>
          </div>
          <span className="font-bold text-slate-800 text-sm">Zelis</span>
          <span className="text-slate-300 mx-1">|</span>
          <span className="text-xs text-slate-500 font-medium">Intelligent Onboarding Journey</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setRightPanel('showcase')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              rightPanel === 'showcase'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            ⚡ Showcase
          </button>
          <button
            onClick={handleOpenChat}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              rightPanel === 'chat'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            💬 Free Chat
          </button>
          <select
            value={persona.id}
            onChange={e => {
              const p = personas.find(p => p.id === e.target.value);
              if (p) setPersona(p);
            }}
            className="text-xs rounded-lg border border-slate-300 px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {personas.map(p => (
              <option key={p.id} value={p.id}>{p.name} — {p.role}</option>
            ))}
          </select>
          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-full">Powered by INVENTA</span>
        </div>
      </header>

      {/* Phase timeline */}
      <PhaseTimeline
        activePhaseIndex={phaseIndex}
        onSelectPhase={i => { setPhaseIndex(i); setRightPanel('welcome'); setActiveScenario(null); setActiveAgent(null); }}
        completedPhases={completedPhases}
      />

      {/* Main content: left panel + right panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Phase panel */}
        <div className="w-[380px] shrink-0">
          <PhasePanel
            phase={currentPhase}
            onSelectScenario={handleSelectScenario}
            onSelectAgent={handleSelectAgent}
            activeScenarioId={activeScenario?.id || null}
            activeAgentCalls={agentCallCounts}
          />
        </div>

        {/* Right: Dynamic panel */}
        <div className="flex-1 min-w-0">
          {rightPanel === 'welcome' && (
            <WelcomePanel
              phase={currentPhase}
              personaName={persona.name.split(' ')[0]}
              onStartScenario={() => {
                if (currentPhase.scenarios.length > 0) {
                  handleSelectScenario(currentPhase.scenarios[0]);
                }
              }}
              onOpenChat={handleOpenChat}
            />
          )}
          {rightPanel === 'chat' && <ChatWindow />}
          {rightPanel === 'showcase' && <OrchestrationShowcase persona={persona} />}
          {rightPanel === 'scenario' && activeScenario && (
            <ScenarioPlayer
              scenario={activeScenario}
              onComplete={() => {}}
              onOpenChat={handleOpenChat}
            />
          )}
          {rightPanel === 'agent' && activeAgent && (
            <AgentPanel
              agentName={activeAgent}
              onClose={() => setRightPanel('welcome')}
              onOpenChat={handleOpenChat}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function WelcomePanel({ phase, personaName, onStartScenario, onOpenChat }: {
  phase: typeof phases[0];
  personaName: string;
  onStartScenario: () => void;
  onOpenChat: () => void;
}) {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="text-center max-w-lg">
        <div className="text-5xl mb-4">{phase.icon}</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{phase.label}</h2>
        <p className="text-slate-500 text-sm mb-1">{phase.dateRange}</p>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">{phase.description}</p>

        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={onStartScenario}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
          >
            <span>▶</span> Start Guided Experience
          </button>
          <button
            onClick={onOpenChat}
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-all"
          >
            💬 Free Chat with Zara
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Select a guided experience or agent from the left panel, or chat freely with Zara.
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ChatProvider>
      <JourneyApp />
    </ChatProvider>
  );
}

export default App;
