import { useState, useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { MessageBubble } from './MessageBubble';
import { ToolCallLoading } from './ToolCallCard';

const quickActions = [
  'What training do I need to complete?',
  'How do I enroll in benefits?',
  'I need access to Salesforce',
  'Who is my onboarding buddy?',
  'What should I do this week?',
  'How does Zelis make money?',
];

export function ChatWindow() {
  const { messages, isLoading, activeTools, send, persona } = useChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    send(text);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3">
              <span className="text-xl text-white font-bold">Z</span>
            </div>
            <h2 className="text-lg font-bold text-slate-800">Chat with Zara</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-md">
              Ask anything about your onboarding at Zelis. Zara connects to Workday, Jira, Zhub, and more to give you personalized answers.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 max-w-lg justify-center">
              {quickActions.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] space-y-2">
              <div className="flex items-center gap-1.5 px-1">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">Z</span>
                </div>
                <span className="text-xs font-semibold text-slate-600">Zara</span>
              </div>
              {activeTools.length > 0 && <ToolCallLoading names={activeTools} />}
              <div className="rounded-2xl px-4 py-3 bg-white border border-slate-200 rounded-bl-md shadow-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 bg-white px-4 py-3">
        <div className="flex items-end gap-2 max-w-2xl mx-auto">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
            }}
            placeholder={`Ask Zara anything, ${persona.name.split(' ')[0]}...`}
            rows={1}
            className="flex-1 resize-none rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
        <div className="text-[10px] text-slate-400 text-center mt-1.5">
          Powered by Claude AI &middot; Connected to Workday, Jira, Zhub, and more
        </div>
      </div>
    </div>
  );
}
