import React from 'react';
import { Building2, Ruler, ShieldCheck, HardHat, FileCheck, CheckCircle2 } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-right">
      <div className="space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase">خدمات مهندسی</span>
        <h1 className="text-3xl font-black text-slate-900">خدمات و دیسیپلین‌های تخصصی AKPH</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
          ارائه راهکارهای جامع فنی از فاز مطالعاتی تا تحویل قطعی پروژه‌های عمرانی.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">۱. مدیریت پیمان و اجرای ساختمانی (MC)</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            مدیریت فنی، مالی و اجرایی پروژه‌های ساختمانی با شفافیت کامل مالی و درصد حق‌الزحمه مشخص. کاهش هزینه‌های بالاسری با زنجیره تأمین مستقیم مصالح.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
            <Ruler className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">۲. محاسبات و تحلیل تخصصی سازه</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            طراحی و محاسبات سازه‌های فلزی پیچیده پیچ‌و‌مهره‌ای، اسکلت بتنی با دال‌های مجوف، شالوده‌های عمیق و بهینه‌سازی وزن فولاد مصرفی بر اساس مباحث مقررات ملی.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">۳. سیستم‌های کنترل کیفیت کارگاهی (QA/QC)</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            استقرار واحد آزمایشگاهی مقیم، آزمایش‌های غیرمخرب بتن و جوش، چک‌لیست‌های هوشمند تحویل مصالح و نظارت مستمر بر اجرای دقیق کتابچه OS.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
            <HardHat className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">۴. بهداشت، ایمنی و محیط زیست (HSE)</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            ارزیابی ریسک‌های ایمنی کارگاه، استقرار افسر ایمنی مقیم و اجرای الزامات سخت‌گیرانه برای صفر کردن حوادث کارگاهی.
          </p>
        </div>
      </div>
    </div>
  );
};
