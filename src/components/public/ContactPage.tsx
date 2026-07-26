import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-right">
      <div className="space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase">ارتباط با ما</span>
        <h1 className="text-3xl font-black text-slate-900">دفتر مرکزی و دفاتر کارگاهی شرکت AKPH</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
          جهت مشاوره پروژه‌ها، مناقصات و استعلام خدمات مهندسی با کارشناسان ما در ارتباط باشید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info & Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-extrabold text-slate-900 text-base border-r-4 border-[#F9C319] pr-3">دفتر مرکزی</h2>
            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  تهران، خیابان ولیعصر، بالاتر از ظفر، برج اداری هامون، طبقه ۹، واحد ۹۰۴
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="dir-ltr font-mono font-bold">۰۲۱ - ۸۸۷۷۶۶۵۵ / ۸۸۷۷۶۶۵۶</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="font-mono">info@akph-co.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                <span>شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰</span>
              </div>
            </div>
          </div>

          {/* Map Representation Box */}
          <div className="bg-slate-800 text-white p-6 rounded-2xl border border-slate-700 h-64 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-[#F9C319] text-[#1F1F1F] flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-white">موقعیت دفتر مرکزی روی نقشه</h3>
            <p className="text-xs text-slate-300">تهران، برج اداری هامون</p>
            <div className="absolute inset-0 bg-amber-500/5 pointer-events-none" />
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 border-r-4 border-[#F9C319] pr-3">فرم ارسال پیام و درخواست مشاوره</h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-900 text-base">پیام شما با موفقیت ثبت شد</h3>
              <p className="text-xs text-emerald-700">کارشناسان دفتر مرکزی در اسرع وقت با شما تماس خواهند گرفت.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition cursor-pointer"
              >
                ارسال پیام جدید
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">نام و نام خانوادگی / شرکت</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F9C319] outline-hidden"
                    placeholder="مثال: مهندس احمدی"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">شماره تماس</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F9C319] outline-hidden dir-ltr text-left font-mono"
                    placeholder="09123456789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">موضوع پیام</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F9C319] outline-hidden"
                  placeholder="مثال: استعلام خدمات مدیریت پیمان پروژه"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">متن پیام</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F9C319] outline-hidden"
                  placeholder="توضیحات مربوط به پروژه یا پیام خود را وارد نمایید..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#F9C319] hover:bg-amber-400 text-[#1F1F1F] font-black text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>ارسال پیام</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
