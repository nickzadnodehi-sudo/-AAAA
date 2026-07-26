import React from 'react';
import { PortalModule, UserProfile } from '../../types';
import {
  LayoutDashboard,
  BookOpen,
  FileCode2,
  FileText,
  ClipboardList,
  Coins,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface PortalSidebarProps {
  activeModule: PortalModule;
  onSelectModule: (mod: PortalModule) => void;
  currentUser: UserProfile;
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({
  activeModule,
  onSelectModule,
  currentUser,
}) => {
  const modules = [
    {
      id: 'dashboard' as PortalModule,
      label: 'پیشخوان اصلی',
      icon: LayoutDashboard,
      badge: null,
      description: 'گزارش کارهای روزانه و اعلانات',
    },
    {
      id: 'os_book' as PortalModule,
      label: 'مرجع استانداردهای OS',
      icon: BookOpen,
      badge: 'Rev 2.1',
      description: 'کتابچه آنلاین ضوابط و آیین‌نامه‌ها',
    },
    {
      id: 'file_naming' as PortalModule,
      label: 'نام‌گذاری خودکار فایل‌ها',
      icon: FileCode2,
      badge: null,
      description: 'تولید رشته کد استاندارد اسناد',
    },
    {
      id: 'letter_generator' as PortalModule,
      label: 'تولید نامه و اندیکاتور',
      icon: FileText,
      badge: 'QR',
      description: 'ثبت نامه، سربرگ رسمی و QR کد',
    },
    {
      id: 'daily_report' as PortalModule,
      label: 'گزارش روزانه کارگاه',
      icon: ClipboardList,
      badge: null,
      description: 'ثبت کارگران، ماشین‌آلات و چک‌لیست',
    },
    {
      id: 'petty_cash' as PortalModule,
      label: 'تنخواه‌گردان و مالی',
      icon: Coins,
      badge: 'حسابداری',
      description: 'ثبت هزینه‌کرد و جریان تایید مالی',
    },
  ];

  return (
    <aside className="w-full lg:w-72 bg-[#1F1F1F] text-slate-300 border-b lg:border-b-0 lg:border-l border-slate-800 p-4 shrink-0 text-right space-y-6">
      {/* Current User Role Summary */}
      <div className="bg-[#2B2B2B] p-3.5 rounded-2xl border border-slate-700 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
          <ShieldCheck className="w-4 h-4 text-[#F9C319]" />
          <span>سطح دسترسی: {currentUser.roleLabel}</span>
        </div>
        <p className="text-[11px] text-slate-400">
          خوش آمدید، {currentUser.name} ({currentUser.title})
        </p>
      </div>

      {/* Module Navigation List */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-500 px-2 block mb-2">ماژول‌ها و ابزارهای هوشمند OS</span>
        {modules.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;

          return (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`w-full text-right p-3 rounded-xl transition flex items-center justify-between cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#F9C319] to-amber-500 text-[#1F1F1F] font-black shadow-md'
                  : 'bg-[#262626] hover:bg-[#2F2F2F] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-[#1F1F1F] text-[#F9C319]' : 'bg-slate-800 text-amber-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{mod.label}</div>
                  <div
                    className={`text-[10px] truncate mt-0.5 ${
                      isActive ? 'text-[#1F1F1F]/80' : 'text-slate-400'
                    }`}
                  >
                    {mod.description}
                  </div>
                </div>
              </div>

              {mod.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 mr-1 ${
                    isActive
                      ? 'bg-[#1F1F1F] text-[#F9C319]'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {mod.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
