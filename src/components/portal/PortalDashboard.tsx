import React from 'react';
import { PortalModule, UserProfile, PettyCashExpense, DailySiteReport } from '../../types';
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Coins,
  FileCode2,
  BookOpen,
  ArrowLeft,
  Bell,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

interface PortalDashboardProps {
  currentUser: UserProfile;
  onSelectModule: (mod: PortalModule) => void;
  pettyCashList: PettyCashExpense[];
  dailyReportsList: DailySiteReport[];
}

export const PortalDashboard: React.FC<PortalDashboardProps> = ({
  currentUser,
  onSelectModule,
  pettyCashList,
  dailyReportsList,
}) => {
  const pendingPettyCashCount = pettyCashList.filter((p) => p.status === 'pending' || p.status === 'verified_accountant').length;

  return (
    <div className="space-y-8 text-right">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1F1F1F] via-[#2B2B2B] to-[#1F1F1F] text-white p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B2B2B] text-amber-300 text-xs font-bold border border-[#F9C319]/30">
            <span>سامانه اتوماسیون سازمانی AKPH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            خوش آمدید، {currentUser.name}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            شما با نقش <strong className="text-[#F9C319]">{currentUser.roleLabel}</strong> وارد اتوماسیون شده‌اید. تمامی عملیات طبق کتابچه استانداردهای OS مدیریت می‌شوند.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono">
            {new Date().toLocaleDateString('fa-IR')}
          </span>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block">نامه‌های ثبت‌شده امروز</span>
            <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">۱۲ نامه</span>
            <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">دارای QR کد اصالت</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block">درخواست‌های تنخواه در انتظار</span>
            <span className="text-2xl font-black text-amber-600 font-mono mt-1 block">{pendingPettyCashCount} مورد</span>
            <span className="text-[11px] text-slate-500 mt-1 inline-block">نیازمند تایید مرحله‌ای</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <Coins className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block">گزارش روزانه کارگاه</span>
            <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">{dailyReportsList.length} ثبت شده</span>
            <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">پروژه ۱۸۴ و ۶۵۳</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
            <ClipboardList className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block">انطباق با کتابچه OS</span>
            <span className="text-2xl font-black text-emerald-600 font-mono mt-1 block">۱۰۰٪</span>
            <span className="text-[11px] text-emerald-700 font-bold mt-1 inline-block">Rev 2.1 فعال است</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Module Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 border-r-4 border-[#F9C319] pr-3">
          میان‌برهای سریع ماژول‌های هوشمند
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            onClick={() => onSelectModule('letter_generator')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition cursor-pointer group text-right space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-amber-600 group-hover:translate-x-[-4px] transition">
                ورود به ماژول ⬅
              </span>
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">ماژول تولید نامه و اندیکاتور</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ثبت نامه اداری، شماره‌گذاری اتوماتیک در دفتر اندیکاتور، چاپ در سربرگ رسمی با مهر/امضا و QR کد.
            </p>
          </div>

          <div
            onClick={() => onSelectModule('daily_report')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition cursor-pointer group text-right space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <ClipboardList className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-blue-600 group-hover:translate-x-[-4px] transition">
                ورود به ماژول ⬅
              </span>
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">گزارش روزانه کارگاه و چک‌لیست</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ثبت تعداد کارگران، ماشین‌آلات، وضعیت جوی، موانع اجرایی و چک‌لیست‌های کنترل کیفیت بتن.
            </p>
          </div>

          <div
            onClick={() => onSelectModule('petty_cash')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition cursor-pointer group text-right space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <Coins className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-[-4px] transition">
                ورود به ماژول ⬅
              </span>
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">تنخواه‌گردان و حسابداری کارگاه</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ثبت هزینه‌های تنخواه، آپلود عکس رسید/فاکتور و گردش کار تایید دو مرحله‌ای توسط حسابدار و مدیر.
            </p>
          </div>

          <div
            onClick={() => onSelectModule('file_naming')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition cursor-pointer group text-right space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                <FileCode2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-purple-600 group-hover:translate-x-[-4px] transition">
                ورود به ماژول ⬅
              </span>
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">نام‌گذاری خودکار فایل‌ها</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              تولید کدهای استاندارد فایل‌ها طبق ماتریس [پروژه-بلوک-دیسیپلین-نوع-تاریخ-ویرایش].
            </p>
          </div>

          <div
            onClick={() => onSelectModule('os_book')}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition cursor-pointer group text-right space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#1F1F1F] text-[#F9C319] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:translate-x-[-4px] transition">
                ورود به ماژول ⬅
              </span>
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">کتابچه آنلاین استانداردهای OS</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              جستجوی هوشمند در تمام بندها، آیین‌نامه‌های اجرایی، ایمنی HSE و سوابق نسخه اسناد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
