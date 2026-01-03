
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send, Phone, Info, MoreHorizontal } from 'lucide-react';
import { CHAT_MESSAGES, MOCK_USER, BARBERS } from '../constants';
import { Language } from '../index';

const ChatView: React.FC<{ onBack: () => void; lang: Language }> = ({ onBack, lang }) => {
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      senderId: MOCK_USER.id,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const activeBarber = BARBERS[0];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] animate-in slide-in-from-right duration-500">
      {/* Chat Header */}
      <header className="flex items-center gap-4 p-4 border-b border-stone-800 bg-stone-950/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-stone-800 rounded-full text-stone-400">
          {lang === 'ar' ? <ChevronLeft className="rotate-180" size={24} /> : <ChevronLeft size={24} />}
        </button>
        <div className="relative">
          <img src={activeBarber.image} className="w-10 h-10 rounded-full object-cover" alt="barber" />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-stone-950 rounded-full" />
        </div>
        <div className="flex-1">
          <h4 className="font-black text-sm text-white">{activeBarber.name}</h4>
          <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">{lang === 'ar' ? 'متصل' : 'Online'}</p>
        </div>
        <div className="flex gap-1">
          <button className="p-2 hover:bg-stone-800 rounded-full text-stone-400"><Phone size={20} /></button>
          <button className="p-2 hover:bg-stone-800 rounded-full text-stone-400"><Info size={20} /></button>
        </div>
      </header>

      {/* Message List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-fixed"
      >
        <div className="text-center">
          <span className="text-[10px] font-bold text-stone-600 uppercase tracking-[4px]">{lang === 'ar' ? 'اليوم' : 'Today'}</span>
        </div>
        
        {messages.map((msg) => {
          const isMe = msg.senderId === MOCK_USER.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`p-4 rounded-3xl text-sm leading-relaxed ${isMe ? 'bg-gold text-stone-950 font-medium rounded-tr-none' : 'bg-stone-900 text-stone-200 rounded-tl-none border border-stone-800 shadow-xl'}`}
                >
                  {msg.text}
                </div>
                <p className="text-[8px] text-stone-600 font-bold px-1">{msg.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-stone-950 border-t border-stone-800 pb-8">
        <div className="flex gap-2 bg-stone-900 border border-stone-800 rounded-2xl p-2 items-center focus-within:border-gold transition-all shadow-inner">
          <button className="p-2 text-stone-500 hover:text-gold"><MoreHorizontal size={24} /></button>
          <input 
            type="text" 
            placeholder={lang === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 text-white placeholder-stone-600"
          />
          <button 
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className={`p-3 rounded-xl transition-all ${inputText.trim() ? 'bg-gold text-stone-950 scale-100 shadow-lg' : 'bg-stone-800 text-stone-600 scale-90 opacity-50'}`}
          >
            <Send size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
