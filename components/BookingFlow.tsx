
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Calendar as CalendarIcon, Clock, Sparkles, ShieldCheck, User, Baby, Scissors, Landmark, Banknote, Star, Info, QrCode, Home, Calendar } from 'lucide-react';
import { Language } from '../index';
import { SERVICES, CategorizedService, PLACEHOLDER_IMAGE } from '../constants';

type Step = 'target' | 'style' | 'datetime' | 'confirm' | 'success';

interface BookingFlowProps {
  onComplete: () => void;
  onBack: () => void;
  lang: Language;
  initialServiceId?: string;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ onComplete, onBack, lang, initialServiceId }) => {
  const [step, setStep] = useState<Step>(initialServiceId ? 'datetime' : 'target');
  
  // Logic to determine initial target if service is pre-selected
  const initialTarget = useMemo(() => {
    if (!initialServiceId) return 'man';
    const service = SERVICES.find(s => s.id === initialServiceId);
    return service?.category === 'Kids' ? 'child' : 'man';
  }, [initialServiceId]);

  // Generate the next 14 days for the calendar
  const calendarDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push({
        full: date.toISOString().split('T')[0],
        dayNum: date.getDate(),
        dayName: date.toLocaleDateString(lang === 'ar' ? 'ar-BH' : 'en-US', { weekday: 'short' }),
        monthName: date.toLocaleDateString(lang === 'ar' ? 'ar-BH' : 'en-US', { month: 'short' }),
      });
    }
    return dates;
  }, [lang]);

  const [bookingData, setBookingData] = useState({
    target: initialTarget as 'man' | 'child',
    serviceId: initialServiceId || '',
    date: calendarDates[0].full, // Default to today
    time: '14:00',
    paymentMethod: 'benefit' as 'benefit' | 'cash' | 'apple'
  });

  const [activeCategory, setActiveCategory] = useState('Haircut');
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const steps: Step[] = ['target', 'style', 'datetime', 'confirm'];
  const stepIndex = steps.indexOf(step as any);
  const currency = lang === 'ar' ? 'د.ب' : 'BHD';

  const t = {
    confirmBooking: lang === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking',
    finalConfirmation: lang === 'ar' ? 'التأكيد النهائي' : 'Final Confirmation',
    verifyDetails: lang === 'ar' ? 'يرجى التحقق من تفاصيل حجزك' : 'Please verify your booking details',
    service: lang === 'ar' ? 'الخدمة' : 'Service',
    date: lang === 'ar' ? 'التاريخ' : 'Date',
    time: lang === 'ar' ? 'الوقت' : 'Time',
    total: lang === 'ar' ? 'الإجمالي' : 'Total',
    next: lang === 'ar' ? 'الخطوة التالية' : 'Next Step',
    back: lang === 'ar' ? 'رجوع وتعديل' : 'Go back and edit',
    selectTarget: lang === 'ar' ? 'لمن الحجز؟' : 'Who is this for?',
    man: lang === 'ar' ? 'رجال' : 'Men',
    child: lang === 'ar' ? 'أطفال' : 'Kids',
    chooseStyle: lang === 'ar' ? 'اختر الخدمة' : 'Choose Service',
    selectTime: lang === 'ar' ? 'اختر الموعد' : 'Select Slot',
    payMethod: lang === 'ar' ? 'طريقة الدفع' : 'Payment Method',
    benefit: lang === 'ar' ? 'بينفت بي' : 'BenefitPay',
    cash: lang === 'ar' ? 'نقداً (كاش)' : 'Cash',
    payNow: lang === 'ar' ? 'دفع وتأكيد' : 'Pay & Confirm',
    barber: lang === 'ar' ? 'الحلاق' : 'Barber',
    muaz: lang === 'ar' ? 'معاذ محمد' : 'Muaz Mohamed',
    successTitle: lang === 'ar' ? 'تم الحجز بنجاح!' : 'Booking Confirmed!',
    successDesc: lang === 'ar' ? 'موعدك مؤكد ومسجل في النظام.' : 'Your appointment is confirmed and ready.',
    ticketId: lang === 'ar' ? 'رقم التذكرة' : 'Ticket ID',
    goHome: lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home',
    viewBookings: lang === 'ar' ? 'عرض حجوزاتي' : 'View My Bookings',
    forMen: lang === 'ar' ? 'خدمات الرجال' : 'Men\'s Services',
    forKids: lang === 'ar' ? 'خدمات الأطفال' : 'Kids\' Services',
    selectDay: lang === 'ar' ? 'اختر اليوم' : 'Select Day',
    availableSlots: lang === 'ar' ? 'الأوقات المتاحة' : 'Available Slots',
    categories: {
      Haircut: lang === 'ar' ? 'حلاقة' : 'Haircut',
      Beard: lang === 'ar' ? 'لحية' : 'Beard',
      Kids: lang === 'ar' ? 'حلاقة أطفال' : 'Kids Haircut',
      Premium: lang === 'ar' ? 'إضافات' : 'Add-Ons',
      Packages: lang === 'ar' ? 'باقات' : 'Packages',
    }
  };

  const availableCategories = useMemo(() => {
    if (bookingData.target === 'child') return ['Kids'];
    return ['Haircut', 'Beard', 'Premium', 'Packages'];
  }, [bookingData.target]);

  useEffect(() => {
    if (step === 'style') {
      if (bookingData.target === 'child') {
        setActiveCategory('Kids');
      } else if (!availableCategories.includes(activeCategory)) {
        setActiveCategory('Haircut');
      }
    }
  }, [step, bookingData.target]);

  const filteredServices = useMemo(() => {
    return SERVICES.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  const next = () => {
    if (stepIndex < steps.length - 1) {
      setStep(steps[stepIndex + 1]);
    } else {
      setShowSummaryModal(true);
    }
  };

  const handleFinalConfirm = () => {
    setShowSummaryModal(false);
    setStep('success');
  };

  const prev = () => {
    if (stepIndex > 0) {
      if (initialServiceId && step === 'datetime') {
        onBack();
      } else {
        setStep(steps[stepIndex - 1]);
      }
    } else {
      onBack();
    }
  };

  const selectedService = SERVICES.find(s => s.id === bookingData.serviceId) || SERVICES[0];
  const selectedDateObj = calendarDates.find(d => d.full === bookingData.date) || calendarDates[0];

  if (step === 'success') {
    return (
      <div className="flex flex-col h-full bg-stone-950 items-center justify-center px-6 animate-in fade-in zoom-in duration-700">
        <div className="w-full max-w-sm space-y-10 py-10">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(234,179,8,0.4)] animate-bounce-slow">
              <Check size={48} className="text-stone-950" strokeWidth={3} />
            </div>
            <h2 className="text-4xl font-black text-white">{t.successTitle}</h2>
            <p className="text-stone-500 font-medium">{t.successDesc}</p>
          </div>

          <div className="relative bg-stone-900 border border-stone-800 rounded-[40px] overflow-hidden shadow-2xl">
             <div className="absolute top-1/2 -left-4 w-8 h-8 bg-stone-950 rounded-full border border-stone-800 -translate-y-1/2"></div>
             <div className="absolute top-1/2 -right-4 w-8 h-8 bg-stone-950 rounded-full border border-stone-800 -translate-y-1/2"></div>
             <div className="absolute top-1/2 left-4 right-4 h-[1px] border-t border-dashed border-stone-700 -translate-y-1/2"></div>

             <div className="p-8 pb-12 space-y-6">
               <div className="flex justify-between items-start">
                 <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                   <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest mb-1">{t.service}</p>
                   <h4 className="text-lg font-black text-white">{selectedService.name}</h4>
                 </div>
                 <div className={`${lang === 'ar' ? 'text-left' : 'text-right'}`}>
                   <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest mb-1">{t.total}</p>
                   <h4 className="text-lg font-black text-gold">{selectedService.price.toFixed(3)} {currency}</h4>
                 </div>
               </div>

               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                   <img src={PLACEHOLDER_IMAGE} className="w-10 h-10 rounded-xl object-cover" />
                   <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                     <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest">{t.barber}</p>
                     <p className="text-xs font-bold text-white">{t.muaz}</p>
                   </div>
                 </div>
                 <div className={`${lang === 'ar' ? 'text-left' : 'text-right'}`}>
                    <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest">{t.ticketId}</p>
                    <p className="text-xs font-bold text-white">#DC-92841</p>
                 </div>
               </div>
             </div>

             <div className="p-8 pt-12 bg-stone-800/20 space-y-6 flex flex-col items-center">
                <div className="flex gap-12 w-full justify-center">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest mb-1">{t.date}</p>
                    <p className="font-bold text-white">{selectedDateObj.dayNum} {selectedDateObj.monthName}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest mb-1">{t.time}</p>
                    <p className="font-bold text-white">{bookingData.time}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-white rounded-2xl">
                  <QrCode size={100} className="text-stone-950" />
                </div>
             </div>
          </div>

          <div className="space-y-4 pt-4">
             <button 
               onClick={onComplete}
               className="w-full py-5 bg-gold text-stone-950 font-black rounded-3xl flex items-center justify-center gap-3 shadow-xl active:scale-95"
             >
               <Home size={20} /> {t.goHome}
             </button>
             <button 
               onClick={onComplete}
               className="w-full py-4 text-stone-500 font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors flex items-center justify-center gap-2"
             >
               <Calendar size={16} /> {t.viewBookings}
             </button>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes bounce-slow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s infinite ease-in-out;
          }
        `}} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
      {showSummaryModal && (
        <div className="fixed inset-0 z-[120] flex items-end justify-center px-4 pb-10 bg-stone-950/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-stone-900 border border-stone-800 rounded-[40px] p-8 space-y-8 shadow-[0_30px_60px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom duration-500">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/20">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-black text-white">{t.finalConfirmation}</h3>
              <p className="text-stone-500 text-sm">{t.verifyDetails}</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-4 bg-stone-800/40 rounded-3xl border border-stone-800/50 space-y-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest">{t.service}</p>
                  <p className="text-xs font-bold text-white truncate">{selectedService.name}</p>
                </div>
                <div className={`p-4 bg-stone-800/40 rounded-3xl border border-stone-800/50 space-y-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest">{t.date}</p>
                  <p className="text-xs font-bold text-white">{selectedDateObj.dayNum} {selectedDateObj.monthName}</p>
                </div>
                <div className={`p-4 bg-stone-800/40 rounded-3xl border border-stone-800/50 space-y-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest">{t.time}</p>
                  <p className="text-xs font-bold text-white">{bookingData.time}</p>
                </div>
                <div className={`p-4 bg-stone-800/40 rounded-3xl border border-stone-800/50 space-y-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest">{t.total}</p>
                  <p className="text-xs font-black text-gold">{selectedService.price.toFixed(3)} {currency}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <button 
                onClick={handleFinalConfirm}
                className="w-full py-5 bg-gold text-stone-950 font-black rounded-3xl flex items-center justify-center gap-2 shadow-[0_20px_40px_rgba(234,179,8,0.2)] hover:bg-yellow-500 transition-all active:scale-95"
              >
                {t.confirmBooking} <Check size={20} />
              </button>
              <button 
                onClick={() => setShowSummaryModal(false)}
                className="w-full py-4 text-stone-500 font-bold uppercase tracking-widest text-[10px] hover:text-white transition-colors"
              >
                {t.back}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <button onClick={prev} className="p-2 hover:bg-stone-800 rounded-full">
          {lang === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        <h2 className="text-lg font-black uppercase tracking-tight">
          {step === 'target' && t.selectTarget}
          {step === 'style' && (bookingData.target === 'man' ? t.forMen : t.forKids)}
          {step === 'datetime' && t.selectTime}
          {step === 'confirm' && t.payMethod}
        </h2>
        <div className="w-10 text-gold font-black text-xs">{stepIndex + 1}/4</div>
      </div>

      <div className="flex gap-2 mb-8 px-4">
        {steps.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= stepIndex ? 'bg-gold' : 'bg-stone-800'}`}></div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6">
        {step === 'target' && (
          <div className="grid grid-cols-1 gap-6 animate-in slide-in-from-bottom duration-500">
            <button 
              onClick={() => { setBookingData({...bookingData, target: 'man'}); next(); }}
              className={`p-10 rounded-[48px] border-2 transition-all flex flex-col items-center gap-4 ${bookingData.target === 'man' ? 'bg-stone-900 border-gold shadow-[0_30px_60px_rgba(0,0,0,0.4)]' : 'bg-stone-900/50 border-stone-800 opacity-60'}`}
            >
              <div className={`p-8 rounded-[32px] ${bookingData.target === 'man' ? 'bg-gold text-stone-950' : 'bg-stone-800 text-stone-500'}`}>
                <User size={56} />
              </div>
              <span className="text-3xl font-black">{t.man}</span>
            </button>
            <button 
              onClick={() => { setBookingData({...bookingData, target: 'child'}); next(); }}
              className={`p-10 rounded-[48px] border-2 transition-all flex flex-col items-center gap-4 ${bookingData.target === 'child' ? 'bg-stone-900 border-gold shadow-[0_30px_60px_rgba(0,0,0,0.4)]' : 'bg-stone-900/50 border-stone-800 opacity-60'}`}
            >
              <div className={`p-8 rounded-[32px] ${bookingData.target === 'child' ? 'bg-gold text-stone-950' : 'bg-stone-800 text-stone-500'}`}>
                <Baby size={56} />
              </div>
              <span className="text-3xl font-black">{t.child}</span>
            </button>
          </div>
        )}

        {step === 'style' && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            {availableCategories.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {availableCategories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-3 rounded-2xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-[2px] border-2 ${activeCategory === cat ? 'bg-gold border-gold text-stone-950' : 'bg-stone-900 border-stone-800 text-stone-500'}`}
                  >
                    {(t.categories as any)[cat]}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-4">
              {filteredServices.map(service => (
                <button 
                  key={service.id}
                  onClick={() => setBookingData({...bookingData, serviceId: service.id})}
                  className={`w-full p-5 rounded-[32px] border-2 transition-all flex items-center gap-5 ${bookingData.serviceId === service.id ? 'bg-stone-900 border-gold shadow-xl scale-[1.02]' : 'bg-stone-900/40 border-stone-800'}`}
                >
                  <div className="relative">
                    <img src={service.image} className="w-20 h-20 rounded-2xl object-cover shadow-lg" alt={service.name} />
                    {bookingData.serviceId === service.id && (
                      <div className="absolute -top-2 -right-2 bg-gold text-stone-950 p-1 rounded-full border-2 border-stone-900">
                        <Check size={12} />
                      </div>
                    )}
                  </div>
                  <div className={`flex-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <h4 className="font-black text-white text-sm">{service.name}</h4>
                    <p className="text-stone-500 text-[10px] mt-1 line-clamp-1">{service.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                       <span className="text-[10px] font-bold text-stone-400 flex items-center gap-1">
                         <Clock size={12} className="text-gold" /> {service.duration} {lang === 'ar' ? 'دقيقة' : 'min'}
                       </span>
                    </div>
                  </div>
                  <div className="text-gold font-black text-lg">
                     {service.price.toFixed(3)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'datetime' && (
          <div className="space-y-10 animate-in slide-in-from-bottom duration-500 pb-10">
            <div className="bg-stone-900/80 p-6 rounded-[32px] border border-stone-800 flex items-center gap-4">
               <img src={PLACEHOLDER_IMAGE} className="w-14 h-14 rounded-2xl object-cover" alt="muaz" />
               <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <h3 className="font-black text-white">{t.muaz}</h3>
                  <div className="flex items-center gap-1 text-gold">
                    <Star size={12} className="fill-gold" />
                    <span className="text-xs font-black">4.9 (156)</span>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
              <h3 className={`text-stone-500 text-[10px] font-black uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.selectDay}</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                {calendarDates.map((d) => (
                  <button 
                    key={d.full}
                    onClick={() => setBookingData({...bookingData, date: d.full})}
                    className={`flex-shrink-0 w-24 h-32 rounded-[32px] border-2 flex flex-col items-center justify-center gap-1.5 transition-all duration-300 relative ${bookingData.date === d.full ? 'bg-stone-900 border-gold shadow-[0_15px_30px_rgba(234,179,8,0.2)] scale-105 z-10' : 'bg-stone-900/40 border-stone-800/50 text-stone-500 opacity-70 hover:opacity-100'}`}
                  >
                    <span className={`text-[8px] font-black uppercase tracking-widest ${bookingData.date === d.full ? 'text-gold' : 'text-stone-600'}`}>{d.dayName}</span>
                    <span className={`text-3xl font-black ${bookingData.date === d.full ? 'text-white' : 'text-stone-400'}`}>{d.dayNum}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-tighter ${bookingData.date === d.full ? 'text-stone-400' : 'text-stone-600'}`}>{d.monthName}</span>
                    
                    {bookingData.date === d.full && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center border-2 border-stone-900">
                        <Check size={12} className="text-stone-950" strokeWidth={4} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className={`text-stone-500 text-[10px] font-black uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.availableSlots}</h3>
              <div className="grid grid-cols-3 gap-3">
                {['10:00', '11:30', '14:00', '15:30', '17:00', '18:30'].map(slot => (
                  <button 
                    key={slot}
                    onClick={() => setBookingData({...bookingData, time: slot})}
                    className={`py-4 rounded-2xl border-2 font-black transition-all ${bookingData.time === slot ? 'bg-gold/10 border-gold text-gold shadow-lg' : 'bg-stone-900 border-stone-800 text-stone-500'}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <h3 className={`text-stone-500 text-[10px] font-black uppercase tracking-widest ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.payMethod}</h3>
            <div className="space-y-3">
              {[
                { id: 'benefit', icon: <Landmark size={24} />, title: t.benefit, desc: lang === 'ar' ? 'دفع سريع وآمن عبر بينفت' : 'Fast & secure via BenefitPay', color: 'red' },
                { id: 'cash', icon: <Banknote size={24} />, title: t.cash, desc: lang === 'ar' ? 'الدفع نقداً عند باب المنزل' : 'Pay cash at your doorstep', color: 'gold' },
                { id: 'apple', icon: <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" className="w-8 h-8" alt="apple" />, title: 'Apple Pay', desc: lang === 'ar' ? 'آمن وبلمسة واحدة' : 'Secure one-tap payment', color: 'white' }
              ].map(method => (
                <button 
                  key={method.id}
                  onClick={() => setBookingData({...bookingData, paymentMethod: method.id as any})}
                  className={`w-full p-5 rounded-[32px] border-2 flex items-center gap-5 transition-all ${bookingData.paymentMethod === method.id ? `bg-stone-900 border-${method.color === 'gold' ? 'gold' : method.color === 'red' ? 'red-500' : 'white'}/50` : 'bg-stone-900/50 border-stone-800 opacity-70'}`}
                >
                  <div className={`p-4 rounded-2xl ${bookingData.paymentMethod === method.id ? 'bg-white/10' : 'bg-stone-800 text-stone-500'}`}>
                    {method.icon}
                  </div>
                  <div className={`flex-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <p className="font-black text-white">{method.title}</p>
                    <p className="text-[10px] text-stone-500 font-bold">{method.desc}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${bookingData.paymentMethod === method.id ? `border-${method.color === 'gold' ? 'gold' : method.color === 'red' ? 'red-500' : 'white'}` : 'border-stone-700'}`}>
                    {bookingData.paymentMethod === method.id && <div className={`w-3 h-3 rounded-full bg-current`} />}
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-stone-900 p-8 rounded-[40px] border border-stone-800 shadow-inner space-y-4">
               <div className="flex justify-between items-center text-stone-400 text-xs font-bold uppercase tracking-widest">
                  <span>{t.service}</span>
                  <span className="text-white font-black">{selectedService.name}</span>
               </div>
               <div className="flex justify-between items-center text-stone-400 text-xs font-bold uppercase tracking-widest">
                  <span>{t.barber}</span>
                  <span className="text-white font-black">{t.muaz}</span>
               </div>
               <div className="h-[1px] bg-stone-800/50" />
               <div className="flex justify-between items-end">
                  <span className="font-black text-2xl text-white uppercase tracking-tighter">{t.total}</span>
                  <div className="text-right">
                    <span className="text-4xl font-black text-gold leading-none">{selectedService.price.toFixed(3)}</span>
                    <span className="text-xs font-bold ml-1 text-stone-500">{currency}</span>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-stone-950/80 backdrop-blur-md border-t border-stone-900">
        <button 
          onClick={next}
          disabled={step === 'style' && !bookingData.serviceId}
          className={`w-full py-6 bg-gold text-stone-950 font-black rounded-[32px] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(234,179,8,0.3)] hover:bg-yellow-500 transition-all active:scale-95 text-lg uppercase tracking-widest ${step === 'style' && !bookingData.serviceId ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {step === 'confirm' ? t.payNow : t.next}
          {lang === 'en' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>
    </div>
  );
};

export default BookingFlow;
