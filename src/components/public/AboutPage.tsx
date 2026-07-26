import React from 'react';
import { Building2, Award, ShieldCheck, CheckCircle2, Users, FileText } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-right">
      {/* Page Header */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase">درباره شرکت</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">شرکت آریا کاوش پی هامون (AKPH)</h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          بیست و پنج سال تلاش مستمر در مسیر توسعه زیرساخت‌های مهندسی، انضباط در اجرا و ارتقای کیفیت ساخت‌وساز کشور.
        </p>
      </div>

      {/* History & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900 border-r-4 border-[#F9C319] pr-3">تاریخچه و ماموریت</h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            شرکت آریا کاوش پی هامون در سال ۱۳۸۰ با هدف ارائه خدمات تخصصی در زمینه‌های طراحی، محاسبات سازه، مدیریت پیمان و اجرای پروژه‌های عمرانی تأسیس گردید. این شرکت با تکیه بر دانش فنی مهندسان مجرب و پیاده‌سازی سیستم‌های مدرن مدیریت کیفیت، موفق به اخذ رتبه پایه ۱ ارشد از سازمان نظام مهندسی کشور شده است.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            ماموریت اصلی ما، خلق ارزش پایدار برای کارفرمایان از طریق اجرای ایمن، سریع و مطابق با استانداردهای نظام کیفیت OS است.
          </p>
        </div>

        <div className="bg-[#1F1F1F] text-white p-8 rounded-2xl border border-slate-700 shadow-xl space-y-4">
          <h2 className="text-xl font-extrabold text-[#F9C319] border-r-4 border-[#F9C319] pr-3">چشم‌انداز سازمانی</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#F9C319] shrink-0 mt-0.5" />
              <span>پیشگامی در هوشمندسازی و دیجیتالی‌سازی فرایندهای کارگاهی و اتوماسیون اسناد</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#F9C319] shrink-0 mt-0.5" />
              <span>تحقق خط‌مشی «صفر حادثه» در تمام پروژه‌های عمرانی تحت مدیریت</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#F9C319] shrink-0 mt-0.5" />
              <span>توسعه فناوری‌های بتن سخت و سازه‌های فلزی مقاوم در برابر زلزله شدید</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal Certificates & Standards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900">صلاحیت‌های قانونی و گواهی‌نامه‌ها</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-3">
            <Award className="w-10 h-10 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-sm">پایه ۱ ارشد نظام مهندسی</h3>
            <p className="text-xs text-slate-500">صلاحیت کامل در طراحی، محاسبات و اجرای پروژه‌های بزرگ</p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-3">
            <ShieldCheck className="w-10 h-10 text-emerald-500" />
            <h3 className="font-bold text-slate-900 text-sm">ISO 9001 : 2015</h3>
            <p className="text-xs text-slate-500">گواهی‌نامه بین‌المللی مدیریت کیفیت پروژه‌ها</p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-3">
            <FileText className="w-10 h-10 text-blue-500" />
            <h3 className="font-bold text-slate-900 text-sm">ISO 14001 & 45001</h3>
            <p className="text-xs text-slate-500">مدیریت محیط زیست و ایمنی شغلی (HSE-MS)</p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-3">
            <Building2 className="w-10 h-10 text-purple-500" />
            <h3 className="font-bold text-slate-900 text-sm">گواهینامه کتابچه OS</h3>
            <p className="text-xs text-slate-500">استاندارد اختصاصی انضباط کارگاهی شرکت AKPH</p>
          </div>
        </div>
      </div>

      {/* Board & Executives */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900">مدیران و ارکان ارشد شرکت</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-right">
            <div className="w-12 h-12 rounded-full bg-slate-900 text-[#F9C319] font-black text-lg flex items-center justify-center">
              ن
            </div>
            <h3 className="font-bold text-slate-900 text-base">مهندس نیک‌زاد نودهی</h3>
            <p className="text-xs text-amber-600 font-bold">مدیرعامل و عضو هیئت مدیره</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              ارشد مهندسی عمران - سازه، با بیش از ۲۰ سال سابقه مدیریت پروژه‌های بزرگ ملی و صنعتی.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-right">
            <div className="w-12 h-12 rounded-full bg-slate-900 text-[#F9C319] font-black text-lg flex items-center justify-center">
              ر
            </div>
            <h3 className="font-bold text-slate-900 text-base">مهندس علیرضا رضایی</h3>
            <p className="text-xs text-amber-600 font-bold">رئیس هیئت مدیره و مدیر عملیات</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              کارشناس ارشد مدیریت ساخت، سرپرست کارگاه پروژه‌های برج‌سازی و صنعتی.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-right">
            <div className="w-12 h-12 rounded-full bg-slate-900 text-[#F9C319] font-black text-lg flex items-center justify-center">
              ح
            </div>
            <h3 className="font-bold text-slate-900 text-base">سید محمد حسینی</h3>
            <p className="text-xs text-amber-600 font-bold">مدیر مالی و امور تنخواه</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              کارشناس ارشد حسابداری صنعتی، مسئول نظارت بر انضباط مالی و تنخواه‌گردان پروژه‌ها.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
