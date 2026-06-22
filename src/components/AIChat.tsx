import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot } from 'lucide-react';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'bot' | 'user' }[]>([
    { text: 'Halo! Saya asisten AI di website Kevin. Ada yang ingin ditanyakan tentang Kevin atau keahliannya?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage })
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();
      
      if (data.text) {
        setMessages(prev => [...prev, { text: data.text, sender: 'bot' }]);
      } else {
        setMessages(prev => [...prev, { text: 'Maaf, saya tidak dapat merespons saat ini.', sender: 'bot' }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { text: 'Terjadi kesalahan jaringan atau API Key tidak valid.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        className="fixed right-6 bottom-6 w-14 h-14 rounded-full border-none bg-[var(--accent)] text-white shadow-[0_0_20px_var(--accent-glow)] z-[90] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 md:bottom-6 md:right-6 bottom-4 right-4 w-12 h-12 md:w-14 md:h-14"
        onClick={() => setIsOpen(true)}
        aria-label="Tanya AI"
      >
        <Bot size={28} />
      </button>

      <div className={`fixed right-6 bottom-[90px] w-[340px] h-[480px] bg-zinc-900/95 backdrop-blur-xl border border-[var(--border)] rounded-2xl flex flex-col z-[90] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'} md:right-6 md:bottom-[90px] md:w-[340px] md:h-[480px] right-4 bottom-20 w-[calc(100vw-32px)] h-[60vh]`}>
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="text-[15px] font-medium flex items-center gap-2">
            <Sparkles size={18} className="text-[var(--accent)]" /> 
            Kevin AI
          </h3>
          <button 
            className="bg-transparent border-none text-[var(--text-dim)] cursor-pointer hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <div ref={chatRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                msg.sender === 'bot' 
                  ? 'bg-white/5 self-start rounded-bl-sm' 
                  : 'bg-[var(--accent)] text-white self-end rounded-br-sm'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed bg-white/5 self-start rounded-bl-sm">
              Mengetik...
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--border)] flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-black/30 border border-[var(--border)] px-3.5 py-2.5 rounded-lg text-white outline-none focus:border-[var(--accent)] text-sm"
            placeholder="Ketik pesan..." 
            autoComplete="off" 
            required 
          />
          <button 
            type="submit" 
            className="bg-[var(--accent)] border-none rounded-lg w-11 text-white cursor-pointer flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-50"
            aria-label="Kirim"
            disabled={isLoading}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
