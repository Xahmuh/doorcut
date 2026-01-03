
import React, { useState } from 'react';
import { User, MapPin, Scissors, CreditCard, Bell, Globe, Moon, LogOut, ShieldCheck, ChevronRight, Edit2, Wallet, Star, Crown, MessageSquare, ChevronLeft, LayoutDashboard, Plus, Trash2, Home, Briefcase, Info, Sun, Check } from 'lucide-react';
import { MOCK_USER, POINTS_HISTORY, SAVED_LOCATIONS, PLANS } from '../constants';
import SubscriptionView from './SubscriptionView';
import { Language } from '../index';

interface ProfileViewProps {
  onWallet: () => void;
  onChat: () => void;
  onAdmin: () => void;
  onLogout: () => void;
  lang: Language;
  activePlanId: string;
  onUpdatePlan: (id: string) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onWallet, onChat, onAdmin, onLogout, lang, activePlanId, onUpdatePlan }) => {
  const [activeSubView, setActiveSubView] = useState<'main' | 'subscription' | 'points' | 'locations' | 'personal' | 'preferences'>('main');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const currentPlan = PLANS.find(p => p.id === activePlanId) || PLANS[0];

  const t = {
    profile: lang === 'ar' ? 'الملف الشخصي' : 'Profile',
    member: lang === 'ar' ? 'عضو' : 'Member',
    balance: lang === 'ar' ? 'الرصيد' : 'Balance',
    points: lang === 'ar' ? 'النقاط' : 'Points',
    signOut: lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out of Account',
    enterprise: lang === 'ar' ? 'ديوركوت إنتربرايز' : 'Doorcut Enterprise',
    adminPortal: lang === 'ar' ? 'بوابة الإدارة' : 'Admin Portal',
    pointsHistory: lang === 'ar' ? 'سجل النقاط' : 'Points History',
    locations: lang === 'ar' ? 'مواقع الخدمة' : 'Service Locations',
    addNew: lang === 'ar' ? 'إضافة جديد' : 'Add New',
    pts: lang === 'ar' ? 'نقطة' : 'pts',
    totalPts: lang === 'ar' ? 'إجمالي النقاط' : 'Total Points',
    preferences: lang === 'ar' ? 'التفضيلات' : 'Preferences',
    groups: {
      account: lang === 'ar' ? 'حساب المؤسسة' : 'Enterprise Account',
      security: lang === 'ar' ? 'الأمن والخصوصية' : 'Security & Privacy',
      preferences: lang === 'ar' ? 'التفضيلات' : 'Preferences',
    },
    items: {
      personal: lang === 'ar' ? 'المعلومات الشخصية' : 'Personal Information',
      subscription: lang === 'ar' ? 'خطة الاشتراك' : 'Subscription Plan',
      wallet: lang === 'ar' ? 'محفظة ديوركوت' : 'Doorcut Wallet',
      support: lang === 'ar' ? 'دردشة الدعم' : 'Support Chat',
      locations: lang === 'ar' ? 'مواقع الخدمة' : 'Service Locations',
      saved: lang === 'ar' ? 'محفوظ' : 'Saved',
      auth: lang === 'ar' ? 'المصادقة الثنائية' : 'Two-Factor Auth',
      on: lang === 'ar' ? 'مفعل' : 'On',
      notifications: lang === 'ar' ? 'التنبيهات' : 'Notifications',
      enabled: lang === 'ar' ? 'مفعلة' : 'Enabled',
      disabled: lang === 'ar' ? 'معطلة' : 'Disabled',
      darkMode: lang === 'ar' ? 'الوضع الليلي' : 'Dark Mode',
      always: lang === 'ar' ? 'دائماً' : 'Always',
      language: lang === 'ar' ? 'اللغة' : 'Language',
      currentLang: lang === 'ar' ? 'العربية' : 'English',
    }
  };

  const settingsGroups = [
    {
      title: t.groups.account,
      items: [
        { icon: <User size={18} />, label: t.items.personal, value: '', onClick: () => setActiveSubView('personal') },
        { 
          icon: <Crown size={18} className="text-gold" />, 
          label: t.items.subscription, 
          value: currentPlan.name,
          onClick: () => setActiveSubView('subscription')
        },
        { icon: <Wallet size={18} />, label: t.items.wallet, value: `${MOCK_USER.walletBalance.toFixed(0)} ${lang === 'ar' ? 'د.ب' : 'BHD'}`, onClick: onWallet },
        { icon: <MessageSquare size={18} />, label: t.items.support, value: '', onClick: onChat },
      ]
    },
    {
      title: t.groups.security,
      items: [
        { icon: <MapPin size={18} />, label: t.items.locations, value: `${SAVED_LOCATIONS.length} ${t.items.saved}`, onClick: () => setActiveSubView('locations') },
        { icon: <ShieldCheck size={18} />, label: t.items.auth, value: t.items.on, onClick: () => alert(lang === 'ar' ? 'تم تفعيل المصادقة الثنائية' : '2FA is active') },
      ]
    },
    {
      title: t.groups.preferences,
      items: [
        { icon: <Bell size={18} />, label: t.items.notifications, value: notificationsEnabled ? t.items.enabled : t.items.disabled, onClick: () => setActiveSubView('preferences') },
        { icon: isDarkMode ? <Moon size={18} /> : <Sun size={18} />, label: t.items.darkMode, value: isDarkMode ? t.items.always : t.items.disabled, onClick: () => setActiveSubView('preferences') },
        { icon: <Globe size={18} />, label: t.items.language, value: t.items.currentLang, onClick: () => setActiveSubView('preferences') },
      ]
    }
  ];

  // --- Sub-Views Components ---

  const PointsView = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <div className="flex items-center gap-4">
        <button onClick={() => setActiveSubView('main')} className="p-2 hover:bg-stone-800 rounded-full text-stone-400">
          {lang === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        <h2 className="text-xl font-black">{t.pointsHistory}</h2>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-[40px] p-8 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Star size={100} className="text-gold" />
        </div>
        <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest mb-1">{t.totalPts}</p>
        <h3 className="text-6xl font-black text-white">{MOCK_USER.points}</h3>
        <p className="text-gold font-bold text-xs mt-2">{lang === 'ar' ? 'أنت في فئة النخبة' : 'You are in Elite tier'}</p>
      </div>

      <div className="space-y-4">
        {POINTS_HISTORY.map(ph => (
          <div key={ph.id} className="bg-stone-900/50 border border-stone-800 p-6 rounded-[32px] flex items-center justify-between group hover:border-gold/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-stone-800 rounded-2xl flex items-center justify-center text-gold shadow-inner">
                <Star size={24} fill={ph.type === 'earn' ? 'currentColor' : 'none'} />
              </div>
              <div>
                <p className="font-black text-white">{lang === 'ar' && ph.title === 'Welcome Bonus' ? 'مكافأة ترحيبية' : ph.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">{ph.date}</p>
                  <span className="w-1 h-1 bg-stone-700 rounded-full" />
                  <p className="text-[10px] text-stone-600 font-black uppercase tracking-tight">{ph.type === 'earn' ? (lang === 'ar' ? 'مكتسبة' : 'Earned') : (lang === 'ar' ? 'مستهلكة' : 'Spent')}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-xl font-black ${ph.type === 'earn' ? 'text-gold' : 'text-stone-500'}`}>
                {ph.type === 'earn' ? '+' : '-'}{ph.amount}
              </p>
              <p className="text-[8px] font-black text-stone-700 uppercase tracking-widest">{t.pts}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const LocationsView = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveSubView('main')} className="p-2 hover:bg-stone-800 rounded-full text-stone-400">
            {lang === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
          <h2 className="text-xl font-black">{t.locations}</h2>
        </div>
        <button className="bg-gold text-stone-950 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg active:scale-95 transition-transform">
          <Plus size={14} /> {t.addNew}
        </button>
      </div>

      <div className="space-y-4">
        {SAVED_LOCATIONS.map(loc => (
          <div key={loc.id} className="bg-stone-900 border border-stone-800 p-6 rounded-[32px] flex items-center gap-5 group hover:border-gold/30 transition-all shadow-xl">
            <div className="w-14 h-14 bg-stone-800 rounded-2xl flex items-center justify-center text-gold shadow-inner">
              {loc.type === 'home' ? <Home size={24} /> : <Briefcase size={24} />}
            </div>
            <div className="flex-1">
              <h4 className="font-black text-white">{lang === 'ar' && loc.name === 'Home' ? 'المنزل' : lang === 'ar' && loc.name === 'Office' ? 'العمل' : loc.name}</h4>
              <p className="text-stone-500 text-[10px] font-medium leading-relaxed mt-1">{loc.address}</p>
            </div>
            <button className="p-3 text-stone-600 hover:text-red-500 transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="p-8 bg-stone-900/30 border border-dashed border-stone-800 rounded-[40px] text-center space-y-3">
        <div className="p-4 bg-stone-800/50 rounded-full w-fit mx-auto text-stone-600">
          <Info size={24} />
        </div>
        <p className="text-stone-500 text-xs font-bold leading-relaxed">
          {lang === 'ar' ? 'تساعدنا المواقع المحفوظة في الوصول إليك بشكل أسرع وتقديم أفضل تجربة حلاقة متنقلة.' : 'Saved locations help us reach you faster and provide the best mobile grooming experience.'}
        </p>
      </div>
    </div>
  );

  const PreferencesView = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <div className="flex items-center gap-4">
        <button onClick={() => setActiveSubView('main')} className="p-2 hover:bg-stone-800 rounded-full text-stone-400">
          {lang === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        <h2 className="text-xl font-black">{t.preferences}</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-stone-900 border border-stone-800 rounded-[32px] overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-stone-800/50 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center text-stone-400">
                   <Bell size={20} />
                </div>
                <div>
                   <h4 className="font-black text-white text-sm">{t.items.notifications}</h4>
                   <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">{notificationsEnabled ? t.items.enabled : t.items.disabled}</p>
                </div>
             </div>
             <button 
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${notificationsEnabled ? 'bg-gold' : 'bg-stone-800'}`}
             >
                <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${notificationsEnabled ? (lang === 'ar' ? '-translate-x-0' : 'translate-x-6') : (lang === 'ar' ? '-translate-x-6' : 'translate-x-0')}`} />
             </button>
          </div>

          <div className="p-6 border-b border-stone-800/50 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center text-stone-400">
                   {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div>
                   <h4 className="font-black text-white text-sm">{t.items.darkMode}</h4>
                   <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">{isDarkMode ? t.items.always : t.items.disabled}</p>
                </div>
             </div>
             <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${isDarkMode ? 'bg-gold' : 'bg-stone-800'}`}
             >
                <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${isDarkMode ? (lang === 'ar' ? '-translate-x-0' : 'translate-x-6') : (lang === 'ar' ? '-translate-x-6' : 'translate-x-0')}`} />
             </button>
          </div>

          <div className="p-6 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center text-stone-400">
                   <Globe size={20} />
                </div>
                <div>
                   <h4 className="font-black text-white text-sm">{t.items.language}</h4>
                   <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">{t.items.currentLang}</p>
                </div>
             </div>
             <div className="flex gap-2">
                <button className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${lang === 'en' ? 'bg-gold border-gold text-stone-950' : 'bg-stone-800 border-stone-700 text-stone-500'}`}>EN</button>
                <button className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${lang === 'ar' ? 'bg-gold border-gold text-stone-950' : 'bg-stone-800 border-stone-700 text-stone-500'}`}>AR</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PersonalInfoView = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
       <div className="flex items-center gap-4">
        <button onClick={() => setActiveSubView('main')} className="p-2 hover:bg-stone-800 rounded-full text-stone-400">
          {lang === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        <h2 className="text-xl font-black">{t.items.personal}</h2>
      </div>
      <div className="bg-stone-900 border border-stone-800 rounded-[40px] p-8 space-y-6 shadow-2xl">
        {[
          { label: lang === 'ar' ? 'الاسم' : 'Name', value: MOCK_USER.name },
          { label: lang === 'ar' ? 'البريد' : 'Email', value: 'ahmed@doorcut.com' },
          { label: lang === 'ar' ? 'الهاتف' : 'Phone', value: '+973 3344 5566' },
        ].map((field, i) => (
          <div key={i} className="space-y-2">
            <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest">{field.label}</p>
            <div className="p-5 bg-stone-800/30 rounded-2xl border border-stone-800 text-white font-bold text-sm flex items-center justify-between">
              {field.value}
              <Edit2 size={14} className="text-stone-600" />
            </div>
          </div>
        ))}
        <button className="w-full py-5 bg-gold text-stone-950 font-black rounded-3xl shadow-[0_20px_40px_rgba(234,179,8,0.2)] active:scale-95 transition-all text-lg uppercase tracking-widest mt-4">
          {lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
        </button>
      </div>
    </div>
  );

  // --- Main Render Logic ---

  if (activeSubView === 'subscription') {
    return (
      <SubscriptionView 
        lang={lang} 
        currentPlanId={activePlanId} 
        onUpdatePlan={onUpdatePlan} 
        onBack={() => setActiveSubView('main')} 
      />
    );
  }

  if (activeSubView === 'points') {
    return <PointsView />;
  }

  if (activeSubView === 'locations') {
    return <LocationsView />;
  }

  if (activeSubView === 'personal') {
    return <PersonalInfoView />;
  }

  if (activeSubView === 'preferences') {
    return <PreferencesView />;
  }

  return (
    <div className="space-y-8 pb-24 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="w-10"></div>
        <h2 className="text-lg font-black uppercase tracking-widest text-white">{t.profile}</h2>
        <button onClick={() => setActiveSubView('personal')} className="p-2 hover:bg-stone-800 rounded-full text-stone-500">
          <Edit2 size={20} />
        </button>
      </div>

      {/* Admin Quick Access */}
      <button 
        onClick={onAdmin}
        className="w-full p-6 bg-gold text-stone-950 rounded-[32px] flex items-center justify-between shadow-2xl hover:scale-[1.02] transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-stone-950/20 rounded-2xl group-hover:bg-stone-950/40 transition-colors">
            <LayoutDashboard size={24} />
          </div>
          <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <h4 className="font-black text-sm uppercase tracking-widest">{t.adminPortal}</h4>
            <p className="text-[10px] font-bold opacity-70">{lang === 'ar' ? 'إدارة المواعيد والخدمات' : 'Manage Bookings & Services'}</p>
          </div>
        </div>
        {lang === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* User Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gold blur-2xl opacity-10 rounded-full" />
          <img src={MOCK_USER.avatar} className="relative w-28 h-28 rounded-[40px] border-4 border-stone-900 shadow-2xl object-cover group-hover:scale-105 transition-transform" alt="profile" />
          <div className={`absolute -bottom-2 ${lang === 'ar' ? '-left-2' : '-right-2'} bg-gold text-stone-950 p-2 rounded-2xl border-[3px] border-stone-950 shadow-xl z-10`}>
            <ShieldCheck size={18} />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-black text-white">{MOCK_USER.name}</h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span 
              onClick={() => setActiveSubView('subscription')}
              className="bg-gold/10 text-gold text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-gold/20 cursor-pointer hover:bg-gold/20 transition-all flex items-center gap-2"
            >
              <Crown size={12} /> {currentPlan.name} {t.member}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div 
          onClick={onWallet}
          className="bg-stone-900 border border-stone-800 p-6 rounded-[32px] group cursor-pointer hover:border-gold/30 transition-all shadow-xl active:scale-95"
        >
          <div className="w-10 h-10 bg-stone-800 rounded-2xl flex items-center justify-center text-gold mb-3 group-hover:scale-110 transition-transform">
            <Wallet size={20} />
          </div>
          <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest mb-1">{t.balance}</p>
          <p className="text-xl font-black text-white">{MOCK_USER.walletBalance.toFixed(0)} {lang === 'ar' ? 'د.ب' : 'BHD'}</p>
        </div>
        <div 
          onClick={() => setActiveSubView('points')}
          className="bg-stone-900 border border-stone-800 p-6 rounded-[32px] group cursor-pointer hover:border-stone-700 transition-all shadow-xl active:scale-95"
        >
          <div className="w-10 h-10 bg-stone-800 rounded-2xl flex items-center justify-center text-gold mb-3 group-hover:scale-110 transition-transform">
            <Star size={20} className="fill-gold" />
          </div>
          <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest mb-1">{t.points}</p>
          <p className="text-xl font-black text-white">{MOCK_USER.points}</p>
        </div>
      </div>

      {/* Settings Sections */}
      {settingsGroups.map((group, gIdx) => (
        <div key={gIdx} className="space-y-4">
          <h3 className={`text-stone-600 text-[10px] font-black uppercase tracking-[3px] ${lang === 'ar' ? 'mr-2' : 'ml-2'}`}>{group.title}</h3>
          <div className="bg-stone-900 border border-stone-800 rounded-[32px] overflow-hidden shadow-2xl">
            {group.items.map((item: any, iIdx) => (
              <button 
                key={iIdx} 
                onClick={item.onClick}
                className={`w-full flex items-center gap-5 p-5 hover:bg-stone-800/50 transition-all active:bg-stone-800 group ${iIdx !== group.items.length - 1 ? 'border-b border-stone-800/50' : ''}`}
              >
                <div className="w-10 h-10 bg-stone-950 rounded-xl flex items-center justify-center text-stone-500 group-hover:text-gold transition-colors">
                  {item.icon}
                </div>
                <span className={`flex-1 ${lang === 'ar' ? 'text-right' : 'text-left'} font-bold text-sm text-stone-200`}>{item.label}</span>
                {item.value && <span className={`text-xs text-stone-500 font-black uppercase tracking-widest ${lang === 'ar' ? 'ml-1' : 'mr-1'}`}>{item.value}</span>}
                {lang === 'ar' ? <ChevronLeft size={18} className="text-stone-700 group-hover:text-gold transition-colors" /> : <ChevronRight size={18} className="text-stone-700 group-hover:text-gold transition-colors" />}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="pt-4">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 p-6 bg-red-500/5 border border-red-500/20 text-red-500 font-black rounded-[32px] hover:bg-red-500/10 transition-all active:scale-95 uppercase tracking-widest text-sm shadow-lg"
        >
          <LogOut size={20} />
          {t.signOut}
        </button>
      </div>

      <div className="text-center text-stone-600 text-[10px] font-black uppercase tracking-[4px] py-6">
        {t.enterprise} • v2.4.0
      </div>
    </div>
  );
};

export default ProfileView;
