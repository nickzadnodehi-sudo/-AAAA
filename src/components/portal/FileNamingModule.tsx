import React, { useState } from 'react';
import { FileCode2, Copy, Check, Sparkles, RefreshCw } from 'lucide-react';

export const FileNamingModule: React.FC = () => {
  const [projectCode, setProjectCode] = useState('653');
  const [blockZone, setBlockZone] = useState('B1');
  const [discipline, setDiscipline] = useState('STR');
  const [docType, setDocType] = useState('DWG');
  const [dateStr, setDateStr] = useState('14050505');
  const [revision, setRevision] = useState('R01');

  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([
    '653-B1-STR-DWG-14050505-R01',
    '184-ZA-ARQ-RPT-14050428-R00',
    '653-GEN-HSE-CHK-14050501-R02',
  ]);

  const generatedName = `${projectCode}-${blockZone}-${discipline}-${docType}-${dateStr}-${revision}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    if (!history.includes(generatedName)) {
      setHistory([generatedName, ...history.slice(0, 9)]);
    }
  };

  return (
    <div className="space-y-6 text-right">
      {/* Title Header */}
      <div className="bg-[#1F1F1F] text-white p-6 rounded-2xl border border-amber-500/30 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-[#F9C319]" />
            <h1 className="text-xl font-black text-white">ماژول نام‌گذاری خودکار فایل‌ها (File Naming Generator)</h1>
          </div>
          <p className="text-xs text-slate-300">
            تولید رشته کد یکپارچه اسناد فنی و نقشه طبق ماتریس کدگذاری فصل ۳ کتابچه OS
          </p>
        </div>
      </div>

      {/* Main Generator Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">۱. کد پروژه</label>
            <select
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319] font-mono"
            >
              <option value="653">۶۵۳ (صنعتی شمس‌آباد)</option>
              <option value="184">۱۸۴ (برج‌های هامون)</option>
              <option value="201">۲۰۱ (البرز)</option>
              <option value="GEN">GEN (عمومی شرکت)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">۲. بلوک / زون</label>
            <input
              type="text"
              value={blockZone}
              onChange={(e) => setBlockZone(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319] font-mono text-center uppercase"
              placeholder="مثلا: B1 یا ZA"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">۳. دیسیپلین فنی</label>
            <select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319] font-mono"
            >
              <option value="STR">STR (سازه)</option>
              <option value="ARQ">ARQ (معماری)</option>
              <option value="MEP">MEP (تاسیسات)</option>
              <option value="GEO">GEO (ژئوتکنیک)</option>
              <option value="HSE">HSE (ایمنی)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">۴. نوع سند</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319] font-mono"
            >
              <option value="DWG">DWG (نقشه اجرایی)</option>
              <option value="RPT">RPT (گزارش فنی)</option>
              <option value="CHK">CHK (چک‌لیست)</option>
              <option value="SPC">SPC (مشخصات فنی)</option>
              <option value="MIN">MIN (صورت‌جلسه)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">۵. تاریخ ثبت (YYMMDD)</label>
            <input
              type="text"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319] font-mono text-center"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">۶. شماره ویرایش (Rev)</label>
            <select
              value={revision}
              onChange={(e) => setRevision(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319] font-mono"
            >
              <option value="R00">R00 (نسخه اول)</option>
              <option value="R01">R01 (ویرایش ۱)</option>
              <option value="R02">R02 (ویرایش ۲)</option>
              <option value="R03">R03 (ویرایش ۳)</option>
            </select>
          </div>
        </div>

        {/* Output String Card */}
        <div className="p-5 bg-slate-900 text-white rounded-2xl border-2 border-[#F9C319] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-[#F9C319] font-bold block mb-1">نام فایل خروجی طبق فرمول OS:</span>
            <code className="text-lg sm:text-2xl font-black font-mono text-amber-300 dir-ltr text-left inline-block">
              {generatedName}
            </code>
          </div>

          <button
            onClick={handleCopy}
            className="px-6 py-3 rounded-xl bg-[#F9C319] hover:bg-amber-400 text-[#1F1F1F] font-black text-xs sm:text-sm flex items-center gap-2 transition shadow-md cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'کپی شد!' : 'کپی نام فایل'}</span>
          </button>
        </div>
      </div>

      {/* History Log */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
        <h3 className="font-bold text-slate-900 text-xs">سوابق نام‌های تولیدشده اخیر:</h3>
        <div className="space-y-1.5 font-mono text-xs">
          {history.map((item, idx) => (
            <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
              <code className="font-bold text-slate-800 dir-ltr">{item}</code>
              <button
                onClick={() => navigator.clipboard.writeText(item)}
                className="text-[11px] text-amber-700 hover:underline font-sans cursor-pointer"
              >
                کپی
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
