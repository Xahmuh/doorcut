
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Scissors, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  DollarSign, 
  ChevronRight, 
  ChevronLeft,
  Settings,
  X,
  Check,
  TrendingUp,
  CreditCard,
  UserPlus
} from 'lucide-react';
import { SERVICES, BARBERS, TRANSACTIONS } from '../constants';
import { Language } from '../index';

interface AdminViewProps {
  onBack: () => void;
  lang: Language;
}

type AdminTab = 'dashboard' | 'bookings' | 'services' | 'team' | 'finance';

const AdminView: React.FC<AdminViewProps> = ({ onBack, lang }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isAddingService, setIsAddingService] = useState(false);
  const [isAddingBarber, setIsAddingBarber] = useState(false);

  const t = {
    title: lang === 'ar' ? 'لوحة تحكم الإدارة' : 'Admin Control Panel',
    dashboard: lang === 'ar' ? 'الرئيسية' : 'Dashboard',
    bookings: lang === 'ar' ? 'الحجوزات' : 'Bookings',
    services: lang === 'ar' ? 'الخدمات' : 'Services',
    team: lang === 'ar' ? 'الفريق' : 'Team',
    finance: lang === 'ar' ? 'المالية' : 'Finance',
    totalRevenue: lang === 'ar' ? 'إجمالي الدخل' : 'Total Revenue',
    activeBookings: lang === 'ar' ? 'حجوزات نشطة' : 'Active Bookings',
    totalBarbers: lang === 'ar' ? 'عدد الحلاقين' : 'Barbers',
    addService: lang === 'ar' ? 'إضافة خدمة' : 'Add Service',
    addBarber: lang === 'ar' ? 'إضافة حلاق' : 'Add Barber',
    price: lang === 'ar' ? 'السعر' : 'Price',
    duration: lang === 'ar' ? 'المدة' : 'Duration',
    role: lang === 'ar' ? 'الدور' : 'Role',
    status: lang === 'ar' ? 'الحالة' : 'Status',
    save: lang === 'ar' ? 'حفظ' : 'Save',
    cancel: lang === 'ar' ? 'إلغاء' : 'Cancel',
    currency: lang === 'ar' ? 'د.ب' : 'BHD'
  };

  const stats = [
    { label: t.totalRevenue, value: '1,240.500', icon: <DollarSign size={24} />, color: 'bg-green-500/10 text-green-500' },
    { label: t.activeBookings, value: '42', icon: <Calendar size={24} />, color: 'bg-blue-500/10 text-blue-500' },
    { label: t.totalBarbers, value: BARBERS.length.toString(), icon: <Users size={24} />, color: 'bg-gold/10 text-gold' },
  ];

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-stone-900 border border-stone-800 p-6 rounded-[32px] flex items-center gap-6">
            <div className={`p-4 rounded-2xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-3xl font-black text-white">{stat.value} {i === 0 && t.currency}</h4>
            </div>
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <TrendingUp size={20} className="text-gold" />
          {lang === 'ar' ? 'أداء الخدمات' : 'Service Performance'}
        </h3>
        <div className="bg-stone-900 border border-stone-800 rounded-[32px] overflow-hidden">
          {SERVICES.slice(0, 3).map((s, i) => (
            <div key={s.id} className={`p-5 flex items-center justify-between ${i !== 2 ? 'border-b border-stone-800/50' : ''}`}>
              <div className="flex items-center gap-4">
                <img src={s.image} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <p className="font-bold text-sm text-white">{s.name}</p>
                  <p className="text-[10px] text-stone-500 uppercase font-black">{s.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-gold text-sm">+{Math.floor(Math.random() * 20)}%</p>
                <p className="text-[10px] text-stone-600 font-bold uppercase">{lang === 'ar' ? 'هذا الشهر' : 'This Month'}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-black">{t.services}</h3>
        <button 
          onClick={() => setIsAddingService(true)}
          className="bg-gold text-stone-950 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-yellow-500 transition-all"
        >
          <Plus size={16} /> {t.addService}
        </button>
      </div>

      <div className="space-y-3">
        {SERVICES.map(service => (
          <div key={service.id} className="bg-stone-900 border border-stone-800 p-4 rounded-3xl flex items-center gap-4 group">
            <img src={service.image} className="w-14 h-14 rounded-xl object-cover" alt={service.name} />
            <div className="flex-1">
              <h4 className="font-bold text-white text-sm">{service.name}</h4>
              <p className="text-gold font-black text-xs">{service.price.toFixed(3)} {t.currency}</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-stone-500 hover:text-white transition-colors"><Edit3 size={18} /></button>
              <button className="p-2 text-red-500 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-black">{t.team}</h3>
        <button 
          onClick={() => setIsAddingBarber(true)}
          className="bg-gold text-stone-950 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2"
        >
          <UserPlus size={16} /> {t.addBarber}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {BARBERS.map(barber => (
          <div key={barber.id} className="bg-stone-900 border border-stone-800 p-5 rounded-[32px] flex items-center gap-4">
            <div className="relative">
              <img src={barber.image} className="w-16 h-16 rounded-2xl object-cover" alt={barber.name} />
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-stone-900 ${barber.isOnline ? 'bg-green-500' : 'bg-stone-600'}`}></span>
            </div>
            <div className="flex-1">
              <h4 className="font-black text-white">{barber.name}</h4>
              <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest">{barber.role}</p>
              <div className="flex items-center gap-1 mt-1">
                <Check size={12} className="text-gold" />
                <span className="text-[10px] text-stone-400 font-bold">{barber.rating} Rating</span>
              </div>
            </div>
            <button className="p-3 bg-stone-800 rounded-xl text-stone-500 hover:text-gold transition-colors">
              <Settings size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFinance = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-stone-900 border border-stone-800 p-8 rounded-[40px] shadow-2xl overflow-hidden relative">
         <div className="absolute top-0 right-0 p-8 opacity-5">
           <DollarSign size={120} />
         </div>
         <div className="relative z-10">
           <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest mb-2">{lang === 'ar' ? 'أرباح اليوم' : 'Earnings Today'}</p>
           <h4 className="text-4xl font-black text-gold">342.000 <span className="text-lg text-white font-bold">{t.currency}</span></h4>
         </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-black">{lang === 'ar' ? 'آخر العمليات' : 'Recent Transactions'}</h3>
        <div className="space-y-3">
          {TRANSACTIONS.map(tx => (
            <div key={tx.id} className="bg-stone-900 border border-stone-800 p-4 rounded-3xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${tx.type === 'credit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-white">{tx.title}</p>
                  <p className="text-[10px] text-stone-500 font-bold uppercase">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-black ${tx.type === 'credit' ? 'text-green-500' : 'text-white'}`}>
                  {tx.type === 'credit' ? '+' : '-'}{Math.abs(tx.amount).toFixed(3)}
                </p>
                <span className="text-[8px] font-black text-stone-600 uppercase">BenefitPay</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-stone-950 pb-24">
      {/* Modals */}
      {(isAddingService || isAddingBarber) && (
        <div className="fixed inset-0 z-[300] bg-stone-950/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="w-full max-w-sm bg-stone-900 border border-stone-800 rounded-[40px] p-8 space-y-6 animate-in zoom-in duration-300">
            <h4 className="text-xl font-black text-white">{isAddingService ? t.addService : t.addBarber}</h4>
            <div className="space-y-4">
              <input className="w-full bg-stone-800 border border-stone-700 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-gold" placeholder={lang === 'ar' ? 'الاسم' : 'Name'} />
              <input className="w-full bg-stone-800 border border-stone-700 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-gold" placeholder={isAddingService ? t.price : t.role} />
              <button className="w-full py-4 bg-gold text-stone-950 font-black rounded-2xl shadow-xl hover:bg-yellow-500 transition-all">{t.save}</button>
              <button onClick={() => { setIsAddingService(false); setIsAddingBarber(false); }} className="w-full py-2 text-stone-500 font-bold text-xs uppercase tracking-widest">{t.cancel}</button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Header */}
      <header className="p-6 flex items-center justify-between sticky top-0 bg-stone-950/80 backdrop-blur-md z-50">
        <button onClick={onBack} className="p-2 hover:bg-stone-900 rounded-full text-stone-400">
          {lang === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        <h2 className="text-sm font-black uppercase tracking-[3px] text-white">{t.title}</h2>
        <div className="w-10 h-10 bg-gold/10 text-gold rounded-xl flex items-center justify-center">
          <Settings size={20} />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'services' && renderServices()}
        {activeTab === 'team' && renderTeam()}
        {activeTab === 'finance' && renderFinance()}
      </main>

      {/* Admin Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 bg-stone-900/90 backdrop-blur-xl border border-stone-800 rounded-[32px] p-2 flex justify-between items-center shadow-2xl">
        {[
          { id: 'dashboard', icon: <LayoutDashboard size={22} />, label: t.dashboard },
          { id: 'services', icon: <Scissors size={22} />, label: t.services },
          { id: 'team', icon: <Users size={22} />, label: t.team },
          { id: 'finance', icon: <DollarSign size={22} />, label: t.finance },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as AdminTab)}
            className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${activeTab === item.id ? 'bg-gold text-stone-950 scale-110 shadow-lg' : 'text-stone-500'}`}
          >
            {item.icon}
            <span className="text-[8px] font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminView;
