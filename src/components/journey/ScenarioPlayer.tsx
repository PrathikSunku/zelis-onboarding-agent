import { useState, useEffect, useRef } from 'react';
import type { Scenario, ScriptedMessage } from '../../data/phases';
import { agentRegistry } from '../../data/agents';
import { useChat } from '../../context/ChatContext';

interface Props {
  scenario: Scenario;
  onComplete: () => void;
  onOpenChat: () => void;
}

export function ScenarioPlayer({ scenario, onComplete, onOpenChat }: Props) {
  const { send } = useChat();
  const [visibleMessages, setVisibleMessages] = useState<ScriptedMessage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleMessages([]);
    setCurrentIndex(0);
    setIsPlaying(true);
    setIsTyping(false);
  }, [scenario.id]);

  useEffect(() => {
    if (!isPlaying || currentIndex >= scenario.messages.length) {
      if (currentIndex >= scenario.messages.length) setIsPlaying(false);
      return;
    }

    const msg = scenario.messages[currentIndex];
    const delay = msg.delay || 1000;

    // Show typing indicator for assistant messages
    if (msg.role === 'assistant' && msg.content) {
      setIsTyping(true);
    }

    const timer = setTimeout(() => {
      setIsTyping(false);
      setVisibleMessages(prev => [...prev, msg]);
      setCurrentIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying, scenario.messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [visibleMessages, isTyping]);

  const isComplete = currentIndex >= scenario.messages.length && !isPlaying;
  const progress = Math.round((currentIndex / scenario.messages.length) * 100);

  return (
    <div className="h-full flex flex-col">
      {/* Scenario header */}
      <div className="px-5 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{scenario.icon}</span>
            <div>
              <h3 className="text-sm font-bold text-slate-800">{scenario.title}</h3>
              <p className="text-[10px] text-slate-500">{scenario.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isComplete && (
              <button
                onClick={() => setIsPlaying(prev => !prev)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                {isPlaying ? '⏸ Pause' : '▶ Resume'}
              </button>
            )}
            <button
              onClick={onOpenChat}
              className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              💬 Open Free Chat
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-2 h-1 bg-blue-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        {/* Agent badges */}
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-[10px] text-slate-400">Agents involved:</span>
          {scenario.agents.map(an => {
            const ag = agentRegistry.find(a => a.name === an);
            return ag ? (
              <span key={an} className="inline-flex items-center gap-1 text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">
                {ag.icon} {ag.label}
              </span>
            ) : null;
          })}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50">
        {visibleMessages.map((msg, i) => {
          if (msg.role === 'user') {
            return (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 bg-blue-600 text-white text-sm">
                  {msg.content}
                </div>
              </div>
            );
          }

          // Tool call card (assistant with toolCalls but no content)
          if (msg.toolCalls && !msg.content) {
            return (
              <div key={i} className="space-y-1.5">
                {msg.toolCalls.map((tc, j) => {
                  const ag = agentRegistry.find(a => a.name === tc.name);
                  return (
                    <div key={j} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs animate-fade-in">
                      <span className="text-base">{ag?.icon || '🔧'}</span>
                      <span className="text-emerald-700 font-medium">{tc.summary}</span>
                      <span className="ml-auto inline-flex items-center gap-1 text-emerald-600 text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Done
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          }

          // Assistant message
          return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[85%] space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">Z</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-600">Zara</span>
                </div>
                <div className="rounded-2xl rounded-bl-md px-4 py-2.5 bg-white border border-slate-200 text-sm text-slate-800 leading-relaxed shadow-sm whitespace-pre-wrap">
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">Z</span>
              </div>
              <div className="rounded-2xl px-4 py-3 bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completion state */}
        {isComplete && (
          <div className="text-center py-4 space-y-3 animate-fade-in">
            <div className="text-3xl">✨</div>
            <p className="text-sm font-semibold text-slate-700">Scenario Complete!</p>
            <p className="text-xs text-slate-500">This shows how Zara guides new hires through this task using AI agents.</p>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => { setVisibleMessages([]); setCurrentIndex(0); setIsPlaying(true); }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                🔄 Replay
              </button>
              <button
                onClick={onOpenChat}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                💬 Try It Live
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
