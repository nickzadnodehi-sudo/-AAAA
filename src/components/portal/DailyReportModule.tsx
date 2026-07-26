import React, { useState } from 'react';
import { DailySiteReport } from '../../types';
import { INITIAL_DAILY_REPORTS } from '../../data/corporateData';
import { ClipboardList, Plus, Printer, QrCode, CheckCircle2, AlertTriangle, Image as ImageIcon, FileCheck2, Camera } from 'lucide-react';

export const DailyReportModule: React.FC = () => {
  const [reports, setReports] = useState<DailySiteReport[]>(INITIAL_DAILY_REPORTS);
  const [activeTab, setActiveTab] = useState<'list' | 'new' | 'checklists'>('list');

  // Form State
  const [projectCode, setProjectCode] = useState('184');
  const [date, setDate] = useState('۱۴۰۵/۰۵/۰۵');
  const [weather, setWeather] = useState('صاف - آفتابی');
  const [temperature, setTemperature] = useState('۳۲ درجه سانتی‌گراد');
  const [siteManager, setSiteManager] = useState('مهندس علیرضا رضایی');
  const [contractorStaffCount, setContractorStaffCount] = useState(6);
  const [laborersCount, setLaborersCount] = useState(22);
  const [machineryCount, setMachineryCount] = useState(4);
  const [workExecuted, setWorkExecuted] = useState('مونتاژ قطعات فلزی اسکلت سوله و بستن خاموت‌های ستون‌های طبقه ۱۵.');
  const [issuesAndObstacles, setIssuesAndObstacles] = useState('تاخیر در ورود تراک سیمان.');
  const [safetyNote, setSafetyNote] = useState('کلیه پرسنل از کلاه و کفش ایمنی استفاده کردند. حادثه‌ای رخ نداده است.');

  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=600&q=80');

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    const newRep: DailySiteReport = {
      id: `rep-${Date.now().toString().slice(-3)}`,
      projectCode,
      date,
      weather,
      temperature,
      siteManager,
      contractorStaffCount,
      laborersCount,
      machineryCount,
      workExecuted,
      issuesAndObstacles,
      safetyNote,
      status: 'submitted',
      photos: [photoUrl],
      verificationCode: `DSR-1405-${projectCode}-${Math.floor(100 + Math.random() * 900)}`,
    };

    setReports([newRep, ...reports]);
    setActiveTab('list');
  };

  return (
    <div className="space-y-6 text-right">
      {/* Title Header */}
      <div className="bg-[#1F1F1F] text-white p-6 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-[#F9C319]" />
            <h1 className="text-xl font-black text-white">گزارش روزانه کارگاه و چک‌لیست‌های هوشمند (OS Daily Report)</h1>
          </div>
          <p className="text-xs text-slate-300">
            ثبت نیروهای انسانی، وضعیت ماشین‌آلات، جوی، احجام کار و خروجی رسمی همراه با QR کد
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'list' ? 'bg-[#F9C319] text-[#1F1F1F]' : 'bg-[#2B2B2B] text-slate-300'
            }`}
          >
            لیست گزارش‌ها ({reports.length})
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'new' ? 'bg-[#F9C319] text-[#1F1F1F]' : 'bg-[#2B2B2B] text-slate-300'
            }`}
          >
            <Plus className="w-4 h-4" />
            ثبت گزارش جدید
          </button>
          <button
            onClick={() => setActiveTab('checklists')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'checklists' ? 'bg-[#F9C319] text-[#1F1F1F]' : 'bg-[#2B2B2B] text-slate-300'
            }`}
          >
            چک‌لیست‌ها
          </button>
        </div>
      </div>

      {/* Tab 1: Reports List */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          {reports.map((rep) => (
            <div key={rep.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 text-right">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-[#1F1F1F] text-[#F9C319] font-black text-xs font-mono">
                    پروژه کد {rep.projectCode}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">تاریخ: {rep.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-800 text-xs font-mono font-bold flex items-center gap-1 border border-amber-500/30">
                    <QrCode className="w-3.5 h-3.5 text-amber-600" />
                    {rep.verificationCode}
                  </span>
                  <button
                    onClick={() => window.print()}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    چاپ
                  </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl text-xs text-slate-700">
                <div>سرپرست: <strong>{rep.siteManager}</strong></div>
                <div>کادر فنی: <strong>{rep.contractorStaffCount} نفر</strong></div>
                <div>کارگران: <strong>{rep.laborersCount} نفر</strong></div>
                <div>ماشین‌آلات: <strong>{rep.machineryCount} دستگاه</strong></div>
              </div>

              {/* Work Details */}
              <div className="space-y-2 text-xs text-slate-700">
                <div>
                  <strong className="text-slate-900 block mb-0.5">احجام کار اجرا شده:</strong>
                  <p className="bg-slate-50 p-2.5 rounded-lg leading-relaxed">{rep.workExecuted}</p>
                </div>
                {rep.issuesAndObstacles && (
                  <div>
                    <strong className="text-rose-700 block mb-0.5">موانع و تاخیرات کارگاهی:</strong>
                    <p className="bg-rose-50 p-2.5 rounded-lg leading-relaxed text-rose-900">{rep.issuesAndObstacles}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: New Report Form */}
      {activeTab === 'new' && (
        <form onSubmit={handleCreateReport} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs">
          <h2 className="text-base font-black text-slate-900 border-r-4 border-[#F9C319] pr-3">ثبت اطلاعات روزانه کارگاه</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">کد پروژه</label>
              <select
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319]"
              >
                <option value="184">۱۸۴ (برج‌های هامون)</option>
                <option value="653">۶۵۳ (صنعتی شمس‌آباد)</option>
                <option value="201">۲۰۱ (البرز)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">تاریخ گزارش</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319] font-mono text-center"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">نام سرپرست کارگاه</label>
              <input
                type="text"
                value={siteManager}
                onChange={(e) => setSiteManager(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">تعداد کادر مهندسی و دفتر فنی</label>
              <input
                type="number"
                value={contractorStaffCount}
                onChange={(e) => setContractorStaffCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319] font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">تعداد کارگران ساده و ماهر</label>
              <input
                type="number"
                value={laborersCount}
                onChange={(e) => setLaborersCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319] font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">تعداد ماشین‌آلات فعال</label>
              <input
                type="number"
                value={machineryCount}
                onChange={(e) => setMachineryCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">شرح عملیات اجرا شده</label>
            <textarea
              rows={3}
              value={workExecuted}
              onChange={(e) => setWorkExecuted(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319]"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">موانع، مشکلات و تاخیرات کارگاهی</label>
            <textarea
              rows={2}
              value={issuesAndObstacles}
              onChange={(e) => setIssuesAndObstacles(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#F9C319] hover:bg-amber-400 text-[#1F1F1F] font-black text-sm rounded-xl transition shadow-md cursor-pointer"
          >
            ثبت نهایی و صدور گزارش روزانه با QR کد
          </button>
        </form>
      )}

      {/* Tab 3: Checklists */}
      {activeTab === 'checklists' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs text-right">
          <h2 className="text-base font-black text-slate-900 border-r-4 border-[#F9C319] pr-3">
            چک‌لیست‌های هوشمند تحویل مصالح و کنترل کیفیت (QA/QC)
          </h2>
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">چک‌لیست قبل از بتن‌ریزی دال و ستون</h3>
                <p className="text-slate-600 text-[11px]">کنترل تمیزی کف، سپاسرها، فواصل خاموت‌ها و تجهیزات ویبراتور</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-bold">تایید کامل</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">چک‌لیست ایمنی و داربست‌بندی کارگاه (HSE)</h3>
                <p className="text-slate-600 text-[11px]">کنترل مهاربندی‌ها، تخته‌های کار در ارتفاع و تورهای ایمنی</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-bold">تایید کامل</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
