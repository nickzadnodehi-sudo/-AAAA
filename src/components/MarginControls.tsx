import React from 'react';
import { Settings } from '../types';
import {
  Sliders,
  Type,
  Maximize2,
  Move,
  Eye,
  RotateCcw,
  Upload,
  Hash,
} from 'lucide-react';

interface MarginControlsProps {
  settings: Settings;
  onChange: (updated: Partial<Settings>) => void;
  onReset: () => void;
}

export const MarginControls: React.FC<MarginControlsProps> = ({
  settings,
  onChange,
  onReset,
}) => {
  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({ customBackgroundImage: event.target?.result as string, showBackgroundLetterhead: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#D9D9D9] p-5 shadow-xs space-y-6 text-xs text-[#1F1F1F]">
      <div className="flex items-center justify-between border-b border-[#D9D9D9]/50 pb-3">
        <div className="flex items-center gap-2 font-bold text-[#1F1F1F] text-sm">
          <Sliders className="w-4 h-4 text-[#F9C319]" />
          <h2>تنظیمات استانداردهای چیدمان، حواشی و فونت</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-[11px] text-[#6F6F6F] hover:text-[#1F1F1F] font-medium flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#F9C319]" />
          تنظیمات اولیه
        </button>
      </div>

      {/* 1. Letterhead Background Mode */}
      <div className="bg-[#F5F6F8] border border-[#D9D9D9] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-[#1F1F1F]">
            <Eye className="w-4 h-4 text-[#F9C319]" />
            حالت نمایش سربرگ در پیش‌نمایش و خروجی
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showBackgroundLetterhead}
              onChange={(e) => onChange({ showBackgroundLetterhead: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-[#D9D9D9] peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#D9D9D9] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#F9C319]"></div>
          </label>
        </div>

        <p className="text-[11px] text-[#6F6F6F] leading-relaxed">
          اگر روی برگه سفید A4 پرینت می‌گیرید، طرح سربرگ را روشن بگذارید. اگر برگه سربرگ‌دار واقعی در پرینتر قرار داده‌اید، جهت چاپ فقط متن، آن را خاموش کنید.
        </p>

        {settings.showBackgroundLetterhead && (
          <div className="flex items-center gap-2 pt-2 border-t border-[#D9D9D9]">
            <label className="px-3 py-1.5 bg-white border border-[#D9D9D9] hover:bg-[#F5F6F8] text-[#1F1F1F] text-[11px] font-medium rounded-lg transition flex items-center gap-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-[#F9C319]" />
              آپلود فایل عکس سربرگ اختصاصی
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundUpload}
                className="hidden"
              />
            </label>
            {settings.customBackgroundImage && (
              <button
                type="button"
                onClick={() => onChange({ customBackgroundImage: null })}
                className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-medium rounded-lg transition cursor-pointer"
              >
                بازگشت به طرح پیش‌فرض
              </button>
            )}
          </div>
        )}
      </div>

      {/* 2. Persian Digits & Typography */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-bold text-[#1F1F1F] text-xs border-b border-[#D9D9D9]/50 pb-2">
          <span className="flex items-center gap-1.5">
            <Type className="w-4 h-4 text-[#F9C319]" />
            فونت و اعداد
          </span>
          <label className="flex items-center gap-2 text-[11px] font-normal text-[#1F1F1F] cursor-pointer">
            <input
              type="checkbox"
              checked={settings.usePersianDigits}
              onChange={(e) => onChange({ usePersianDigits: e.target.checked })}
              className="rounded-md border-[#D9D9D9] text-[#F9C319] focus:ring-[#F9C319]"
            />
            تبدیل خودکار به اعداد فارسی (۱، ۲، ۳)
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Font Size */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-[#1F1F1F]">اندازه قلم متن (پوئنت):</span>
              <span className="font-bold text-[#1F1F1F]">{settings.fontSize}pt</span>
            </div>
            <input
              type="range"
              min="11"
              max="18"
              step="0.5"
              value={settings.fontSize}
              onChange={(e) => onChange({ fontSize: parseFloat(e.target.value) })}
              className="w-full accent-[#F9C319] cursor-pointer"
            />
          </div>

          {/* Line Height */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-[#1F1F1F]">فاصله بین خطوط:</span>
              <span className="font-bold text-[#1F1F1F]">{settings.lineHeight}</span>
            </div>
            <input
              type="range"
              min="1.4"
              max="2.4"
              step="0.1"
              value={settings.lineHeight}
              onChange={(e) => onChange({ lineHeight: parseFloat(e.target.value) })}
              className="w-full accent-[#F9C319] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 3. Margins (حواشی چهارگانه برگه به میلی‌متر) */}
      <div className="space-y-4">
        <div className="font-bold text-[#1F1F1F] text-xs border-b border-[#D9D9D9]/50 pb-2 flex items-center gap-1.5">
          <Maximize2 className="w-4 h-4 text-[#F9C319]" />
          حواشی برگه (میلی‌متر)
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Top Margin */}
          <div>
            <label className="block text-[11px] text-[#6F6F6F] mb-1">حاشیه بالا:</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="35"
                max="80"
                value={settings.marginTopMM}
                onChange={(e) => onChange({ marginTopMM: parseInt(e.target.value, 10) || 52 })}
                className="w-full px-2 py-1.5 border border-[#D9D9D9] rounded-lg text-center font-bold"
              />
              <span className="text-[10px] text-[#6F6F6F]">mm</span>
            </div>
          </div>

          {/* Bottom Margin */}
          <div>
            <label className="block text-[11px] text-[#6F6F6F] mb-1">حاشیه پایین:</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="20"
                max="60"
                value={settings.marginBottomMM}
                onChange={(e) => onChange({ marginBottomMM: parseInt(e.target.value, 10) || 35 })}
                className="w-full px-2 py-1.5 border border-[#D9D9D9] rounded-lg text-center font-bold"
              />
              <span className="text-[10px] text-[#6F6F6F]">mm</span>
            </div>
          </div>

          {/* Right Margin */}
          <div>
            <label className="block text-[11px] text-[#6F6F6F] mb-1">حاشیه راست:</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="15"
                max="50"
                value={settings.marginRightMM}
                onChange={(e) => onChange({ marginRightMM: parseInt(e.target.value, 10) || 28 })}
                className="w-full px-2 py-1.5 border border-[#D9D9D9] rounded-lg text-center font-bold"
              />
              <span className="text-[10px] text-[#6F6F6F]">mm</span>
            </div>
          </div>

          {/* Left Margin */}
          <div>
            <label className="block text-[11px] text-[#6F6F6F] mb-1">حاشیه چپ:</label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="15"
                max="50"
                value={settings.marginLeftMM}
                onChange={(e) => onChange({ marginLeftMM: parseInt(e.target.value, 10) || 22 })}
                className="w-full px-2 py-1.5 border border-[#D9D9D9] rounded-lg text-center font-bold"
              />
              <span className="text-[10px] text-[#6F6F6F]">mm</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Fine-Tuning Header Positions (تنظیم جایگاه شماره، تاریخ و پیوست) */}
      <div className="space-y-4">
        <div className="font-bold text-[#1F1F1F] text-xs border-b border-[#D9D9D9]/50 pb-2 flex items-center gap-1.5">
          <Move className="w-4 h-4 text-[#F9C319]" />
          تنظیم موقعیت شماره، تاریخ و پیوست در سربرگ (میلی‌متر)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Number Offset */}
          <div className="bg-[#F5F6F8] p-2.5 rounded-lg border border-[#D9D9D9] space-y-1">
            <span className="font-semibold text-[#1F1F1F] block">جابه‌جایی شماره:</span>
            <div className="flex gap-2">
              <div className="flex-1">
                <span className="text-[10px] text-[#6F6F6F]">افقی:</span>
                <input
                  type="number"
                  value={settings.headerNumberOffset?.x || 0}
                  onChange={(e) =>
                    onChange({
                      headerNumberOffset: {
                        ...settings.headerNumberOffset,
                        x: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-1.5 py-1 text-[11px] border border-[#D9D9D9] rounded-md text-center bg-white"
                />
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-[#6F6F6F]">عمودی:</span>
                <input
                  type="number"
                  value={settings.headerNumberOffset?.y || 0}
                  onChange={(e) =>
                    onChange({
                      headerNumberOffset: {
                        ...settings.headerNumberOffset,
                        y: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-1.5 py-1 text-[11px] border border-[#D9D9D9] rounded-md text-center bg-white"
                />
              </div>
            </div>
          </div>

          {/* Date Offset */}
          <div className="bg-[#F5F6F8] p-2.5 rounded-lg border border-[#D9D9D9] space-y-1">
            <span className="font-semibold text-[#1F1F1F] block">جابه‌جایی تاریخ:</span>
            <div className="flex gap-2">
              <div className="flex-1">
                <span className="text-[10px] text-[#6F6F6F]">افقی:</span>
                <input
                  type="number"
                  value={settings.headerDateOffset?.x || 0}
                  onChange={(e) =>
                    onChange({
                      headerDateOffset: {
                        ...settings.headerDateOffset,
                        x: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-1.5 py-1 text-[11px] border border-[#D9D9D9] rounded-md text-center bg-white"
                />
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-[#6F6F6F]">عمودی:</span>
                <input
                  type="number"
                  value={settings.headerDateOffset?.y || 0}
                  onChange={(e) =>
                    onChange({
                      headerDateOffset: {
                        ...settings.headerDateOffset,
                        y: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-1.5 py-1 text-[11px] border border-[#D9D9D9] rounded-md text-center bg-white"
                />
              </div>
            </div>
          </div>

          {/* Attachment Offset */}
          <div className="bg-[#F5F6F8] p-2.5 rounded-lg border border-[#D9D9D9] space-y-1">
            <span className="font-semibold text-[#1F1F1F] block">جابه‌جایی پیوست:</span>
            <div className="flex gap-2">
              <div className="flex-1">
                <span className="text-[10px] text-[#6F6F6F]">افقی:</span>
                <input
                  type="number"
                  value={settings.headerAttachmentOffset?.x || 0}
                  onChange={(e) =>
                    onChange({
                      headerAttachmentOffset: {
                        ...settings.headerAttachmentOffset,
                        x: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-1.5 py-1 text-[11px] border border-[#D9D9D9] rounded-md text-center bg-white"
                />
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-[#6F6F6F]">عمودی:</span>
                <input
                  type="number"
                  value={settings.headerAttachmentOffset?.y || 0}
                  onChange={(e) =>
                    onChange({
                      headerAttachmentOffset: {
                        ...settings.headerAttachmentOffset,
                        y: parseFloat(e.target.value) || 0,
                      },
                    })
                  }
                  className="w-full px-1.5 py-1 text-[11px] border border-[#D9D9D9] rounded-md text-center bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
