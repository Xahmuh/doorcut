
import React from 'react';
import { Sparkles, ChevronRight, Scissors, ShieldCheck, MapPin, Globe } from 'lucide-react';
import { Language } from '../index';
import { PLACEHOLDER_IMAGE } from '../constants';

interface LandingViewProps {
  onEnter: () => void;
  onLogin: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onEnter, onLogin, lang, setLang }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-stone-950 flex flex-col items-center justify-between text-center animate-in fade-in duration-1000">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={PLACEHOLDER_IMAGE} 
          className="w-full h-full object-cover brightness-[0.2]" 
          alt="hero" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
      </div>

      {/* Language Toggle */}
      <div className="relative z-20 w-full flex justify-end p-6">
        <button 
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-gold hover:bg-white/10 transition-all"
        >
          <Globe size={18} />
          <span className="text-xs font-black uppercase tracking-widest">{lang === 'ar' ? 'English' : 'عربي'}</span>
        </button>
      </div>

      <div className="relative z-10 pt-10 px-8 w-full">
        <div className="w-20 h-20 bg-gold rounded-[24px] flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(234,179,8,0.3)] animate-bounce-slow">
          <Scissors size={40} className="text-stone-950" />
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-white mb-4">
          DOOR<span className="text-gold">CUT</span>
        </h1>
        <p className="text-stone-400 text-lg font-medium leading-relaxed max-w-[280px] mx-auto">
          {lang === 'ar' ? 'حلاقون محترفون يصلون إلى باب منزلك.' : 'Premium master barbers delivered to your doorstep.'}
        </p>
      </div>

      <div className="relative z-10 w-full px-8 pb-16 space-y-10">
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <Scissors size={20} />, label: lang === 'ar' ? 'خبراء' : 'Expert' },
            { icon: <ShieldCheck size={20} />, label: lang === 'ar' ? 'موثوق' : 'Verified' },
            { icon: <MapPin size={20} />, label: lang === 'ar' ? 'متنقل' : 'Mobile' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-gold border border-white/10">
                {item.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <button 
            onClick={onEnter}
            className="w-full py-5 bg-gold text-stone-950 font-black rounded-[32px] text-lg flex items-center justify-center gap-3 hover:bg-yellow-500 transition-all shadow-[0_20px_40px_rgba(234,179,8,0.2)] active:scale-95"
          >
            {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'} {lang === 'en' ? <ChevronRight size={24} /> : null}
          </button>
          <p className="text-stone-600 text-xs font-bold uppercase tracking-widest">
            {lang === 'ar' ? 'عضو بالفعل؟' : 'Already a member?'} <span onClick={onLogin} className="text-white cursor-pointer hover:text-gold transition-colors">{lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export default LandingView;
