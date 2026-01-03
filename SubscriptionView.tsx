
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Check, Sparkles, Zap, ShieldCheck, Crown, ChevronRight, Users, Briefcase, Star, CheckCircle2 } from 'lucide-react';
import { PLANS } from '../constants';
import { Language } from '../index';
import { Plan } from '../types';

interface SubscriptionViewProps {
  onBack: () => void;
  currentPlanId: string;
  onUpdatePlan: (id: string) => void;
  lang: Language;
}

const SubscriptionView: React.FC<SubscriptionViewProps> = ({ onBack, currentPlanId, onUpdatePlan, lang }) => {
  const [activeCategory, setActiveCategory] = useState<'Individual' | 'Family' | 'Business'>('Individual');
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastSelectedPlan, setLastSelectedPlan] = useState('');

  const t = {
    title: lang === 'ar' ? 'خطط الاشتراك' : 'Subscription Plans',
    currentStatus: lang === 'ar' ? 'الحالة الحالية' : 'Current Status',
    renewing: lang === 'ar' ? 'يتجدد في 24 نوفمبر 2023' : 'Renewing on Nov 24, 2023',
    mostPopular: lang === 'ar' ? 'الأكثر رواجاً' : 'Most Popular',
    perMonth: lang === 'ar' ? '/شهرياً' : '/month',
    currentPlan: lang === 'ar' ? 'خطتك الحالية' : 'Current Plan',
    vipBadge: lang === 'ar' ? 'عضوية النخبة' : 'VIP Membership',
    successMsg: lang === 'ar' ? 'تم تحديث اشتراكك بنجاح!' : 'Subscription updated successfully!',
    disclaimer: lang === 'ar' 
      ? 'قد تختلف الأسعار بناءً على منطقتك. يتم تجديد الاشتراكات تلقائياً حتى يتم إلغاؤها في إعدادات جهازك.'
      : 'Prices may vary based on your region. Subscriptions auto-renew until cancelled in your device settings.',
    categories: {
      Individual: lang === 'ar' ? 'فردي' : 'Individual',
      Family: lang === 'ar' ? 'عائلي' : 'Family',
      Business: lang === 'ar' ? 'أعمال' : 'Business',
    },
    bestFor: lang === 'ar' ? 'مثالي لـ:' : 'Best for:',
    customPrice: lang === 'ar' ? 'سعر مخصص' : 'Custom Pricing'
  };

  const currency = lang === 'ar' ? 'د.ب' : 'BHD';

  const handlePlanUpdate = (id: string, name: string) => {
    onUpdatePlan(id);
    setLastSelectedPlan(name);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const filteredPlans = PLANS.filter(plan => plan.category === activeCategory);

  const renderPlanCard = (plan: Plan) => {
    const isCurrent = plan.id === currentPlanId;
    const isElite = plan.isVIP;

    return (
      <div 
        key={plan.id}
        onClick={() => !isCurrent && handlePlanUpdate(plan.id, plan.name)}
        className={`relative rounded-[32px] border-2 p-8 transition-all duration-500 overflow-hidden cursor-pointer active:scale-[0.98] ${
          isCurrent 
            ? 'bg-stone-900 border-gold shadow-[0_20px_50px_rgba(234,179,8,0.15)]' 
            : isElite 
              ? 'bg-gradient-to-br from-stone-900 to-black border-gold/40 shadow-2xl'
              : 'bg-stone-900/40 border-stone-800 opacity-90'
        }`}
      >
        {/* Elite/VIP Background Element */}
        {isElite && (
          <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
            <Crown size={120} className="text-gold" />
          </div>
        )}

        {/* Badges */}
        <div className="flex gap-2 mb-4">
          {plan.isPopular && (
            <div className="px-3 py-1 bg-gold text-stone-950 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
              {t.mostPopular}
            </div>
          )}
          {isElite && (
            <div className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/20 flex items-center gap-1">
              <Star size={10} className="fill-gold text-gold" /> {t.vipBadge}
            </div>
          )}
        </div>

        <div className="flex justify-between items-start mb-8 text-right">
          <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <h4 className={`text-2xl font-black ${isElite ? 'text-white' : 'text-stone-100'}`}>{plan.name}</h4>
            <div className="flex items-baseline gap-1 mt-1">
              {typeof plan.price === 'number' ? (
                <>
                  <span className="text-3xl font-black text-gold">{plan.price}</span>
                  <span className="text-stone-500 text-sm font-bold">{currency} {t.perMonth}</span>
                </>
              ) : (
                <span className="text-xl font-black text-gold uppercase tracking-tight">{t.customPrice}</span>
              )}
            </div>
          </div>
          <div className={`p-3 rounded-2xl ${isCurrent ? 'bg-gold/20 text-gold' : 'bg-stone-800 text-stone-500'}`}>
            {plan.category === 'Individual' && (plan.isVIP ? <Crown size={24} /> : <Zap size={24} />)}
            {plan.category === 'Family' && <Users size={24} />}
            {plan.category === 'Business' && <Briefcase size={24} />}
          </div>
        </div>

        <div className="h-[1px] bg-stone-800/50 mb-6" />

        <ul className="space-y-4 mb-10">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-medium text-stone-300">
              <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${isElite ? 'bg-gold/20' : 'bg-stone-800'}`}>
                <Check size={12} className="text-gold" strokeWidth={3} />
              </div>
              {feature}
            </li>
          ))}
        </ul>

        <button 
          className={`w-full py-5 rounded-[24px] font-black uppercase tracking-widest text-sm transition-all duration-300 ${
            isCurrent 
              ? 'bg-stone-800 text-stone-400 cursor-default' 
              : isElite
                ? 'bg-gold text-stone-950 hover:bg-yellow-500 shadow-[0_15px_30px_rgba(234,179,8,0.3)] active:scale-95'
                : 'bg-stone-100 text-stone-950 hover:bg-white shadow-xl active:scale-95'
          }`}
        >
          {isCurrent ? t.currentPlan : plan.ctaText}
        </button>
      </div>
    );
  };

  const currentPlanObj = PLANS.find(p => p.id === currentPlanId) || PLANS[0];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500 pb-24">
      {/* Success Notification Overlay */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-green-500 text-stone-950 p-4 rounded-3xl flex items-center gap-4 shadow-[0_20px_40px_rgba(34,197,94,0.3)] border-2 border-green-400">
            <div className="p-2 bg-white/20 rounded-full">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="font-black text-sm">{t.successMsg}</p>
              <p className="text-[10px] font-bold opacity-80">{lastSelectedPlan} Is Now Active</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-stone-800 rounded-full text-stone-400">
          {lang === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        <h2 className="text-xl font-black">{t.title}</h2>
      </div>

      {/* Current Subscription Status */}
      <div className="bg-stone-900 border border-stone-800 rounded-[40px] p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-stone-500 text-[10px] font-black uppercase tracking-[3px]">{t.currentStatus}</p>
            <h3 className="text-2xl font-black text-white">{currentPlanObj.name} <span className="text-gold">{t.currentPlan}</span></h3>
            <p className="text-stone-600 text-[10px] font-bold uppercase tracking-widest">{t.renewing}</p>
          </div>
          <div className="w-16 h-16 bg-gold/10 text-gold rounded-3xl border border-gold/20 flex items-center justify-center animate-pulse">
            {currentPlanObj.isVIP ? <Crown size={32} /> : <Zap size={32} />}
          </div>
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="bg-stone-900/50 p-2 rounded-[28px] border border-stone-800 flex gap-2">
        {(['Individual', 'Family', 'Business'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-1 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${
              activeCategory === cat 
                ? 'bg-gold text-stone-950 shadow-lg' 
                : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            {t.categories[cat]}
          </button>
        ))}
      </div>

      {/* Plans List */}
      <div className="space-y-6">
        {filteredPlans.map(renderPlanCard)}
      </div>

      <div className="text-center px-10">
        <p className="text-stone-600 text-[10px] font-bold leading-relaxed uppercase tracking-widest">
          {t.disclaimer}
        </p>
      </div>
    </div>
  );
};

export default SubscriptionView;
