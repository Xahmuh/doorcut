
import React, { useState } from 'react';
import { Bell, Menu, Scissors, ChevronRight, MessageSquare, Globe, X, User, Settings, HelpCircle, LogOut, Wallet, Sparkles, CheckCircle2, Inbox } from 'lucide-react';
import { BARBERS, BOOKINGS, PLACEHOLDER_IMAGE } from '../constants';
import { BookingStatus } from '../types';
import { Language } from '../index';

interface HomeViewProps {
  onBookNow: () => void;
  onChat: () => void;
  onNotifications: () => void;
  onLogout: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onBookNow, onChat, onNotifications, onLogout, lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = {
    greeting: lang === 'ar' ? 'مساء الخير،' : 'Good Evening,',
    userName: lang === 'ar' ? 'أحمد' : 'Ahmed',
    subtitle: lang === 'ar' ? 'جاهز لإطلالة جديدة؟' : 'Ready for a premium refresh?',
    aiSuggestion: lang === 'ar' ? 'اقتراح الذكاء الاصطناعي' : 'AI Suggestion',
    aiTitle: lang === 'ar' ? 'قصتك المفضلة جاهزة للتجديد.' : 'Your signature fade is ready for a touch-up.',
    aiDesc: lang === 'ar' ? 'بناءً على دورة حلاقتك كل 3 أسابيع.' : 'Based on your 3-week grooming cycle.',
    bookNow: lang === 'ar' ? 'احجز الآن' : 'Book Now',
    upcoming: lang === 'ar' ? 'الجلسات القادمة' : 'Upcoming Sessions',
    past: lang === 'ar' ? 'الجلسات السابقة' : 'Done Sessions',
    masterBarbers: lang === 'ar' ? 'كبار الحلاقين' : 'Master Barbers',
    viewAll: lang === 'ar' ? 'عرض الكل' : 'View All',
    calendar: lang === 'ar' ? 'التقويم' : 'Calendar',
    book: lang === 'ar' ? 'حجز' : 'Book',
    currency: lang === 'ar' ? 'د.ب' : 'BHD',
    noBookings: lang === 'ar' ? 'لا توجد مواعيد' : 'No appointments',
    menu: {
      profile: lang === 'ar' ? 'الملف الشخصي' : 'My Profile',
      wallet: lang === 'ar' ? 'المحفظة' : 'My Wallet',
      settings: lang === 'ar' ? 'الإعدادات' : 'Settings',
      help: lang === 'ar' ? 'المساعدة والدعم' : 'Help & Support',
      logout: lang === 'ar' ? 'تسجيل الخروج' : 'Logout'
    }
  };

  const upcomingBookings = BOOKINGS.filter(b => b.status === BookingStatus.UPCOMING);
  const pastBookings = BOOKINGS.filter(b => b.status === BookingStatus.COMPLETED);

  const getBarberName = (name: string) => {
    if (name === 'معاذ محمد') return lang === 'ar' ? 'معاذ محمد' : 'Muaz Mohamed';
    return name;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 relative">
      {/* Sidebar Navigation */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-[150] animate-in fade-in duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className={`fixed top-0 bottom-0 ${lang === 'ar' ? 'right-0' : 'left-0'} w-3/4 max-w-[300px] bg-stone-900 z-[160] shadow-2xl animate-in ${lang === 'ar' ? 'slide-in-from-right' : 'slide-in-from-left'} duration-300 border-x border-stone-800 p-8 flex flex-col`}>
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <Scissors size={20} className="text-gold" />
                <span className="font-black tracking-[3px] text-sm text-white">DOORCUT</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-stone-800 rounded-full text-stone-400">
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 space-y-6">
              {[
                { icon: <User size={20} />, label: t.menu.profile },
                { icon: <Wallet size={20} />, label: t.menu.wallet },
                { icon: <Settings size={20} />, label: t.menu.settings },
                { icon: <HelpCircle size={20} />, label: t.menu.help },
              ].map((item, i) => (
                <button key={i} className="flex items-center gap-4 w-full text-stone-300 hover:text-gold transition-colors p-2 rounded-xl hover:bg-stone-800/50">
                  <span className="p-2 bg-stone-800 rounded-lg text-stone-500">{item.icon}</span>
                  <span className="font-bold text-sm">{item.label}</span>
                </button>
              ))}
            </nav>

            <button 
              onClick={onLogout}
              className="flex items-center gap-4 w-full text-red-500 mt-auto p-4 bg-red-500/5 rounded-2xl border border-red-500/10 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-black text-xs uppercase tracking-widest">{t.menu.logout}</span>
            </button>
          </div>
        </>
      )}

