import React, { useState, useEffect } from 'react';
import { LetterData, Settings, LetterTemplate } from '../../types';
import { getTodayJalali, generateLetterNumber } from '../../utils/jalali';
import { exportToPDF, triggerPrint } from '../../utils/pdf';
import { createDefaultCompanyStampSVG, createDefaultSignatureSVG } from '../../utils/defaultStamps';
import { Header } from '../Header';
import { LetterForm } from '../LetterForm';
import { LetterPreview } from '../LetterPreview';
import { MarginControls } from '../MarginControls';
import { DraftsModal } from '../DraftsModal';
import { Sliders, ZoomIn, ZoomOut, RotateCcw, Check, FileText } from 'lucide-react';

const DEFAULT_SETTINGS: Settings = {
  fontFamily: 'Vazirmatn',
  fontSize: 13,
  lineHeight: 1.8,
  marginTopMM: 50,
  marginBottomMM: 35,
  marginRightMM: 28,
  marginLeftMM: 22,
  headerNumberOffset: { x: 0, y: 0 },
  headerDateOffset: { x: 0, y: 0 },
  headerAttachmentOffset: { x: 0, y: 0 },
  showBackgroundLetterhead: false,
  customBackgroundImage: null,
  usePersianDigits: true,
};

const INITIAL_LETTER: LetterData = {
  id: 'letter-init-1',
  title: 'نامه درخواست تایید نقشه‌ها',
  letterNumber: generateLetterNumber('ص', '1405', 1, '653'),
  letterDate: getTodayJalali(),
  attachment: 'دارد (۲ برگ)',
  recipientTo: 'جناب آقای مهندس رضایی\nمدیر محترم عامل شرکت توسعه مهندسی سازه',
  recipientGreeting: 'با سلام و احترام',
  subject: 'درخواست بررسی و تایید مدارک فنی و نقشه‌های اجرایی پروژه',
  bodyContent: `پیرو مذاکرات حضوری قبلی و در راستای تسریع در روند اجرای تعهدات قراردادی، به استحضار می‌رساند کلیه مدارک فنی و نقشه‌های اجرایی مربوط به پروژه در بخش سازه و تأسیسات آماده‌سازی گردیده است.

خواهشمند است دستور فرمایید کارشناسان مربوطه نسبت به بررسی، ممیزی فنی و اعلام نظر نهایی در خصوص مدارک ارسالی اقدام لازم را مبذول دارند.

پیشاپیش از حسن همکاری و بذل توجه جنابعالی کمال تشکر و امتنان را دارد.`,
  senderTitle: 'با احترام\nمدیر پروژه',
  senderName: 'مهندس علی صادقی',
  showStamp: true,
  stampImage: createDefaultCompanyStampSVG(),
  stampScale: 1,
  showSignature: true,
  signatureImage: createDefaultSignatureSVG(),
  signatureScale: 1,
  updatedAt: new Date().toISOString(),
};

