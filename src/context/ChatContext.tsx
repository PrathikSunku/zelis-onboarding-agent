import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { ChatMessage, Persona, ToolCallResult } from '../types';
import { personas } from '../data/newHireProfiles';
import { sendMessage } from '../api/claude';

interface ChatState {
  messages: ChatMessage[];
  persona: Persona;
  isLoading: boolean;
  activeTools: string[];
  allToolCalls: ToolCallResult[];
  setPersona: (p: Persona) => void;
  send: (text: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatState | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [persona, setPersonaState] = useState<Persona>(personas[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [allToolCalls, setAllToolCalls] = useState<ToolCallResult[]>([]);

  const setPersona = useCallback((p: Persona) => {
    setPersonaState(p);
    setMessages([]);
    setAllToolCalls([]);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setAllToolCalls([]);
  }, []);

  const send = useCallback(async (text: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setActiveTools([]);

    try {
      const apiMessages = [...messages, userMsg].map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

      const result = await sendMessage(apiMessages, persona);

      if (result.toolCalls?.length) {
        setActiveTools(result.toolCalls.map(tc => tc.name));
        setAllToolCalls(prev => [...prev, ...result.toolCalls]);
      }

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: result.response,
        toolCalls: result.toolCalls,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error: any) {
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `I'm having trouble connecting right now. Error: ${error.message}. Please make sure the server is running on port 3001.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => setActiveTools([]), 2000);
    }
  }, [messages, persona]);

  return (
    <ChatContext.Provider value={{ messages, persona, isLoading, activeTools, allToolCalls, setPersona, send, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
