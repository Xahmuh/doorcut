
import React from 'react';
import { Gift, Star, Zap, ChevronRight, Info, Award, Clock, ChevronLeft } from 'lucide-react';
import { MOCK_USER } from '../constants';
import { Language } from '../index';

const RewardsView: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = {
    title: lang === 'ar' ? 'المكافآت' : 'Rewards',
    tier: lang === 'ar' ? 'الفئة الذهبية' : 'GOLD TIER',
    loyaltyPoints: lang === 'ar' ? 'نقاط الولاء' : 'Loyalty Points',
    nextReward: lang === 'ar' ? 'المكافأة القادمة عند 2,000' : 'Next Reward at 2,000',
    toGo: lang === 'ar' ? 'متبقي 750' : '750 to go',
    freeHaircut: lang === 'ar' ? 'حلاقة مجانية' : 'Free Haircut',
    priority: lang === 'ar' ? 'حجز ذو أولوية' : 'Priority Booking',
    active: lang === 'ar' ? 'مفعل' : 'Active',
    claim: lang === 'ar' ? 'استبدال المكافآت' : 'Claim Rewards',
    pts: lang === 'ar' ? 'نقطة' : 'pts',
    beardSet: lang === 'ar' ? 'مجموعة العناية باللحية' : 'Beard Grooming Set',
    beardDesc: lang === 'ar' ? 'مزيج الزيت والبلسم الفاخر' : 'Premium oil and balm combo',
    fullTreatment: lang === 'ar' ? 'يوم المعاملة الكاملة' : 'Full Treatment Day',
    fullDesc: lang === 'ar' ? 'قص، حلاقة وقناع للوجه' : 'Cut, Shave & Facial Mask',
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">{t.title}</h2>
        <div className="bg-gold/10 px-3 py-1 rounded-full flex items-center gap-2 border border-gold/20">
          <Award size={14} className="text-gold" />
          <span className="text-gold text-[10px] font-black uppercase">{t.tier}</span>
        </div>
      </div>

      {/* Points Card */}
      <div className="relative overflow-hidden rounded-[40px] bg-stone-900 border border-stone-800 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-6 opacity-5">
           <Gift size={160} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Star size={20} className="text-gold fill-gold" />
            <span className="text-stone-400 font-bold text-sm">{t.loyaltyPoints}</span>
          </div>
          <h3 className="text-6xl font-black mb-6">{MOCK_USER.points}</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
              <span className="text-stone-500">{t.nextReward}</span>
              <span className="text-gold">{t.toGo}</span>
            </div>
            <div className="h-3 w-full bg-stone-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold to-yellow-600 w-[62%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Perks */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: t.freeHaircut, points: `1500 ${t.pts}`, icon: <Zap size={20} /> },
          { label: t.priority, points: t.active, icon: <Clock size={20} /> },
        ].map((perk, i) => (
          <div key={i} className="bg-stone-900/50 p-5 rounded-3xl border border-stone-800">
            <div className="w-10 h-10 bg-stone-800 rounded-2xl flex items-center justify-center text-gold mb-4">
              {perk.icon}
            </div>
            <h4 className="font-bold text-sm">{perk.label}</h4>
            <p className="text-stone-500 text-[10px] font-bold uppercase mt-1">{perk.points}</p>
          </div>
        ))}
      </div>

      {/* Available Rewards */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">{t.claim}</h3>
          <Info size={16} className="text-stone-600" />
        </div>
        <div className="space-y-3">
          {[
            { title: t.beardSet, desc: t.beardDesc, cost: 800, img: 'https://picsum.photos/seed/gift1/100/100' },
            { title: t.fullTreatment, desc: t.fullDesc, cost: 1200, img: 'https://picsum.photos/seed/gift2/100/100' },
          ].map((reward, i) => (
            <div key={i} className="bg-stone-900 p-4 rounded-3xl border border-stone-800 flex items-center gap-4">
              <img src={reward.img} className="w-16 h-16 rounded-2xl object-cover" alt="reward" />
              <div className="flex-1">
                <h4 className="font-bold">{reward.title}</h4>
                <p className="text-stone-500 text-xs">{reward.desc}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star size={12} className="text-gold fill-gold" />
                  <span className="text-xs font-black">{reward.cost} {t.pts}</span>
                </div>
              </div>
              <button className="p-2 bg-stone-800 rounded-full text-stone-400">
                {lang === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RewardsView;
