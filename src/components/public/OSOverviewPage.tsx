import React from 'react';
import { OS_CHAPTERS } from '../../data/corporateData';
import { BookOpen, CheckCircle2, ShieldCheck, FileCheck2 } from 'lucide-react';

export const OSOverviewPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-right">
      <div className="bg-[#1F1F1F] text-white p-8 rounded-3xl border border-amber-500/30 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
          <BookOpen className="w-4 h-4" />
          <span>کتابچه استانداردهای سازمانی OS</span>
        </div>
        <h1 className="text-3xl font-black text-[#F9C319]">چارچوب انضباط اجرایی و نظام کیفیت AKPH OS Book</h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          کتابچه OS (Organizational Standards) تدوین‌شده توسط تیم مهندسی آریا کاوش پی هامون، مجموعه ضوابط الزام‌آور در تمام کارگاه‌های ساختمانی جهت استانداردسازی کیفیت، ایمنی، مکاتبات اداری و اتوماسیون مالی است.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900">سرفصل‌ها و آیین‌نامه‌های مصوب کتابچه OS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OS_CHAPTERS.map((ch) => (
            <div key={ch.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="px-2.5 py-1 rounded bg-[#1F1F1F] text-[#F9C319] text-xs font-mono font-bold">
                  {ch.version}
                </span>
                <span className="text-xs text-slate-500 font-mono">آخرین ویرایش: {ch.lastUpdated}</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{ch.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ch.description}</p>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-slate-500">دستورالعمل‌های نمونه:</span>
                {ch.articles.map((art) => (
                  <div key={art.code} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{art.title}</span>
                      <span className="font-mono text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                        {art.code}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{art.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
