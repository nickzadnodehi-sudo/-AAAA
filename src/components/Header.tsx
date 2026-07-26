import React from 'react';
import {
  Download,
  Printer,
  PlusCircle,
  FolderOpen,
  Edit3,
  Eye,
  Save,
} from 'lucide-react';

interface HeaderProps {
  onDownloadPDF: () => void;
  onPrint: () => void;
  onNewLetter: () => void;
  onSaveDraft: () => void;
  onOpenDrafts: () => void;
  draftsCount: number;
  activeTab: 'edit' | 'preview' | 'settings';
  setActiveTab: (tab: 'edit' | 'preview' | 'settings') => void;
  isGeneratingPDF?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onDownloadPDF,
  onPrint,
  onNewLetter,
  onSaveDraft,
  onOpenDrafts,
  draftsCount,
  activeTab,
  setActiveTab,
  isGeneratingPDF = false,
}) => {
  return (
    <header className="bg-[#1F1F1F] text-white sticky top-0 z-40 shadow-md border-b border-[#2B2B2B] w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 lg:py-0 lg:h-16 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 lg:gap-4">
        {/* Top Bar on Mobile & Tablet / Right side on Desktop */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          {/* Logo & Title (Right in RTL) */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F9C319] flex items-center justify-center text-[#1F1F1F] font-black text-sm sm:text-base tracking-tighter shadow-md shrink-0">
              AKPH
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-xs sm:text-base text-[#F9C319] leading-tight truncate">
                سامانه صدور نامه سربرگ‌دار
              </h1>
              <p className="text-[10px] sm:text-[11px] text-[#6F6F6F] truncate hidden xs:block">
                شرکت آریا کاوش پی هامون
              </p>
            </div>
          </div>

          {/* Mobile & Tablet Quick Action Icons (Left in RTL on top row) */}
          <div className="flex lg:hidden items-center gap-1.5 shrink-0">
            <button
              onClick={onOpenDrafts}
              className="p-2 bg-[#2B2B2B] text-white rounded-lg border border-[#6F6F6F]/40 relative text-xs cursor-pointer"
              title="پیش‌نویس‌ها"
            >
              <FolderOpen className="w-4 h-4 text-[#F9C319]" />
              {draftsCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-[#F9C319] text-[#1F1F1F] font-extrabold text-[9px] rounded-full">
                  {draftsCount}
                </span>
              )}
            </button>
            <button
              onClick={onDownloadPDF}
              disabled={isGeneratingPDF}
              className="px-2.5 py-1.5 bg-[#F9C319] text-[#1F1F1F] font-bold text-xs rounded-lg shadow-xs flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Sub-Bar: Switcher Tabs + Actions */}
        <div className="flex lg:hidden items-center justify-between gap-2 w-full pt-1 border-t border-[#2B2B2B]">
          {/* Edit / Preview Tabs */}
          <div className="flex bg-[#2B2B2B] p-0.5 rounded-lg border border-[#6F6F6F]/30 flex-1">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'edit'
                  ? 'bg-[#F9C319] text-[#1F1F1F] shadow-xs'
                  : 'text-[#D9D9D9] hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              ویرایش نامه
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-[#F9C319] text-[#1F1F1F] shadow-xs'
                  : 'text-[#D9D9D9] hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              پیش‌نمایش سربرگ
            </button>
          </div>

          {/* Additional quick buttons on mobile/tablet bar */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={onSaveDraft}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-[#2B2B2B] hover:bg-[#2B2B2B]/80 text-white rounded-lg border border-[#6F6F6F]/40 text-xs flex items-center gap-1 cursor-pointer"
              title="ذخیره"
            >
              <Save className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] hidden sm:inline">ذخیره</span>
            </button>
            <button
              onClick={onNewLetter}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-[#2B2B2B] hover:bg-[#2B2B2B]/80 text-white rounded-lg border border-[#6F6F6F]/40 text-xs flex items-center gap-1 cursor-pointer"
              title="جدید"
            >
              <PlusCircle className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[11px] hidden sm:inline">جدید</span>
            </button>
            <button
              onClick={onPrint}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-[#2B2B2B] hover:bg-[#2B2B2B]/80 text-white rounded-lg border border-[#6F6F6F]/40 text-xs cursor-pointer flex items-center gap-1"
              title="چاپ"
            >
              <Printer className="w-3.5 h-3.5 text-[#D9D9D9]" />
              <span className="text-[11px] hidden sm:inline">چاپ</span>
            </button>
          </div>
        </div>

        {/* Desktop Action Buttons (Hidden on mobile & tablet) */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Drafts */}
          <button
            onClick={onOpenDrafts}
            className="px-3 py-2 bg-[#2B2B2B] hover:bg-[#2B2B2B]/80 text-white text-xs font-medium rounded-xl border border-[#6F6F6F]/40 transition flex items-center gap-1.5 relative cursor-pointer"
          >
            <FolderOpen className="w-4 h-4 text-[#F9C319]" />
            <span>پیش‌نویس‌ها</span>
            {draftsCount > 0 && (
              <span className="px-1.5 py-0.5 bg-[#F9C319] text-[#1F1F1F] font-bold text-[10px] rounded-full">
                {draftsCount}
              </span>
            )}
          </button>

          {/* Save */}
          <button
            onClick={onSaveDraft}
            className="px-3 py-2 bg-[#2B2B2B] hover:bg-[#2B2B2B]/80 text-white text-xs font-medium rounded-xl border border-[#6F6F6F]/40 transition flex items-center gap-1.5 cursor-pointer"
            title="ذخیره تغییرات"
          >
            <Save className="w-4 h-4 text-emerald-400" />
            <span>ذخیره</span>
          </button>

          {/* New Letter */}
          <button
            onClick={onNewLetter}
            className="px-3 py-2 bg-[#2B2B2B] hover:bg-[#2B2B2B]/80 text-white text-xs font-medium rounded-xl border border-[#6F6F6F]/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-sky-400" />
            <span>نامه جدید</span>
          </button>

          {/* Print */}
          <button
            onClick={onPrint}
            className="px-3.5 py-2 bg-[#2B2B2B] hover:bg-[#2B2B2B]/80 text-white text-xs font-medium rounded-xl border border-[#6F6F6F]/40 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#D9D9D9]" />
            <span>چاپ</span>
          </button>

          {/* Export PDF Button */}
          <button
            onClick={onDownloadPDF}
            disabled={isGeneratingPDF}
            className="px-4 py-2 bg-[#F9C319] hover:bg-[#e0ae12] text-[#1F1F1F] font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isGeneratingPDF ? 'در حال تولید PDF...' : 'دانلود PDF'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

