import React from 'react';
import { UserProfile, PortalModule } from '../../types';
import { LayoutDashboard, LogOut, Building2, Bell, Shield, Sparkles, FolderKanban } from 'lucide-react';

interface PortalHeaderProps {
  currentUser: UserProfile;
  activeModule: PortalModule;
  onSelectModule: (mod: PortalModule) => void;
  onExitPortal: () => void;
  onLogout: () => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  currentUser,
  activeModule,
  onSelectModule,
  onExitPortal,
  onLogout,
}) => {
  return (
    <div className="bg-akph-dark text-white border-b-2 border-akph-yellow sticky top-0 z-40 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left / Brand Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-none bg-white flex items-center justify-center shrink-0 shadow-md border border-akph-yellow overflow-hidden">
            <img src="/logo.png" alt="AKPH Logo" className="w-full h-full object-contain p-0.5" />
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white">اتوماسیون پورتال اعضا</span>
              <span className="px-2 py-0.5 rounded-none bg-akph-yellow/20 text-akph-yellow border border-akph-yellow/30 text-[10px] font-bold">
                پورتال داخلی
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden sm:block">شرکت آریا کاوش پی هامون</p>
          </div>
        </div>

        {/* Center: Active Project Selector Indicator */}
        <div className="hidden md:flex items-center gap-2 bg-black px-3 py-1.5 rounded-none border border-gray-700 text-xs text-gray-300">
          <FolderKanban className="w-4 h-4 text-akph-yellow" />
          <span>پروژه‌های تحت مدیریت:</span>
          <span className="font-bold text-akph-yellow">
            {currentUser.projectAccess.includes('ALL') ? 'تمام پروژه‌ها (۶۵۳ و ۱۸۴)' : `پروژه‌های کد ${currentUser.projectAccess.join('، ')}`}
          </span>
        </div>

        {/* Right Actions & Profile */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-black px-3 py-1.5 rounded-none border border-akph-yellow">
            <div className="w-7 h-7 rounded-none bg-akph-yellow text-akph-dark font-extrabold flex items-center justify-center text-xs">
              {currentUser.name.slice(0, 1)}
            </div>
            <div className="text-right text-xs">
              <div className="font-bold text-white leading-tight">{currentUser.name}</div>
              <div className="text-[10px] text-akph-yellow leading-tight">{currentUser.roleLabel}</div>
            </div>
          </div>

          <button
            onClick={onExitPortal}
            className="px-3 py-1.5 rounded-none bg-black hover:bg-white/10 border border-gray-600 text-xs font-bold text-gray-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
            title="بازگشت به سایت عمومی"
          >
            <Building2 className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">سایت عمومی</span>
          </button>

          <button
            onClick={onLogout}
            className="p-2 rounded-none bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition cursor-pointer"
            title="خروج از سیستم"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
