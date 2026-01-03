
import React, { useState } from 'react';
import { ChevronLeft, Mail, Lock, User, ArrowRight, Scissors, Eye, EyeOff } from 'lucide-react';
import { Language } from '../index';

interface SignupViewProps {
  onBack: () => void;
  onSuccess: () => void;
  onLogin: () => void;
  lang: Language;
}

const SignupView: React.FC<SignupViewProps> = ({ onBack, onSuccess, onLogin, lang }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-stone-950 flex flex-col p-8 animate-in slide-in-from-bottom duration-500 overflow-y-auto">
      <header className="flex items-center gap-4 mb-12 flex-shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-stone-900 rounded-full text-stone-400 transition-colors">
          {lang === 'ar' ? <ChevronLeft className="rotate-180" size={24} /> : <ChevronLeft size={24} />}
        </button>
        <div className="flex items-center gap-2">
          <Scissors size={16} className="text-gold" />
          <span className="font-black tracking-[3px] text-xs text-white">DOORCUT</span>
        </div>
      </header>

      <div className="flex-1 space-y-2">
        <h1 className="text-4xl font-black text-white leading-tight">
          {lang === 'ar' ? 'أنشئ ' : 'Create your '}
          <span className="text-gold">{lang === 'ar' ? 'ملفك الشخصي' : 'Profile'}</span>
        </h1>
        <p className="text-stone-500 font-medium">{lang === 'ar' ? 'انضم إلى مجتمع الحلاقة النخبة اليوم.' : 'Join the elite grooming community today.'}</p>

        <form onSubmit={handleSubmit} className="pt-10 space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <User className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-gold transition-colors`} size={20} />
              <input 
                required
                type="text" 
                placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full bg-stone-900/50 border border-stone-800 rounded-[20px] py-4 ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4'} focus:outline-none focus:border-gold transition-all text-white placeholder-stone-600 focus:bg-stone-900`}
              />
            </div>

            <div className="relative group">
              <Mail className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-gold transition-colors`} size={20} />
              <input 
                required
                type="email" 
                placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full bg-stone-900/50 border border-stone-800 rounded-[20px] py-4 ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4'} focus:outline-none focus:border-gold transition-all text-white placeholder-stone-600 focus:bg-stone-900`}
              />
            </div>

            <div className="relative group">
              <Lock className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-gold transition-colors`} size={20} />
              <input 
                required
                type={showPassword ? "text" : "password"} 
                placeholder={lang === 'ar' ? 'كلمة المرور' : 'Create Password'}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={`w-full bg-stone-900/50 border border-stone-800 rounded-[20px] py-4 ${lang === 'ar' ? 'pr-12 pl-12 text-right' : 'pl-12 pr-12'} focus:outline-none focus:border-gold transition-all text-white placeholder-stone-600 focus:bg-stone-900`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-stone-500 hover:text-gold transition-colors focus:outline-none`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="pt-6 space-y-6">
            <button 
              disabled={isLoading}
              type="submit"
              className={`w-full py-5 bg-gold text-stone-950 font-black rounded-[24px] flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-yellow-500'}`}
            >
              {isLoading ? (lang === 'ar' ? 'جاري الإنشاء...' : 'Creating Account...') : (lang === 'ar' ? 'انضم إلى النادي' : 'Join the Club')} 
              {!isLoading && <ArrowRight size={20} className={lang === 'ar' ? 'rotate-180' : ''} />}
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-[1px] bg-stone-800"></div>
              <span className="text-[10px] font-black text-stone-600 uppercase tracking-widest">{lang === 'ar' ? 'أو' : 'or'}</span>
              <div className="flex-1 h-[1px] bg-stone-800"></div>
            </div>

            <div className="space-y-3">
              <button 
                type="button"
                className="w-full py-4 border border-stone-800 text-white font-bold rounded-[24px] flex items-center justify-center gap-3 hover:bg-stone-900 transition-all"
              >
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="google" />
                {lang === 'ar' ? 'سجل عبر جوجل' : 'Sign up with Google'}
              </button>
              <button 
                type="button"
                className="w-full py-4 border border-stone-800 text-white font-bold rounded-[24px] flex items-center justify-center gap-3 hover:bg-stone-900 transition-all"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" className="w-5 h-5 grayscale" alt="apple" />
                {lang === 'ar' ? 'سجل عبر آبل' : 'Sign up with Apple'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <footer className="py-8 text-center flex-shrink-0">
        <p className="text-stone-600 text-xs font-bold uppercase tracking-widest">
          {lang === 'ar' ? 'عضو بالفعل؟' : 'Already a member?'} <span onClick={onLogin} className="text-white cursor-pointer hover:text-gold transition-colors">{lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
        </p>
      </footer>
    </div>
  );
};

export default SignupView;
