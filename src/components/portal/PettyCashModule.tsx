import React, { useState } from 'react';
import { PettyCashExpense, UserProfile } from '../../types';
import { INITIAL_PETTY_CASH } from '../../data/corporateData';
import { Coins, Plus, CheckCircle2, Clock, AlertCircle, FileSpreadsheet, Download, Image as ImageIcon, ShieldCheck, ArrowRight } from 'lucide-react';

interface PettyCashModuleProps {
  currentUser: UserProfile;
  pettyCashList: PettyCashExpense[];
  onUpdateList: (newList: PettyCashExpense[]) => void;
}

export const PettyCashModule: React.FC<PettyCashModuleProps> = ({
  currentUser,
  pettyCashList,
  onUpdateList,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'new'>('list');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Form State
  const [projectCode, setProjectCode] = useState('653');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number>(5000000);
  const [category, setCategory] = useState('خرید مصالح خرد');
  const [notes, setNotes] = useState('');

  // Total Balance Calculation
  const totalApproved = pettyCashList
    .filter((p) => p.status === 'approved')
    .reduce((sum, p) => sum + p.amount, 0);

  const initialBudget = 100000000; // 100 Million Toman
  const remainingBalance = initialBudget - totalApproved;

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newItem: PettyCashExpense = {
      id: `pc-${Date.now().toString().slice(-3)}`,
      projectCode,
      title,
      amount,
      category,
      date: '۱۴۰۵/۰۵/۰۵',
      submittedBy: currentUser.name,
      status: 'pending',
      notes,
    };

    onUpdateList([newItem, ...pettyCashList]);
    setTitle('');
    setNotes('');
    setActiveTab('list');
  };

  const handleStatusChange = (id: string, newStatus: PettyCashExpense['status']) => {
    const updated = pettyCashList.map((p) => (p.id === id ? { ...p, status: newStatus } : p));
    onUpdateList(updated);
  };

  const filteredList = pettyCashList.filter((p) => {
    if (filterStatus === 'all') return true;
    return p.status === filterStatus;
  });

  return (
    <div className="space-y-6 text-right">
      {/* Module Title Header */}
      <div className="bg-[#1F1F1F] text-white p-6 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#F9C319]" />
            <h1 className="text-xl font-black text-white">ماژول تنخواه‌گردان و حسابداری کارگاه (Petty Cash Tracker)</h1>
          </div>
          <p className="text-xs text-slate-300">
            ثبت فاکتورهای خرد، گردش کار تایید دو مرحله‌ای (حسابدار و مدیر) و گزارش‌گیری مالی
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'list' ? 'bg-[#F9C319] text-[#1F1F1F]' : 'bg-[#2B2B2B] text-slate-300'
            }`}
          >
            لیست هزینه‌ها
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'new' ? 'bg-[#F9C319] text-[#1F1F1F]' : 'bg-[#2B2B2B] text-slate-300'
            }`}
          >
            <Plus className="w-4 h-4" />
            ثبت هزینه جدید
          </button>
        </div>
      </div>

      {/* Balance Statistics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 block">سقف بودجه تنخواه اولیه</span>
          <span className="text-xl font-black text-slate-900 font-mono">
            {initialBudget.toLocaleString('fa-IR')} تومان
          </span>
          <span className="text-[11px] text-slate-400 block">مصوب مدیریت مالی</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 block">جمع هزینه‌کردهای تاییدشده</span>
          <span className="text-xl font-black text-rose-600 font-mono">
            {totalApproved.toLocaleString('fa-IR')} تومان
          </span>
          <span className="text-[11px] text-rose-600 font-bold block">پرداخت قطعی</span>
        </div>

        <div className="bg-gradient-to-r from-[#1F1F1F] to-[#2B2B2B] text-white p-5 rounded-2xl border border-amber-500/30 shadow-md space-y-1">
          <span className="text-xs text-amber-300 block font-bold">مانده تنخواه موجود کارگاه</span>
          <span className="text-xl font-black text-[#F9C319] font-mono">
            {remainingBalance.toLocaleString('fa-IR')} تومان
          </span>
          <span className="text-[11px] text-slate-300 block">قابل مصرف جهت خریدهای جدید</span>
        </div>
      </div>

      {/* Main List */}
      {activeTab === 'list' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
            <h2 className="font-extrabold text-slate-900 text-sm">لیست هزینه‌کردهای ثبت‌شده</h2>

            {/* Filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">فیلتر وضعیت:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F9C319]"
              >
                <option value="all">همه موارد</option>
                <option value="pending">در انتظار تایید اول (پندینگ)</option>
                <option value="verified_accountant">تاییدشده توسط حسابدار</option>
                <option value="approved">تایید نهایی مدیریت</option>
              </select>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredList.map((item) => (
              <div key={item.id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-[#F9C319] font-mono text-[10px] font-bold">
                      پروژه {item.projectCode}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                  </div>

                  <p className="text-slate-500">
                    دسته: {item.category} | ثبت توسط: {item.submittedBy} | تاریخ: {item.date}
                  </p>

                  {item.notes && <p className="text-slate-600 bg-slate-50 p-2 rounded text-[11px]">{item.notes}</p>}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-left font-mono">
                    <span className="font-black text-slate-900 text-base">{item.amount.toLocaleString('fa-IR')}</span>
                    <span className="text-[10px] text-slate-500 mr-1">تومان</span>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {item.status === 'pending' && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        ثبت‌شده (منتظر حسابدار)
                      </span>
                    )}
                    {item.status === 'verified_accountant' && (
                      <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        تایید حسابدار (منتظر مدیر)
                      </span>
                    )}
                    {item.status === 'approved' && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        تایید نهایی پرداخت
                      </span>
                    )}
                  </div>

                  {/* Workflow Approval Actions based on user role */}
                  <div className="flex items-center gap-1">
                    {(currentUser.role === 'accountant' || currentUser.role === 'admin') && item.status === 'pending' && (
                      <button
                        onClick={() => handleStatusChange(item.id, 'verified_accountant')}
                        className="px-2.5 py-1 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition cursor-pointer"
                      >
                        تایید حسابدار ➔
                      </button>
                    )}

                    {(currentUser.role === 'admin') && item.status === 'verified_accountant' && (
                      <button
                        onClick={() => handleStatusChange(item.id, 'approved')}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition cursor-pointer"
                      >
                        تایید نهایی مدیر ➔
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Expense Form */}
      {activeTab === 'new' && (
        <form onSubmit={handleAddExpense} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs text-right">
          <h2 className="text-base font-black text-slate-900 border-r-4 border-[#F9C319] pr-3">ثبت فاکتور/هزینه تنخواه کارگاه</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">کد پروژه</label>
              <select
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319]"
              >
                <option value="653">۶۵۳ (صنعتی شمس‌آباد)</option>
                <option value="184">۱۸۴ (برج‌های هامون)</option>
                <option value="201">۲۰۱ (البرز)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">شرح هزینه</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: خرید سیم مفتول و آرماتوربندی"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">مبلغ به تومان</label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319] font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">دسته هزینه</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319]"
              >
                <option value="خرید مصالح خرد">خرید مصالح خرد</option>
                <option value="سوخت و انرژی">سوخت و انرژی</option>
                <option value="پذیرایی و تشریفات">پذیرایی و تشریفات</option>
                <option value="حمل و نقل">حمل و نقل</option>
                <option value="تعمیرات ابزار">تعمیرات ابزار و ماشین‌آلات</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">توضیحات و شماره رسید فاکتور</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="توضیحات تکمیلی برای حسابدار..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#F9C319] hover:bg-amber-400 text-[#1F1F1F] font-black text-sm rounded-xl transition shadow-md cursor-pointer"
          >
            ثبت در گردش کار تنخواه
          </button>
        </form>
      )}
    </div>
  );
};
