
import React, { useState } from 'react';
import { Calendar, Clock, MoreVertical, Star, ChevronRight, ChevronLeft, MessageSquare, Inbox } from 'lucide-react';
import { BOOKINGS } from '../constants';
import { BookingStatus } from '../types';
import { Language } from '../index';

interface BookingsViewProps {
  onChat?: () => void;
  lang: Language;
}

const BookingsView: React.FC<BookingsViewProps> = ({ onChat, lang }) => {
  const [filter, setFilter] = useState<'Upcoming' | 'Past'>('Upcoming');

  const t = {
    title: lang === 'ar' ? 'حجوزاتي' : 'My Appointments',
    upcoming: lang === 'ar' ? 'القادمة' : 'Upcoming',
    past: lang === 'ar' ? 'السابقة' : 'Past',
    with: lang === 'ar' ? 'مع' : 'with',
    reschedule: lang === 'ar' ? 'إعادة جدولة' : 'Reschedule',
    cancel: lang === 'ar' ? 'إلغاء' : 'Cancel',
    noBookings: lang === 'ar' ? 'لا توجد مواعيد حالية' : 'No current appointments',
    noPastBookings: lang === 'ar' ? 'لا يوجد سجل حجوزات' : 'No booking history',
    currency: lang === 'ar' ? 'د.ب' : 'BHD'
  };

  const upcomingBookings = BOOKINGS.filter(b => b.status === BookingStatus.UPCOMING);
  const pastBookings = BOOKINGS.filter(b => b.status === BookingStatus.COMPLETED);

  const renderEmptyState = (message: string) => (
    <div className="flex flex-col items-center justify-center py-20 opacity-20 space-y-4">
      <Inbox size={64} strokeWidth={1} />
      <p className="font-black uppercase tracking-[3px] text-xs">{message}</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">{t.title}</h2>
        <div className="bg-stone-900 p-1 rounded-xl flex gap-1 border border-stone-800">
          {(['Upcoming', 'Past'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-6 py-2 rounded-lg text-xs font-black transition-all uppercase tracking-wider ${filter === opt ? 'bg-gold text-stone-950 shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}
            >
              {opt === 'Upcoming' ? t.upcoming : t.past}
            </button>
          ))}
        </div>
      </div>

      {filter === 'Upcoming' ? (
        <div className="space-y-4">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map(booking => (
              <div key={booking.id} className="bg-stone-900 border border-stone-800 rounded-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500">
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="relative">
                        <img src={booking.barberImage} className="w-14 h-14 rounded-2xl object-cover border-2 border-stone-800" alt="barber" />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-stone-900"></span>
                      </div>
                      <div>
                        <h4 className="font-black text-white text-lg leading-none mb-1">{booking.serviceName}</h4>
                        <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">{t.with} {booking.barberName}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={onChat} className="p-3 bg-stone-800/50 rounded-xl text-stone-400 hover:text-gold transition-colors">
                        <MessageSquare size={18} />
                      </button>
                      <button className="p-3 bg-stone-800/50 rounded-xl text-stone-400 hover:text-white transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs font-black text-gold bg-gold/5 px-4 py-2 rounded-2xl border border-gold/10 uppercase tracking-widest">
                      <Calendar size={14} />
                      {booking.date}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-black text-stone-400 bg-stone-800/50 px-4 py-2 rounded-2xl border border-stone-700 uppercase tracking-widest">
                      <Clock size={14} />
                      {booking.duration}
                    </div>
                  </div>
                </div>
                <div className="flex border-t border-stone-800/50 bg-stone-950/20">
                  <button className="flex-1 py-5 text-[10px] font-black text-stone-400 hover:text-white hover:bg-stone-800/40 transition-all uppercase tracking-[2px]">{t.reschedule}</button>
                  <div className="w-[1px] bg-stone-800/50"></div>
                  <button className="flex-1 py-5 text-[10px] font-black text-red-500/70 hover:text-red-500 hover:bg-red-500/5 transition-all uppercase tracking-[2px]">{t.cancel}</button>
                </div>
              </div>
            ))
          ) : renderEmptyState(t.noBookings)}
        </div>
      ) : (
        <div className="space-y-4">
          {pastBookings.length > 0 ? (
            pastBookings.map(booking => (
              <div key={booking.id} className="bg-stone-900/40 border border-stone-800/50 p-6 rounded-[32px] flex items-center gap-5 group hover:bg-stone-900 transition-all cursor-pointer">
                <img src={booking.barberImage} className="w-14 h-14 rounded-2xl object-cover opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all border-2 border-transparent group-hover:border-stone-800" alt="barber" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-black text-stone-400 group-hover:text-white transition-colors">{booking.serviceName}</h4>
                    <span className="text-stone-500 font-black text-sm">{booking.price.toFixed(3)} {t.currency}</span>
                  </div>
                  <p className="text-stone-600 text-[10px] font-bold uppercase tracking-widest mt-1">{booking.date} • {booking.barberName}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={10} className="fill-stone-800 text-stone-800 group-hover:fill-gold group-hover:text-gold transition-colors" />
                    ))}
                  </div>
                </div>
                <button className="p-3 bg-stone-800/30 rounded-xl text-stone-700 group-hover:text-gold transition-colors">
                  {lang === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>
            ))
          ) : renderEmptyState(t.noPastBookings)}
        </div>
      )}
    </div>
  );
};

export default BookingsView;