      <header className="flex justify-between items-center">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 hover:bg-stone-800 rounded-full transition-colors text-stone-400"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            <Scissors size={16} className="text-stone-900" />
          </div>
          <span className="font-black tracking-[3px] text-sm text-white">DOORCUT</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="p-2 hover:bg-stone-800 rounded-full transition-colors text-gold flex items-center gap-1"
          >
            <Globe size={18} />
            <span className="text-[10px] font-black uppercase">{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>
          <button onClick={onChat} className="p-2 hover:bg-stone-800 rounded-full transition-colors text-stone-400">
            <MessageSquare size={22} />
          </button>
          <button onClick={onNotifications} className="relative p-2 hover:bg-stone-800 rounded-full transition-colors text-stone-400">
            <Bell size={22} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-stone-950"></span>
          </button>
        </div>
      </header>

      <section>
        <h1 className="text-3xl font-black text-white">{t.greeting} <span className="text-gold">{t.userName}</span></h1>
        <p className="text-stone-500 text-sm font-medium mt-1">{t.subtitle}</p>
      </section>

      <div className="relative overflow-hidden rounded-[40px] group shadow-2xl">
        <img 
          src={PLACEHOLDER_IMAGE} 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-1000"
          alt="background"
        />
        <div className="relative p-8 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent h-full flex flex-col justify-between min-h-[220px]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-black tracking-widest text-white uppercase w-fit">
            <Sparkles size={12} className="text-gold" />
            {t.aiSuggestion}
          </div>
          
          <div>
            <h2 className="text-2xl font-black mb-2 text-white">{t.aiTitle}</h2>
            <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-6">{t.aiDesc}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {[1, 2, 3].map((i) => (
                  <img key={i} src={PLACEHOLDER_IMAGE} className="w-9 h-9 rounded-full border-2 border-stone-950 object-cover" alt="barber" />
                ))}
              </div>
              <button 
                onClick={onBookNow}
                className="flex items-center gap-2 px-6 py-3.5 bg-gold text-stone-950 font-black rounded-2xl hover:bg-yellow-500 transition-all shadow-xl active:scale-95"
              >
                {t.bookNow} {lang === 'en' ? <ChevronRight size={18} /> : null}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Sessions Section */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-black text-white">{t.upcoming}</h3>
          <button className="text-gold text-[10px] font-black uppercase tracking-widest">{t.calendar}</button>
        </div>
        <div className="space-y-4">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map(booking => (
              <div key={booking.id} className="bg-stone-900/50 p-5 rounded-[32px] border border-stone-800 flex items-center gap-5 backdrop-blur-sm group hover:border-stone-700 transition-all cursor-pointer">
                <div className="bg-stone-800/80 p-3 rounded-2xl text-center min-w-[70px] border border-stone-700 shadow-inner group-hover:bg-gold transition-all">
                  <p className="text-[10px] font-black text-gold uppercase tracking-tighter group-hover:text-stone-950">{lang === 'ar' ? 'أكتوبر' : 'Oct'}</p>
                  <p className="text-3xl font-black text-white group-hover:text-stone-950">{booking.date.split(' ')[0]}</p>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{booking.serviceName}</h4>
                  <p className="text-stone-500 text-xs font-medium mt-1">🕒 {booking.time} • {lang === 'ar' ? 'مع' : 'w/'} {getBarberName(booking.barberName)}</p>
                </div>
                <button onClick={onChat} className="p-3 bg-stone-800/50 rounded-2xl text-stone-500 hover:text-gold transition-colors">
                  <MessageSquare size={20} />
                </button>
              </div>
            ))
          ) : (
             <div className="bg-stone-900/30 border border-dashed border-stone-800 rounded-[32px] p-8 text-center opacity-40">
                <Inbox size={32} className="mx-auto mb-2" />
                <p className="text-[10px] font-black uppercase tracking-widest">{t.noBookings}</p>
             </div>
          )}
        </div>
      </section>

      {/* Done Sessions Section */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-black text-white">{t.past}</h3>
        </div>
        <div className="space-y-3">
          {pastBookings.length > 0 ? (
            pastBookings.map(booking => (
              <div key={booking.id} className="bg-stone-900/30 border border-stone-800/50 p-4 rounded-[28px] flex items-center gap-4 group hover:bg-stone-900/50 transition-all opacity-80 hover:opacity-100">
                <div className="p-3 bg-stone-800/50 rounded-2xl text-stone-500">
                   <CheckCircle2 size={24} className="text-green-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-stone-300 text-sm">{booking.serviceName}</h4>
                  <p className="text-stone-600 text-[10px] font-bold uppercase tracking-widest mt-0.5">{booking.date} • {getBarberName(booking.barberName)}</p>
                </div>
                <div className="text-right">
                   <p className="text-gold font-black text-sm">{booking.price.toFixed(3)}</p>
                   <p className="text-[8px] font-black text-stone-600 uppercase">{t.currency}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center opacity-20">
               <p className="text-xs font-black uppercase tracking-widest">{t.noBookings}</p>
            </div>
          )}
        </div>
      </section>

      <section className="pb-8">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-black text-white">{t.masterBarbers}</h3>
          <button className="text-stone-500 text-[10px] font-black uppercase tracking-widest">{t.viewAll}</button>
        </div>
        <div className="space-y-4">
          {BARBERS.map(barber => (
            <div key={barber.id} className="bg-stone-900 border border-stone-800 p-4 rounded-[32px] flex items-center gap-5 hover:border-gold/30 transition-all group">
              <div className="relative">
                <img src={barber.image} className="w-16 h-16 rounded-[20px] object-cover shadow-lg" alt={barber.name} />
                {barber.isOnline && <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-[3px] border-stone-900"></span>}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white">{getBarberName(barber.name)}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                   <Sparkles size={12} className="text-gold fill-gold" />
                   <span className="text-xs font-black text-white">{barber.rating}</span>
                   <span className="text-stone-600 text-xs font-bold">({barber.reviewCount})</span>
                </div>
              </div>
              <button 
                onClick={onBookNow}
                className="px-6 py-2.5 bg-stone-800 hover:bg-gold hover:text-stone-950 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md"
              >
                {t.book}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeView;
