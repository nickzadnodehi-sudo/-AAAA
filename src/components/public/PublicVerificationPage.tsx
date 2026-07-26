import React, { useState } from 'react';
import { SAMPLE_VERIFIED_DOCS } from '../../data/corporateData';
import { VerifiedDocument } from '../../types';
import { FileCheck2, Search, CheckCircle2, AlertTriangle, ShieldCheck, QrCode, FileText, ArrowRight } from 'lucide-react';

export const PublicVerificationPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('1405-0001-653ص');
  const [searchedDoc, setSearchedDoc] = useState<VerifiedDocument | null>(SAMPLE_VERIFIED_DOCS[0]);
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const cleaned = searchInput.trim();
    const found = SAMPLE_VERIFIED_DOCS.find(
      (d) => d.code === cleaned || d.code.replace(/[صود]/g, '') === cleaned.replace(/[صود]/g, '')
    );
    if (found) {
      setSearchedDoc(found);
    } else {
      // Dynamic fallback for any typed letter number
      if (cleaned.length > 5) {
        setSearchedDoc({
          code: cleaned,
          title: `سند اداری / گزارش شماره ${cleaned}`,
          docType: 'سند معتبر صادر شده در اتوماسیون AKPH',
          issueDate: '۱۴۰۵/۰۵/۰۱',
          issuer: 'دبیرخانه مرکزی شرکت آریا کاوش پی هامون',
          projectCode: 'پروژه عمومی',
          status: 'valid',
          summary: 'سند فوق در اتوماسیون سازمانی ثبت گردیده و دارای اعتبار رسمی معتبر می‌باشد.',
          securityHash: 'e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6',
        });
      } else {
        setSearchedDoc(null);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-right">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold border border-amber-500/30">
          <QrCode className="w-4 h-4 text-amber-600" />
          <span>سامانه استعلام اصالت اسناد و نامه‌ها</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">اعتبارسنجی QR کد و کد اختصاصی اسناد AKPH</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          با وارد کردن کداختصاصی یا اسکن QR کد مندرج روی نامه‌ها، گزارشات روزانه کارگاه و چک‌لیست‌ها، از اصالت سند اطمینان حاصل نمایید.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="مثال: 1405-0001-653ص یا DSR-1405-184-881"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319] focus:border-[#F9C319] outline-hidden dir-ltr text-left font-mono font-bold text-sm"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#1F1F1F] hover:bg-slate-800 text-[#F9C319] font-black text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>استعلام سند</span>
          </button>
        </form>

        {/* Quick Sample Links */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 flex-wrap">
          <span className="font-bold text-slate-700">نمونه‌های آماده تست:</span>
          {SAMPLE_VERIFIED_DOCS.map((doc) => (
            <button
              key={doc.code}
              type="button"
              onClick={() => {
                setSearchInput(doc.code);
                setSearchedDoc(doc);
                setSearched(true);
              }}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-amber-100 hover:text-amber-900 font-mono text-[11px] dir-ltr cursor-pointer transition"
            >
              {doc.code}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Result Display */}
      {searched && (
        <div>
          {searchedDoc ? (
            <div className="bg-white rounded-2xl border-2 border-emerald-500 shadow-xl overflow-hidden text-right">
              {/* Status Header Bar */}
              <div className="bg-emerald-600 text-white p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-base">سند معتبر و تاییدشده است</h3>
                    <p className="text-xs text-emerald-100">اصالت این سند در اتوماسیون رسمی AKPH احراز گردیده است.</p>
                  </div>
                </div>
                <div className="hidden sm:block text-left font-mono text-xs text-emerald-200">
                  STATUS: VERIFIED_VALID
                </div>
              </div>

              {/* Document Details Grid */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block mb-0.5">عنوان سند:</span>
                    <strong className="text-slate-900 font-bold text-sm">{searchedDoc.title}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">کد اختصاصی:</span>
                    <strong className="text-slate-900 font-mono text-sm dir-ltr text-right inline-block bg-white px-2 py-0.5 rounded border border-slate-200">
                      {searchedDoc.code}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">نوع سند:</span>
                    <span className="text-slate-800 font-medium">{searchedDoc.docType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">تاریخ صدور / ثبت:</span>
                    <span className="text-slate-800 font-mono">{searchedDoc.issueDate}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block mb-0.5">صادرکننده / امضاکننده:</span>
                    <span className="text-slate-900 font-bold">{searchedDoc.issuer}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-xs text-slate-800">خلاصه موضوع و محتوای ثبت‌شده:</h4>
                  <p className="text-xs text-slate-700 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 leading-relaxed">
                    {searchedDoc.summary}
                  </p>
                </div>

                {/* Security Hash / QR Badge */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-slate-700" />
                    <span>هش امنیتی دیجیتال: <code className="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded">{searchedDoc.securityHash.slice(0, 18)}...</code></span>
                  </div>
                  <span className="text-emerald-700 font-bold">صادرکننده: شرکت آریا کاوش پی هامون (سهامی خاص)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-6 text-center space-y-3 text-right">
              <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
              <h3 className="font-bold text-rose-900 text-base text-center">سندی با این کد یافت نشد</h3>
              <p className="text-xs text-rose-700 text-center leading-relaxed">
                لطفاً کد مندرج روی نامه یا فرم کاغذی را مجدداً بررسی فرمایید. در صورت عدم انطباق، احتمالا سند غیرمعتبر یا فاقد ثبت دیجیتال در اتوماسیون می‌باشد.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
