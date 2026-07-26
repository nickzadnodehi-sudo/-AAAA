import React, { useState } from 'react';
import { LetterData, LetterTemplate } from '../types';
import { OFFICIAL_TEMPLATES } from '../data/templates';
import { getTodayJalali, generateLetterNumber, parseLetterNumber } from '../utils/jalali';
import { createDefaultCompanyStampSVG, createDefaultSignatureSVG } from '../utils/defaultStamps';
import {
  FileText,
  Calendar,
  Paperclip,
  User,
  MessageSquare,
  PenTool,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
  CheckCircle2,
  BookmarkPlus,
  Layers,
} from 'lucide-react';

interface LetterFormProps {
  letterData: LetterData;
  onChange: (updated: Partial<LetterData>) => void;
  onApplyTemplate: (template: LetterTemplate) => void;
}

export const LetterForm: React.FC<LetterFormProps> = ({
  letterData,
  onChange,
  onApplyTemplate,
}) => {
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const handleSetToday = () => {
    onChange({ letterDate: getTodayJalali() });
  };

  const currentParsed = parseLetterNumber(letterData.letterNumber || '');

  const setNumberParts = (type: 'ص' | 'و' | 'د', year: string, serial: string | number, projectCode: string) => {
    const formatted = generateLetterNumber(type, year, serial, projectCode);
    onChange({ letterNumber: formatted });
  };

  const handleGenerateNumber = () => {
    const nextSerial = (parseInt(currentParsed.serial, 10) || 0) + 1;
    setNumberParts(currentParsed.type, currentParsed.year, nextSerial, currentParsed.projectCode);
  };

  const handleStampUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({ stampImage: event.target?.result as string, showStamp: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({ signatureImage: event.target?.result as string, showSignature: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Templates Banner Button */}
      <div className="bg-[#F9C319]/10 border border-[#F9C319]/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#F9C319] text-[#1F1F1F] rounded-lg shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#1F1F1F] text-sm">نامه‌های آماده و پیش‌فرض اداری</h3>
            <p className="text-xs text-[#6F6F6F]">استفاده از قالب‌های استاندارد مالی، درخواست، استعلام و اداری</p>
          </div>
        </div>
        <button
          onClick={() => setShowTemplateModal(true)}
          className="w-full sm:w-auto px-4 py-2 bg-[#1F1F1F] hover:bg-[#2B2B2B] text-[#F9C319] text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer border border-[#F9C319]/30"
        >
          <Layers className="w-4 h-4" />
          مشاهده و انتخاب قالب
        </button>
      </div>

      {/* 1. Header Information (شماره، تاریخ، پیوست) */}
      <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#1F1F1F] font-bold border-b border-[#D9D9D9]/50 pb-3 text-sm">
          <FileText className="w-4 h-4 text-[#F9C319]" />
          <h2>مشخصات سربرگ (شماره، تاریخ و پیوست)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Letter Number */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#1F1F1F] mb-1 flex justify-between items-center">
              <span>شماره نامه (فرمول: [سال]-[سریال]-[کد][نوع])</span>
              <button
                type="button"
                onClick={handleGenerateNumber}
                className="text-[11px] text-[#1F1F1F] hover:text-[#F9C319] font-medium flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 text-[#F9C319]" />
                شماره بعدی
              </button>
            </label>
            <input
              type="text"
              value={letterData.letterNumber}
              onChange={(e) => onChange({ letterNumber: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-[#D9D9D9] rounded-lg focus:ring-2 focus:ring-[#F9C319] focus:border-[#F9C319] outline-hidden dir-ltr text-left font-mono font-bold"
              placeholder="1405-0002-653ص"
            />
            {/* Quick Indicator Standard Selectors */}
            <div className="bg-[#F5F6F8] p-2 rounded-lg border border-[#D9D9D9]/70 space-y-2 text-[11px] mt-1.5">
              {/* Type Select */}
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-[10px] font-bold text-[#6F6F6F]">نوع (حرف اول):</span>
                {(
                  [
                    { label: 'صادره', val: 'ص' as const },
                    { label: 'وارده', val: 'و' as const },
                    { label: 'داخلی', val: 'د' as const },
                  ]
                ).map((t) => (
                  <button
                    key={t.val}
                    type="button"
                    onClick={() =>
                      setNumberParts(t.val, currentParsed.year, currentParsed.serial, currentParsed.projectCode)
                    }
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                      currentParsed.type === t.val
                        ? 'bg-[#1F1F1F] text-[#F9C319]'
                        : 'bg-white text-[#1F1F1F] border border-[#D9D9D9] hover:bg-[#F9C319]/20'
                    }`}
                  >
                    {t.label} ({t.val})
                  </button>
                ))}
              </div>

              {/* Variable Project Code Input */}
              <div className="flex items-center gap-1.5 pt-1 border-t border-[#D9D9D9]/50">
                <span className="text-[10px] font-bold text-[#6F6F6F]">کد پروژه / ستاد:</span>
                <input
                  type="text"
                  value={currentParsed.projectCode}
                  onChange={(e) =>
                    setNumberParts(currentParsed.type, currentParsed.year, currentParsed.serial, e.target.value)
                  }
                  className="w-20 px-2 py-0.5 text-xs font-mono font-bold bg-white border border-[#D9D9D9] rounded-md text-center dir-ltr focus:ring-1 focus:ring-[#F9C319] outline-hidden"
                  placeholder="کد پروژه"
                />
                <button
                  type="button"
                  onClick={() =>
                    setNumberParts(currentParsed.type, currentParsed.year, currentParsed.serial, '653')
                  }
                  className="text-[10px] px-1.5 py-0.5 bg-white border border-[#D9D9D9] hover:bg-[#F9C319]/20 rounded text-[#1F1F1F] font-semibold transition cursor-pointer"
                  title="کد عمومی ستاد"
                >
                  653 (عمومی)
                </button>
              </div>
            </div>
          </div>

          {/* Letter Date */}
          <div>
            <label className="block text-xs font-semibold text-[#1F1F1F] mb-1 flex justify-between items-center">
              <span>تاریخ نامه</span>
              <button
                type="button"
                onClick={handleSetToday}
                className="text-[11px] text-[#1F1F1F] hover:text-[#F9C319] font-medium flex items-center gap-1 cursor-pointer"
              >
                <Calendar className="w-3 h-3 text-[#F9C319]" />
                تاریخ امروز
              </button>
            </label>
            <input
              type="text"
              value={letterData.letterDate}
              onChange={(e) => onChange({ letterDate: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-[#D9D9D9] rounded-lg focus:ring-2 focus:ring-[#F9C319] focus:border-[#F9C319] outline-hidden dir-ltr text-left font-mono"
              placeholder="1403/05/04"
            />
          </div>

          {/* Attachment */}
          <div>
            <label className="block text-xs font-semibold text-[#1F1F1F] mb-1">
              پیوست
            </label>
            <input
              type="text"
              value={letterData.attachment}
              onChange={(e) => onChange({ attachment: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-[#D9D9D9] rounded-lg focus:ring-2 focus:ring-[#F9C319] focus:border-[#F9C319] outline-hidden"
              placeholder="ندارد / دارد (۲ برگ)"
            />
            {/* Quick chips */}
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
              {['ندارد', 'دارد (۱ برگ)', 'دارد (۲ برگ)', 'یک نسخه قرارداد'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => onChange({ attachment: chip })}
                  className="text-[10px] px-2 py-0.5 bg-[#F5F6F8] hover:bg-[#F9C319]/20 text-[#1F1F1F] border border-[#D9D9D9]/80 rounded-md transition whitespace-nowrap cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Recipient & Subject (به، سلام، موضوع) */}
      <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#1F1F1F] font-bold border-b border-[#D9D9D9]/50 pb-3 text-sm">
          <User className="w-4 h-4 text-[#F9C319]" />
          <h2>گیرنده و موضوع نامه</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Recipient To */}
          <div>
            <label className="block text-xs font-semibold text-[#1F1F1F] mb-1">
              گیرنده / به (نام و سمت تحویل‌گیرنده)
            </label>
            <textarea
              rows={2}
              value={letterData.recipientTo}
              onChange={(e) => onChange({ recipientTo: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-[#D9D9D9] rounded-lg focus:ring-2 focus:ring-[#F9C319] focus:border-[#F9C319] outline-hidden resize-none"
              placeholder="جناب آقای مهندس رضایی&#10;مدیر محترم عامل شرکت توسعه ساختمانی"
            />
          </div>

          {/* Salutation / Greeting */}
          <div>
            <label className="block text-xs font-semibold text-[#1F1F1F] mb-1">
              عبارت ادای احترام (سلام اولیه)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={letterData.recipientGreeting}
                onChange={(e) => onChange({ recipientGreeting: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-[#D9D9D9] rounded-lg focus:ring-2 focus:ring-[#F9C319] focus:border-[#F9C319] outline-hidden"
                placeholder="با سلام و احترام"
              />
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {['با سلام و احترام', 'با سلام و تحیت', 'با سلام و اهدای تحیات'].map((salutation) => (
                <button
                  key={salutation}
                  type="button"
                  onClick={() => onChange({ recipientGreeting: salutation })}
                  className="text-[10px] px-2 py-0.5 bg-[#F5F6F8] hover:bg-[#F9C319]/20 text-[#1F1F1F] border border-[#D9D9D9]/80 rounded-md transition cursor-pointer"
                >
                  {salutation}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-[#1F1F1F] mb-1">
              موضوع نامه
            </label>
            <input
              type="text"
              value={letterData.subject}
              onChange={(e) => onChange({ subject: e.target.value })}
              className="w-full px-3 py-2 text-xs font-semibold border border-[#D9D9D9] rounded-lg focus:ring-2 focus:ring-[#F9C319] focus:border-[#F9C319] outline-hidden"
              placeholder="درخواست بررسی و تایید مدارک فنی"
            />
          </div>
        </div>
      </div>

      {/* 3. Main Letter Body */}
      <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#D9D9D9]/50 pb-3">
          <div className="flex items-center gap-2 text-[#1F1F1F] font-bold text-sm">
            <MessageSquare className="w-4 h-4 text-[#F9C319]" />
            <h2>متن اصلی نامه</h2>
          </div>
          <span className="text-[11px] text-[#6F6F6F]">
            {letterData.bodyContent.length} کاراکتر
          </span>
        </div>

        <div>
          <textarea
            rows={10}
            value={letterData.bodyContent}
            onChange={(e) => onChange({ bodyContent: e.target.value })}
            className="w-full px-3.5 py-3 text-xs leading-relaxed border border-[#D9D9D9] rounded-lg focus:ring-2 focus:ring-[#F9C319] focus:border-[#F9C319] outline-hidden font-sans"
            placeholder="متن اصلی نامه اداری خود را در اینجا بنویسید..."
          />
        </div>
      </div>

      {/* 4. Sender, Stamp & Signature */}
      <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#1F1F1F] font-bold border-b border-[#D9D9D9]/50 pb-3 text-sm">
          <PenTool className="w-4 h-4 text-[#F9C319]" />
          <h2>مشخصات فرستنده، مهر و امضا</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Sender Title */}
          <div>
            <label className="block text-xs font-semibold text-[#1F1F1F] mb-1">
              عنوان امضاکننده / سمت
            </label>
            <input
              type="text"
              value={letterData.senderTitle}
              onChange={(e) => onChange({ senderTitle: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-[#D9D9D9] rounded-lg focus:ring-2 focus:ring-[#F9C319] focus:border-[#F9C319] outline-hidden"
              placeholder="با احترام / مدیرعامل"
            />
          </div>

          {/* Sender Name */}
          <div>
            <label className="block text-xs font-semibold text-[#1F1F1F] mb-1">
              نام و نام خانوادگی امضاکننده
            </label>
            <input
              type="text"
              value={letterData.senderName}
              onChange={(e) => onChange({ senderName: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-[#D9D9D9] rounded-lg focus:ring-2 focus:ring-[#F9C319] focus:border-[#F9C319] outline-hidden"
              placeholder="مهندس علی صادقی"
            />
          </div>
        </div>

        {/* Toggles for Stamp & Signature */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#D9D9D9]/50">
          {/* Stamp Settings */}
          <div className="bg-[#F5F6F8] border border-[#D9D9D9] rounded-xl p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1F1F1F] flex items-center gap-1.5">
                <BookmarkPlus className="w-4 h-4 text-[#F9C319]" />
                مهر رسمی شرکت
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={letterData.showStamp}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked && !letterData.stampImage) {
                      onChange({
                        showStamp: true,
                        stampImage: createDefaultCompanyStampSVG(),
                      });
                    } else {
                      onChange({ showStamp: checked });
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#D9D9D9] peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D9D9D9] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#F9C319]"></div>
              </label>
            </div>

            {letterData.showStamp && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs text-[#6F6F6F]">
                  <span>اندازه مهر:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={letterData.stampScale || 1}
                    onChange={(e) => onChange({ stampScale: parseFloat(e.target.value) })}
                    className="w-24 accent-[#F9C319] cursor-pointer"
                  />
                </div>

                <div className="flex gap-2">
                  <label className="flex-1 py-1.5 bg-white border border-[#D9D9D9] hover:bg-[#F5F6F8] text-[#1F1F1F] text-[11px] font-medium rounded-lg transition flex items-center justify-center gap-1 cursor-pointer">
                    <ImageIcon className="w-3.5 h-3.5 text-[#F9C319]" />
                    آپلود عکس مهر
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleStampUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        stampImage: createDefaultCompanyStampSVG(),
                        showStamp: true,
                      })
                    }
                    className="px-2.5 py-1.5 bg-[#F9C319]/20 hover:bg-[#F9C319]/30 text-[#1F1F1F] text-[11px] font-bold rounded-lg transition cursor-pointer"
                  >
                    مهر پیش‌فرض
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Signature Settings */}
          <div className="bg-[#F5F6F8] border border-[#D9D9D9] rounded-xl p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1F1F1F] flex items-center gap-1.5">
                <PenTool className="w-4 h-4 text-[#F9C319]" />
                امضای صادرکننده
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={letterData.showSignature}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked && !letterData.signatureImage) {
                      onChange({
                        showSignature: true,
                        signatureImage: createDefaultSignatureSVG(),
                      });
                    } else {
                      onChange({ showSignature: checked });
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#D9D9D9] peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D9D9D9] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#F9C319]"></div>
              </label>
            </div>

            {letterData.showSignature && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs text-[#6F6F6F]">
                  <span>اندازه امضا:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.05"
                    value={letterData.signatureScale || 1}
                    onChange={(e) => onChange({ signatureScale: parseFloat(e.target.value) })}
                    className="w-24 accent-[#F9C319] cursor-pointer"
                  />
                </div>

                <div className="flex gap-2">
                  <label className="flex-1 py-1.5 bg-white border border-[#D9D9D9] hover:bg-[#F5F6F8] text-[#1F1F1F] text-[11px] font-medium rounded-lg transition flex items-center justify-center gap-1 cursor-pointer">
                    <ImageIcon className="w-3.5 h-3.5 text-[#F9C319]" />
                    آپلود عکس امضا
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSignatureUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        signatureImage: createDefaultSignatureSVG(),
                        showSignature: true,
                      })
                    }
                    className="px-2.5 py-1.5 bg-[#F9C319]/20 hover:bg-[#F9C319]/30 text-[#1F1F1F] text-[11px] font-bold rounded-lg transition cursor-pointer"
                  >
                    امضای پیش‌فرض
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preset Templates Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-[#D9D9D9]">
            <div className="p-4 border-b border-[#D9D9D9] flex items-center justify-between bg-[#F5F6F8]">
              <div className="flex items-center gap-2 font-bold text-[#1F1F1F] text-base">
                <Sparkles className="w-5 h-5 text-[#F9C319]" />
                انتخاب قالب پیش‌فرض نامه اداری
              </div>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="text-[#6F6F6F] hover:text-[#1F1F1F] text-sm font-bold p-1 rounded-md cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {OFFICIAL_TEMPLATES.map((tpl) => (
                <div
                  key={tpl.id}
                  className="border border-[#D9D9D9] hover:border-[#F9C319] rounded-xl p-4 transition bg-white hover:bg-[#F9C319]/10 flex flex-col gap-2 group cursor-pointer"
                  onClick={() => {
                    onApplyTemplate(tpl);
                    setShowTemplateModal(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1F1F1F] text-sm group-hover:text-[#1F1F1F] transition">
                      {tpl.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 bg-[#F5F6F8] text-[#6F6F6F] rounded-full border border-[#D9D9D9]/60">
                      {tpl.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#6F6F6F] line-clamp-1">{tpl.description}</p>
                  <div className="text-[11px] font-bold text-[#1F1F1F] bg-[#F9C319]/20 px-2.5 py-1 rounded-md mt-1">
                    موضوع: {tpl.subject}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-[#D9D9D9] bg-[#F5F6F8] flex justify-end">
              <button
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-2 bg-[#D9D9D9] hover:bg-[#6F6F6F]/30 text-[#1F1F1F] text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
