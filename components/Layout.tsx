
import React from 'react';
import { Home, Search, Calendar, User, Gift } from 'lucide-react';
import { Language } from '../index';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'home' | 'bookings' | 'explore' | 'profile' | 'rewards';
  onTabChange: (tab: any) => void;
  lang: Language;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, lang }) => {
  const tabs = {
    home: lang === 'ar' ? 'الرئيسية' : 'Home',
    explore: lang === 'ar' ? 'استكشف' : 'Explore',
    bookings: lang === 'ar' ? 'حجوزاتي' : 'Bookings',
    rewards: lang === 'ar' ? 'مكافآت' : 'Rewards',
    profile: lang === 'ar' ? 'حسابي' : 'Profile',
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-stone-950 shadow-2xl overflow-hidden relative pb-20">
      <main className="flex-1 overflow-y-auto px-4 pt-6">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-stone-900/90 backdrop-blur-md border-t border-stone-800 px-6 py-3 flex justify-between items-center z-50">
        <button 
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-gold' : 'text-stone-500'}`}
        >
          <Home size={22} fill={activeTab === 'home' ? "currentColor" : "none"} />
          <span className="text-[10px] font-medium">{tabs.home}</span>
        </button>
        <button 
          onClick={() => onTabChange('explore')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'explore' ? 'text-gold' : 'text-stone-500'}`}
        >
          <Search size={22} />
          <span className="text-[10px] font-medium">{tabs.explore}</span>
        </button>
        <button 
          onClick={() => onTabChange('bookings')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'bookings' ? 'text-gold' : 'text-stone-500'}`}
        >
          <Calendar size={22} fill={activeTab === 'bookings' ? "currentColor" : "none"} />
          <span className="text-[10px] font-medium">{tabs.bookings}</span>
        </button>
        <button 
          onClick={() => onTabChange('rewards')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'rewards' ? 'text-gold' : 'text-stone-500'}`}
        >
          <Gift size={22} />
          <span className="text-[10px] font-medium">{tabs.rewards}</span>
        </button>
        <button 
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-gold' : 'text-stone-500'}`}
        >
          <User size={22} fill={activeTab === 'profile' ? "currentColor" : "none"} />
          <span className="text-[10px] font-medium">{tabs.profile}</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