export const LetterModuleContainer: React.FC = () => {
  const [letterData, setLetterData] = useState<LetterData>(() => {
    const saved = localStorage.getItem('akp_current_letter');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_LETTER;
  });

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('akp_letter_settings');
    if (saved) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch {
        // fallback
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [drafts, setDrafts] = useState<LetterData[]>(() => {
    const saved = localStorage.getItem('akp_letter_drafts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [INITIAL_LETTER];
  });

  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'settings'>('edit');
  const [activeFormSubTab, setActiveFormSubTab] = useState<'content' | 'margins'>('content');
  const [previewScale, setPreviewScale] = useState<number>(0.8);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [showDraftsModal, setShowDraftsModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-saves
  useEffect(() => {
    localStorage.setItem('akp_current_letter', JSON.stringify(letterData));
  }, [letterData]);

  useEffect(() => {
    localStorage.setItem('akp_letter_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('akp_letter_drafts', JSON.stringify(drafts));
  }, [drafts]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateLetter = (updated: Partial<LetterData>) => {
    setLetterData((prev) => ({
      ...prev,
      ...updated,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleUpdateSettings = (updated: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
  };

  const handleApplyTemplate = (template: LetterTemplate) => {
    setLetterData((prev) => ({
      ...prev,
      subject: template.subject,
      recipientTo: template.recipientTo,
      bodyContent: template.bodyContent,
      senderTitle: template.senderTitle,
      senderName: template.senderName,
      updatedAt: new Date().toISOString(),
    }));
    showToast(`قالب "${template.name}" اعمال شد`);
  };

  const handleNewLetter = () => {
    const newDoc: LetterData = {
      ...INITIAL_LETTER,
      id: `letter-${Date.now()}`,
      letterNumber: generateLetterNumber(),
      letterDate: getTodayJalali(),
      subject: '',
      recipientTo: '',
      bodyContent: '',
      updatedAt: new Date().toISOString(),
    };
    setLetterData(newDoc);
    showToast('نامه جدید ایجاد شد');
  };

  const handleSaveDraft = () => {
    setDrafts((prev) => {
      const exists = prev.some((d) => d.id === letterData.id);
      if (exists) {
        return prev.map((d) => (d.id === letterData.id ? letterData : d));
      }
      return [letterData, ...prev];
    });
    showToast('نامه در دفتر اندیکاتور و پیش‌نویس‌ها ذخیره شد');
  };

  const handleDeleteDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
    showToast('پیش‌نویس حذف شد');
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    showToast('در حال آماده‌سازی فایل PDF...');
    const fileName = `نامه_${letterData.letterNumber.replace(/\//g, '-')}.pdf`;
    const success = await exportToPDF('a4-page-export', fileName);
    setIsGeneratingPDF(false);
    if (success) {
      showToast('فایل PDF با موفقیت دانلود شد');
    } else {
      showToast('خطا در صدور فایل PDF. لطفا از دکمه چاپ استفاده نمایید.');
    }
  };

  return (
    <div className="space-y-4 text-right">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1F1F1F] text-white px-4 py-3 rounded-xl shadow-2xl border border-[#2B2B2B] flex items-center gap-2 text-xs">
          <Check className="w-4 h-4 text-[#F9C319]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Module Header Bar */}
      <Header
        onDownloadPDF={handleDownloadPDF}
        onPrint={triggerPrint}
        onNewLetter={handleNewLetter}
        onSaveDraft={handleSaveDraft}
        onOpenDrafts={() => setShowDraftsModal(true)}
        draftsCount={drafts.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isGeneratingPDF={isGeneratingPDF}
      />

      {/* Main Letter Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT / EDITOR COLUMN */}
        <div className={`lg:col-span-6 space-y-4 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-white rounded-xl border border-[#D9D9D9] p-1.5 flex items-center gap-2 shadow-xs">
            <button
              onClick={() => setActiveFormSubTab('content')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeFormSubTab === 'content'
                  ? 'bg-[#F9C319] text-[#1F1F1F] shadow-xs'
                  : 'text-[#6F6F6F] hover:text-[#1F1F1F] hover:bg-[#F5F6F8]'
              }`}
            >
              <FileText className="w-4 h-4" />
              محتوای نامه
            </button>
            <button
              onClick={() => setActiveFormSubTab('margins')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeFormSubTab === 'margins'
                  ? 'bg-[#F9C319] text-[#1F1F1F] shadow-xs'
                  : 'text-[#6F6F6F] hover:text-[#1F1F1F] hover:bg-[#F5F6F8]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              تنظیم حواشی و چیدمان
            </button>
          </div>

          {activeFormSubTab === 'content' ? (
            <LetterForm
              letterData={letterData}
              onChange={handleUpdateLetter}
              onApplyTemplate={handleApplyTemplate}
            />
          ) : (
            <MarginControls
              settings={settings}
              onChange={handleUpdateSettings}
              onReset={() => setSettings(DEFAULT_SETTINGS)}
            />
          )}
        </div>

        {/* RIGHT / LIVE PREVIEW COLUMN */}
        <div className={`lg:col-span-6 space-y-3 ${activeTab === 'edit' ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-white rounded-xl border border-[#D9D9D9] px-4 py-2.5 flex items-center justify-between shadow-xs text-xs">
            <span className="font-bold text-[#1F1F1F] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F9C319] animate-pulse"></span>
              پیش‌نمایش زنده برگه A4 (سربرگ رسمی AKPH + QR کد)
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPreviewScale((s) => Math.max(0.4, s - 0.1))}
                className="p-1.5 bg-[#F5F6F8] hover:bg-[#D9D9D9] text-[#1F1F1F] rounded-lg transition cursor-pointer"
                title="کوچک‌نمایی"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[#6F6F6F] text-[11px] min-w-[36px] text-center">
                {Math.round(previewScale * 100)}%
              </span>
              <button
                onClick={() => setPreviewScale((s) => Math.min(1.2, s + 0.1))}
                className="p-1.5 bg-[#F5F6F8] hover:bg-[#D9D9D9] text-[#1F1F1F] rounded-lg transition cursor-pointer"
                title="بزرگ‌نمایی"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPreviewScale(0.8)}
                className="p-1.5 bg-[#F5F6F8] hover:bg-[#D9D9D9] text-[#1F1F1F] rounded-lg transition cursor-pointer"
                title="بازنشان سایز"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-[#EBECEF] rounded-2xl p-2.5 sm:p-4 border border-[#D9D9D9] overflow-auto max-h-[80vh] flex justify-center items-start shadow-inner">
            <div className="py-2 transition-all duration-200">
              <LetterPreview
                letterData={letterData}
                settings={settings}
                previewScale={previewScale}
              />
            </div>
          </div>
        </div>
      </div>

      {showDraftsModal && (
        <DraftsModal
          drafts={drafts}
          onSelect={(draft) => {
            setLetterData(draft);
            showToast('نامه انتخاب شد');
          }}
          onDelete={handleDeleteDraft}
          onClose={() => setShowDraftsModal(false)}
          currentLetterId={letterData.id}
        />
      )}
    </div>
  );
};
