import React, { useState } from 'react';
import { PublicTab, UserProfile } from '../types';
import {
  Building2,
  ShieldCheck,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  FileCheck2,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  currentTab: PublicTab;
  onSelectPublicTab: (tab: PublicTab) => void;
  currentUser: UserProfile | null;
  isPortalActive: boolean;
  onOpenLoginModal: () => void;
  onEnterPortal: () => void;
  onExitPortal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectPublicTab,
  currentUser,
  isPortalActive,
  onOpenLoginModal,
  onEnterPortal,
  onExitPortal,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { id: PublicTab; label: string }[] = [
    { id: 'home', label: 'صفحه اصلی' },
    { id: 'about', label: 'درباره ما' },
    { id: 'services', label: 'خدمات' },
    { id: 'portfolio', label: 'پروژه‌ها' },
    { id: 'os_standards', label: 'نظام کیفیت OS' },
    { id: 'blog', label: 'اخبار و مقالات' },
    { id: 'contact', label: 'تماس با ما' },
    { id: 'verify', label: 'استعلام اسناد' },
  ];

  return (
    <header className="bg-[#0a0a0a] text-white sticky top-0 z-50 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => {
                if (isPortalActive) onExitPortal();
                onSelectPublicTab('home');
              }}
              className="flex items-center group cursor-pointer focus:outline-none py-1"
            >
              <img src="/logo.png" alt="آریا کاوش پی هامون" className="h-11 md:h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
            </button>
          </div>

          {/* Desktop Public Navigation Links */}
          {!isPortalActive && (
            <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectPublicTab(item.id)}
                    className={`relative px-4 py-2 text-sm font-bold transition-colors duration-300 cursor-pointer overflow-hidden group ${
                      isActive
                        ? 'text-akph-yellow'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-akph-yellow transform origin-left"></span>
                    )}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Action Buttons: Login / Portal Entrance / Account Menu */}
          <div className="flex items-center gap-2.5">
            {/* Quick Public Verification Badge Link */}
            {!isPortalActive && (
              <button
                onClick={() => onSelectPublicTab('verify')}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs bg-black hover:bg-white/10 border border-gray-600 text-akph-yellow font-medium transition cursor-pointer"
                title="اعتبارسنجی QR کد نامه‌ها و اسناد"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>استعلام QR</span>
              </button>
            )}

            {/* Portal Toggle or Login Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-none bg-white/5 hover:bg-white/10 border border-white/20 text-white text-sm font-bold cursor-pointer transition-colors duration-300"
                >
                  <div className="w-7 h-7 rounded-none bg-akph-yellow text-[#0a0a0a] font-black flex items-center justify-center text-xs shadow-inner">
                    {currentUser.name.slice(0, 1)}
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-white leading-none">{currentUser.name}</div>
                    <div className="text-[10px] text-akph-yellow mt-1.5 leading-none font-medium">{currentUser.roleLabel}</div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute left-0 mt-3 w-64 rounded-none bg-[#0a0a0a] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2 z-50 text-right">
                    <div className="px-4 py-3 border-b border-white/10 mb-2">
                      <p className="text-sm font-black text-white">{currentUser.name}</p>
                      <p className="text-xs text-akph-yellow mt-1 font-medium">{currentUser.title}</p>
                    </div>

                    {!isPortalActive ? (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onEnterPortal();
                        }}
                        className="w-full text-right px-4 py-3 text-sm text-[#0a0a0a] bg-akph-yellow hover:bg-white font-black flex items-center justify-between transition-colors duration-300 cursor-pointer"
                      >
                        <span className="flex items-center gap-3">
                          <LayoutDashboard className="w-5 h-5 text-[#0a0a0a]" />
                          ورود به پورتال اعضا
                        </span>
                        <Sparkles className="w-4 h-4 text-[#0a0a0a]" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onExitPortal();
                        }}
                        className="w-full text-right px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors duration-300 cursor-pointer"
                      >
                        <Building2 className="w-5 h-5 text-akph-yellow" />
                        بازگشت به سایت عمومی
                      </button>
                    )}

                    <div className="border-t border-white/10 mt-2 pt-2">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-right px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 flex items-center gap-3 transition-colors duration-300 cursor-pointer"
                      >
                        <LogOut className="w-5 h-5" />
                        خروج از حساب کاربری
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="flex items-center gap-2 px-5 py-2.5 rounded-none bg-akph-yellow hover:bg-white text-[#0a0a0a] font-black text-sm shadow-[0_4px_15px_rgba(254,203,0,0.3)] transition-all duration-300 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                <span className="tracking-wide">ورود اعضا / پورتال</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            {!isPortalActive && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-none bg-black border border-gray-600 text-gray-300 hover:text-white cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && !isPortalActive && (
        <div className="lg:hidden bg-akph-dark border-b-4 border-akph-yellow px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectPublicTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right px-3 py-2.5 rounded-none text-xs font-bold transition ${
                  isActive
                    ? 'bg-akph-yellow text-akph-dark'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
