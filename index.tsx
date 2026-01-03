
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import BookingFlow from './components/BookingFlow';
import ProfileView from './components/ProfileView';
import BookingsView from './components/BookingsView';
import RewardsView from './components/RewardsView';
import ExploreView from './components/ExploreView';
import LandingView from './components/LandingView';
import ChatView from './components/ChatView';
import WalletView from './components/WalletView';
import NotificationsView from './components/NotificationsView';
import SignupView from './components/SignupView';
import LoginView from './components/LoginView';

export type Language = 'en' | 'ar';
type Tab = 'home' | 'bookings' | 'explore' | 'profile' | 'rewards';
type ViewState = 'landing' | 'app' | 'booking' | 'chat' | 'wallet' | 'notifications' | 'signup' | 'login';

const App = () => {
  const [lang, setLang] = useState<Language>('ar'); // Default to Arabic for Bahrain launch
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [activeTab, setActiveTab] = useState<Tab>('home');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) setViewState('app');
  }, []);

  const handleEnter = () => setViewState('signup');
  const handleLoginSuccess = () => {
    sessionStorage.setItem('hasVisited', 'true');
    setViewState('app');
  };

  const renderContent = () => {
    if (viewState === 'landing') {
      return <LandingView lang={lang} setLang={setLang} onEnter={handleEnter} onLogin={() => setViewState('login')} />;
    }

    if (viewState === 'signup') {
      return <SignupView lang={lang} onBack={() => setViewState('landing')} onSuccess={handleLoginSuccess} onLogin={() => setViewState('login')} />;
    }

    if (viewState === 'login') {
      return <LoginView lang={lang} onBack={() => setViewState('landing')} onSuccess={handleLoginSuccess} onSignup={() => setViewState('signup')} />;
    }

    if (viewState === 'booking') {
      return (
        <BookingFlow 
          lang={lang}
          onComplete={() => {
            setViewState('app');
            setActiveTab('bookings');
          }} 
          onBack={() => setViewState('app')} 
        />
      );
    }

    if (viewState === 'chat') return <ChatView lang={lang} onBack={() => setViewState('app')} />;
    if (viewState === 'wallet') return <WalletView lang={lang} onBack={() => setViewState('app')} />;
    if (viewState === 'notifications') return <NotificationsView lang={lang} onBack={() => setViewState('app')} />;

    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            lang={lang}
            setLang={setLang}
            onBookNow={() => setViewState('booking')} 
            onChat={() => setViewState('chat')}
            onNotifications={() => setViewState('notifications')}
          />
        );
      case 'bookings':
        return <BookingsView lang={lang} onChat={() => setViewState('chat')} />;
      case 'explore':
        return <ExploreView lang={lang} onBookNow={() => setViewState('booking')} />;
      case 'rewards':
        return <RewardsView lang={lang} />;
      case 'profile':
        return (
          <ProfileView 
            lang={lang}
            onWallet={() => setViewState('wallet')}
            onChat={() => setViewState('chat')}
          />
        );
      default:
        return <HomeView lang={lang} setLang={setLang} onBookNow={() => setViewState('booking')} onChat={() => setViewState('chat')} onNotifications={() => setViewState('notifications')} />;
    }
  };

  if (viewState === 'landing') return <LandingView lang={lang} setLang={setLang} onEnter={handleEnter} onLogin={() => setViewState('login')} />;

  return (
    <Layout 
      lang={lang}
      activeTab={activeTab} 
      onTabChange={(tab) => {
        setViewState('app');
        setActiveTab(tab);
      }}
    >
      {renderContent()}
    </Layout>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
