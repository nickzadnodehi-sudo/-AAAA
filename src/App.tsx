import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  PublicTab,
  PortalModule,
  PettyCashExpense,
  DailySiteReport,
} from './types';
import { DEMO_USERS, INITIAL_PETTY_CASH, INITIAL_DAILY_REPORTS } from './data/corporateData';

// Public Components
import { Navbar } from './components/Navbar';
import { PublicFooter } from './components/PublicFooter';
import { HomePage } from './components/public/HomePage';
import { AboutPage } from './components/public/AboutPage';
import { ServicesPage } from './components/public/ServicesPage';
import { PortfolioPage } from './components/public/PortfolioPage';
import { OSOverviewPage } from './components/public/OSOverviewPage';
import { BlogPage } from './components/public/BlogPage';
import { ContactPage } from './components/public/ContactPage';
import { PublicVerificationPage } from './components/public/PublicVerificationPage';

// Portal Intranet Components
import { LoginModal } from './components/portal/LoginModal';
import { PortalHeader } from './components/portal/PortalHeader';
import { PortalSidebar } from './components/portal/PortalSidebar';
import { PortalDashboard } from './components/portal/PortalDashboard';
import { OSBookModule } from './components/portal/OSBookModule';
import { FileNamingModule } from './components/portal/FileNamingModule';
import { LetterModuleContainer } from './components/portal/LetterModuleContainer';
import { DailyReportModule } from './components/portal/DailyReportModule';
import { PettyCashModule } from './components/portal/PettyCashModule';

export default function App() {
  // Navigation & User State
  const [currentPublicTab, setCurrentPublicTab] = useState<PublicTab>('home');
  const [activePortalModule, setActivePortalModule] = useState<PortalModule>('dashboard');
  const [isPortalActive, setIsPortalActive] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Authenticated User State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('akph_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEMO_USERS[0]; // Default logged in as Executive Admin for demo
  });

  // Shared Data States
  const [pettyCashList, setPettyCashList] = useState<PettyCashExpense[]>(() => {
    const saved = localStorage.getItem('akph_petty_cash');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_PETTY_CASH;
  });

  const [dailyReportsList, setDailyReportsList] = useState<DailySiteReport[]>(() => {
    const saved = localStorage.getItem('akph_daily_reports');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_DAILY_REPORTS;
  });

  // Save states to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('akph_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('akph_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('akph_petty_cash', JSON.stringify(pettyCashList));
  }, [pettyCashList]);

  useEffect(() => {
    localStorage.setItem('akph_daily_reports', JSON.stringify(dailyReportsList));
  }, [dailyReportsList]);

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setIsPortalActive(true);
    setActivePortalModule('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsPortalActive(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex flex-col font-sans dir-rtl overflow-x-hidden w-full text-right">
      {/* Top Main Navigation Bar */}
      <Navbar
        currentTab={currentPublicTab}
        onSelectPublicTab={(tab) => {
          setIsPortalActive(false);
          setCurrentPublicTab(tab);
        }}
        currentUser={currentUser}
        isPortalActive={isPortalActive}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onEnterPortal={() => setIsPortalActive(true)}
        onExitPortal={() => setIsPortalActive(false)}
        onLogout={handleLogout}
      />

      {/* Login Authentication Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Main View Area */}
      {!isPortalActive ? (
        /* PUBLIC CORPORATE FRONT-END SITE */
        <main className="flex-1 w-full">
          {currentPublicTab === 'home' && (
            <HomePage
              onSelectPublicTab={setCurrentPublicTab}
              onOpenLoginModal={() => setIsLoginModalOpen(true)}
            />
          )}

          {currentPublicTab === 'about' && <AboutPage />}

          {currentPublicTab === 'services' && <ServicesPage />}

          {currentPublicTab === 'portfolio' && <PortfolioPage />}

          {currentPublicTab === 'os_standards' && <OSOverviewPage />}

          {currentPublicTab === 'blog' && <BlogPage />}

          {currentPublicTab === 'contact' && <ContactPage />}

          {currentPublicTab === 'verify' && <PublicVerificationPage />}

          <PublicFooter
            onSelectPublicTab={setCurrentPublicTab}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
          />
        </main>
      ) : (
        /* MEMBER INTRANET PORTAL WORKSPACE */
        <div className="flex-1 flex flex-col bg-[#F5F6F8]">
          <PortalHeader
            currentUser={currentUser!}
            activeModule={activePortalModule}
            onSelectModule={setActivePortalModule}
            onExitPortal={() => setIsPortalActive(false)}
            onLogout={handleLogout}
          />

          <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <PortalSidebar
              activeModule={activePortalModule}
              onSelectModule={setActivePortalModule}
              currentUser={currentUser!}
            />

            {/* Main Active Module Display */}
            <main className="flex-1 min-w-0">
              {activePortalModule === 'dashboard' && (
                <PortalDashboard
                  currentUser={currentUser!}
                  onSelectModule={setActivePortalModule}
                  pettyCashList={pettyCashList}
                  dailyReportsList={dailyReportsList}
                />
              )}

              {activePortalModule === 'os_book' && <OSBookModule />}

              {activePortalModule === 'file_naming' && <FileNamingModule />}

              {activePortalModule === 'letter_generator' && <LetterModuleContainer />}

              {activePortalModule === 'daily_report' && <DailyReportModule />}

              {activePortalModule === 'petty_cash' && (
                <PettyCashModule
                  currentUser={currentUser!}
                  pettyCashList={pettyCashList}
                  onUpdateList={setPettyCashList}
                />
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
