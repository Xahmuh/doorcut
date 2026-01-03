
import React from 'react';
import { ChevronLeft, Bell, Gift, Calendar, ShieldCheck, CheckCheck } from 'lucide-react';
import { NOTIFICATIONS } from '../constants';
import { Language } from '../index';

const NotificationsView: React.FC<{ onBack: () => void; lang: Language }> = ({ onBack, lang }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-top duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-stone-800 rounded-full text-stone-400">
            {lang === 'ar' ? <ChevronLeft className="rotate-180" size={24} /> : <ChevronLeft size={24} />}
          </button>
          <h2 className="text-xl font-black">{lang === 'ar' ? 'التنبيهات' : 'Notifications'}</h2>
        </div>
        <button className="text-gold text-xs font-bold uppercase tracking-widest flex items-center gap-1">
          <CheckCheck size={14} /> {lang === 'ar' ? 'تحديد الكل كمقروء' : 'Mark all read'}
        </button>
      </div>

      <div className="space-y-4">
        {NOTIFICATIONS.map((n) => (
          <div key={n.id} className={`p-5 rounded-[32px] border transition-all flex gap-4 ${n.isRead ? 'bg-stone-900/50 border-stone-800/50 grayscale opacity-60' : 'bg-stone-900 border-stone-800 shadow-xl'}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${n.type === 'booking' ? 'bg-blue-500/10 text-blue-500' : n.type === 'reward' ? 'bg-gold/10 text-gold' : 'bg-stone-800 text-stone-400'}`}>
              {n.type === 'booking' && <Calendar size={24} />}
              {n.type === 'reward' && <Gift size={24} />}
              {n.type === 'system' && <ShieldCheck size={24} />}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <h4 className={`font-bold text-sm ${n.isRead ? 'text-stone-400' : 'text-white'}`}>{n.title}</h4>
                <span className="text-[10px] text-stone-600 font-bold">{n.time}</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-10 opacity-20">
        <Bell size={64} className="mx-auto mb-4" />
        <p className="text-sm font-bold uppercase tracking-[4px]">{lang === 'ar' ? 'لا يوجد المزيد' : 'End of line'}</p>
      </div>
    </div>
  );
};

export default NotificationsView;
