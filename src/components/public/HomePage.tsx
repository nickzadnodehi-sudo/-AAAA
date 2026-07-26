import React from 'react';
import { PublicTab } from '../../types';
import { COMPANY_STATS, PORTFOLIO_PROJECTS } from '../../data/corporateData';
import {
  Building2,
  ShieldCheck,
  Award,
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
  BookOpen,
  ChevronLeft,
  Sparkles,
  Layers,
  HardHat,
  Ruler,
} from 'lucide-react';

interface HomePageProps {
  onSelectPublicTab: (tab: PublicTab) => void;
  onOpenLoginModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectPublicTab, onOpenLoginModal }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-[#0a0a0a] text-white pt-16 pb-24 md:py-32 overflow-hidden border-b border-white/10">
        {/* Geometric Background Accents */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(var(--color-akph-yellow) 1px, transparent 1px), linear-gradient(90deg, var(--color-akph-yellow) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-akph-yellow/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Right Column (Text Content in RTL) */}
            <div className="lg:col-span-7 space-y-8 text-right">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight text-white tracking-tighter drop-shadow-xl">
                فردا را <br />
                <span className="text-akph-yellow relative inline-block mt-3">
                  امروز می‌سازیم
                  <div className="absolute -bottom-3 right-0 w-24 h-1 bg-akph-yellow shadow-[0_0_15px_rgba(254,203,0,0.5)]"></div>
                </span>
              </h1>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light max-w-2xl">
                <strong className="text-white font-bold">آریا کاوش پی هامون</strong>، با تکیه بر دانش فنی، مدیریت نظام‌مند پروژه و استقرار استانداردهای یکپارچه، پروژه‌های عمرانی و صنعتی را با رویکردی دقیق، مسئولانه و قابل‌اعتماد مدیریت و اجرا می‌کند.
              </p>

              {/* Call To Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-6">
                <button
                  onClick={() => onSelectPublicTab('portfolio')}
                  className="px-8 py-4 rounded-none bg-akph-yellow hover:bg-white text-akph-dark font-black text-sm flex items-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(254,203,0,0.2)] cursor-pointer"
                >
                  <Building2 className="w-5 h-5" />
                  <span className="tracking-wide">مشاهده پروژه‌ها</span>
                </button>

                <button
                  onClick={() => onSelectPublicTab('about')}
                  className="px-8 py-4 rounded-none bg-transparent hover:bg-white/5 border border-white/30 hover:border-white text-white font-bold text-sm flex items-center gap-3 transition-all duration-300 cursor-pointer"
                >
                  <span className="tracking-wide">آشنایی با شرکت</span>
                  <ArrowLeft className="w-4 h-4 text-akph-yellow" />
                </button>
              </div>
            </div>

            {/* Left Column (Featured Banner Image) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto rounded-none overflow-hidden shadow-2xl bg-[#0a0a0a] group">
                <img
                  src="/hero-1.png"
                  alt="پروژه ساختمانی آریا کاوش پی هامون"
                  className="w-full h-[400px] sm:h-[500px] object-cover transform group-hover:scale-105 transition duration-1000 opacity-80 mix-blend-luminosity grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 text-right">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-akph-yellow animate-pulse"></div>
                    <span className="text-akph-yellow text-[10px] font-black uppercase tracking-[0.2em]">
                      پروژه شاخص در حال اجرا
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 drop-shadow-md">برج‌های تجاری - اداری هامون</h3>
                  <p className="text-sm text-gray-300 font-medium">زیربنا: ۵۸,۰۰۰ مترمربع | اسکلت فلزی ۲۸ طبقه</p>
                </div>
                {/* Refined Geometric Decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-akph-yellow pointer-events-none z-20 m-4 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white pointer-events-none z-20 m-4 opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Short Intro Bar */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-1 bg-akph-yellow mx-auto mb-6"></div>
          <h2 className="text-3xl sm:text-4xl font-black text-akph-dark tracking-tight">مهندسی فراتر از اجرا</h2>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-light">
            در نگاه ما، پروژه موفق تنها یک سازه تکمیل‌شده نیست؛ بلکه نتیجه‌ی برنامه‌ریزی دقیق، هماهنگی میان واحدهای فنی و اجرایی، کنترل کیفیت مستمر و مستندسازی منظم است.
          </p>
        </div>
      </section>

      {/* Corporate Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">اعتبار، حاصل تداوم و نظم است</h2>
          <p className="text-base text-slate-500 leading-relaxed font-light">
            از مدیریت پروژه تا مهندسی، از کارگاه تا بایگانی، همه چیز در یک نظام یکپارچه پیش می‌رود؛ سیستمی که بر شفافیت، کنترل، پاسخ‌گویی و بهبود مستمر استوار است.
          </p>
        </div>
        <div className="bg-[#0a0a0a] text-white rounded-none p-10 sm:p-16 shadow-2xl relative z-20 border-t-2 border-akph-yellow overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-white/10 relative z-10">
            {COMPANY_STATS.map((stat, idx) => (
              <div key={idx} className="pt-6 lg:pt-0 text-center px-4 relative group">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-akph-yellow to-yellow-600 font-mono tracking-tighter drop-shadow-sm mb-4">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-bold text-white uppercase tracking-widest">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-2 font-light">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Disciplines & Services */}
      <section className="bg-akph-gray py-24 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">خدمات مهندسی و اجرایی</h2>
            <p className="text-base text-slate-500 leading-relaxed font-light">
              آریا کاوش پی هامون خدمات خود را در قالب یک زنجیره منسجم مهندسی ارائه می‌کند؛ از برنامه‌ریزی و تأمین تا اجرا، کنترل و تحویل نهایی. هدف ما ایجاد تجربه‌ای حرفه‌ای، روشن و قابل‌اتکا برای کارفرماست.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            <div className="bg-white p-8 rounded-none border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 space-y-6 text-right group">
              <div className="w-14 h-14 bg-gray-50 border border-gray-100 text-akph-dark flex items-center justify-center group-hover:bg-akph-yellow transition-colors duration-500">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-xl mb-3">مدیریت پیمان</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  هدایت و یکپارچه‌سازی پروژه با تمرکز بر زمان، هزینه و کیفیت.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-none border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 space-y-6 text-right group">
              <div className="w-14 h-14 bg-gray-50 border border-gray-100 text-akph-dark flex items-center justify-center group-hover:bg-akph-yellow transition-colors duration-500">
                <HardHat className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-xl mb-3">اجرای پروژه‌های عمرانی</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  اجرای دقیق و کنترل‌شده در پروژه‌های ساختمانی و صنعتی.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-none border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 space-y-6 text-right group">
              <div className="w-14 h-14 bg-gray-50 border border-gray-100 text-akph-dark flex items-center justify-center group-hover:bg-akph-yellow transition-colors duration-500">
                <Ruler className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-xl mb-3">مهندسی و پشتیبانی فنی</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  بررسی، تطبیق و صحه‌گذاری نقشه‌ها، رفع مغایرت‌ها و پشتیبانی اجرایی.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-none border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 space-y-6 text-right group">
              <div className="w-14 h-14 bg-gray-50 border border-gray-100 text-akph-dark flex items-center justify-center group-hover:bg-akph-yellow transition-colors duration-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-xl mb-3">کنترل کیفیت و HSE</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  پایش مستمر کیفیت، ایمنی و الزامات محیط‌زیستی در تمام مراحل اجرا.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-none border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 space-y-6 text-right group">
              <div className="w-14 h-14 bg-gray-50 border border-gray-100 text-akph-dark flex items-center justify-center group-hover:bg-akph-yellow transition-colors duration-500">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-xl mb-3">مدیریت مستندات و آرشیو</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  کنترل، نسخه‌بندی، بایگانی و بازیابی اسناد بر اساس نظام کدگذاری و پوشه‌بندی شرکت.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-right">
        <div className="bg-white p-12 sm:p-16 shadow-[0_10px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-akph-dark tracking-tight">آنچه ما را متمایز می‌کند</h2>
            <div className="w-12 h-1 bg-akph-yellow"></div>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-light">
              ما پروژه‌ها را فقط اجرا نمی‌کنیم؛ آن‌ها را مدیریت، کنترل و ثبت می‌کنیم. هر پروژه برای ما یک فرآیند دقیق، قابل‌ردیابی و قابل‌بهبود است. نظم سازمانی، مستندسازی و کنترل کیفیت در تمام لایه‌های شرکت جریان دارد.
            </p>
          </div>
          <div className="flex-1">
            <ul className="grid grid-cols-1 gap-6">
              {[
                'اجرای پروژه با رویکرد فرآیندمحور',
                'کنترل کیفیت در تمام مراحل کار',
                'پایبندی به اصول ایمنی و محیط‌زیست',
                'مدیریت یکپارچه اسناد و اطلاعات',
                'هماهنگی مؤثر میان ستاد و کارگاه',
                'بهبود مستمر و درس‌آموخته‌های سازمانی'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-base text-slate-700 font-medium">
                  <div className="w-8 h-8 rounded-none bg-akph-yellow/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-akph-yellow" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Projects Highlight */}
      <section className="bg-white py-24 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-b border-gray-100 pb-6">
            <div className="text-right space-y-4 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-black text-akph-dark tracking-tight">پروژه‌ها، روایت دقت در اجرا</h2>
              <p className="text-base text-gray-500 leading-relaxed font-light">
                از مرحله برنامه‌ریزی و تأمین تا اجرا و تحویل نهایی، تمام اطلاعات به‌صورت ساختارمند ثبت می‌شود تا تصمیم‌گیری‌ها بر پایه داده و مستندات معتبر انجام گیرد.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <button
                onClick={() => onSelectPublicTab('portfolio')}
                className="px-8 py-4 rounded-none bg-[#0a0a0a] text-white font-bold text-sm hover:bg-black transition-colors flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>مشاهده همه پروژه‌ها</span>
                <ChevronLeft className="w-4 h-4 text-akph-yellow" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_PROJECTS.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="bg-white border border-gray-100 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col text-right group"
              >
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-90 transition duration-700 grayscale-[20%] group-hover:grayscale-0"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#1F1F1F] text-[#F9C319] text-[10px] font-bold">
                    {project.type}
                  </span>
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">{project.title}</h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>زیربنا: {project.area}</span>
                    <span>موقعیت: {project.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OS Book Banner Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-[#0a0a0a] text-white p-10 sm:p-16 rounded-none border-t-4 border-akph-yellow shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700" 
               style={{ backgroundImage: 'linear-gradient(45deg, #fecb00 25%, transparent 25%, transparent 75%, #fecb00 75%, #fecb00), linear-gradient(45deg, #fecb00 25%, transparent 25%, transparent 75%, #fecb00 75%, #fecb00)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px' }} />
          
          <div className="space-y-6 text-right max-w-2xl relative z-10">
            <h3 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">سیستم عملکرد سازمان</h3>
            <div className="w-16 h-1 bg-akph-yellow"></div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
              کتابچه سیستم عملکرد سازمان، مرجع اجرایی و آموزشی شرکت است و با هدف استانداردسازی رویه‌ها، یکپارچه‌سازی مستندات، ایجاد نظم در فرآیندها و استقرار بهبود مستمر تدوین شده است.
            </p>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light">
              در این سیستم، کیفیت تنها نتیجه نهایی نیست؛ بلکه در تمام مراحل برنامه‌ریزی، اجرا، کنترل، ممیزی داخلی، بازنگری مدیریت و مدیریت ریسک حضور دارد. همین رویکرد، ستون اصلی انسجام سازمانی و تمایز حرفه‌ای شرکت است.
            </p>
          </div>
          <button
            onClick={() => onSelectPublicTab('os_standards')}
            className="relative z-10 px-8 py-5 rounded-none bg-akph-yellow hover:bg-white text-akph-dark font-black text-base shrink-0 transition-all duration-300 shadow-[0_0_20px_rgba(254,203,0,0.15)] cursor-pointer flex items-center gap-3"
          >
            <span>مطالعه نظام OS</span>
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Portal Intro */}
      <section className="bg-white py-24 mt-24 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="w-16 h-1 bg-akph-yellow mx-auto"></div>
          <h2 className="text-3xl sm:text-5xl font-black text-akph-dark tracking-tight">ورود اعضا به فضای کار یکپارچه</h2>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-light max-w-3xl mx-auto">
            پورتال اعضا برای یکپارچه‌سازی فرایندهای داخلی شرکت طراحی شده است؛ فضایی امن برای دسترسی به فرم‌ها، گزارش‌ها، کتابچه OS، گردش کار اداری و ابزارهای اجرایی.
          </p>
          <div className="text-sm font-medium text-gray-600 max-w-lg mx-auto bg-gray-50 p-4 border border-gray-100">
            از فرم‌های کارگاهی تا نامه‌ها و تنخواه، همه چیز در یک محیط امن و ساختارمند مدیریت می‌شود.
          </div>
          <div className="pt-6">
            <button
              onClick={onOpenLoginModal}
              className="px-10 py-5 rounded-none bg-[#0a0a0a] hover:bg-black text-white font-black text-base transition-all shadow-[0_10px_40px_rgba(0,0,0,0.1)] cursor-pointer inline-flex items-center gap-3"
            >
              <ShieldCheck className="w-5 h-5 text-akph-yellow" />
              <span>ورود به پورتال سازمانی</span>
            </button>
          </div>
        </div>
      </section>

      {/* News & Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24 text-right">
        <div className="space-y-6 max-w-3xl border-r-4 border-akph-yellow pr-8 py-2">
          <h2 className="text-3xl sm:text-4xl font-black text-akph-dark tracking-tight">روایت پیشرفت، گزارش فنی، تجربه اجرایی</h2>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-light">
            در این بخش، گزارش‌های پیشرفت پروژه‌ها، مطالب فنی-مهندسی و درس‌آموخته‌های سازمانی منتشر می‌شود. هدف این بخش، تنها اطلاع‌رسانی نیست؛ بلکه تقویت حافظه سازمانی و انتقال تجربه در کل مجموعه است.
          </p>
          <button
            onClick={() => onSelectPublicTab('blog')}
            className="mt-6 px-8 py-4 rounded-none bg-transparent hover:bg-gray-50 text-akph-dark font-bold text-sm transition-colors inline-flex items-center gap-3 cursor-pointer border border-gray-200"
          >
            <span>مشاهده اخبار و مقالات</span>
            <ChevronLeft className="w-4 h-4 text-akph-yellow" />
          </button>
        </div>
      </section>

      {/* Contact Us */}
      <section className="bg-[#0a0a0a] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">در ارتباط باشیم</h2>
          <div className="w-12 h-1 bg-akph-yellow mx-auto"></div>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light max-w-3xl mx-auto">
            برای دریافت اطلاعات بیشتر درباره خدمات، پروژه‌ها یا همکاری با شرکت، می‌توانید از طریق اطلاعات تماس، فرم ارتباطی یا مسیرهای معرفی‌شده در سایت با ما در ارتباط باشید.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <button
              onClick={() => onSelectPublicTab('contact')}
              className="px-8 py-4 rounded-none bg-akph-yellow text-akph-dark font-bold text-sm hover:bg-white transition-colors cursor-pointer"
            >
              تماس با ما
            </button>
            <button
              onClick={() => onSelectPublicTab('contact')}
              className="px-8 py-4 rounded-none bg-transparent text-white border border-white/30 font-bold text-sm hover:bg-white/10 transition-colors cursor-pointer"
            >
              دریافت مشاوره
            </button>
            <button
              onClick={() => onSelectPublicTab('contact')}
              className="px-8 py-4 rounded-none bg-transparent text-white border border-white/30 font-bold text-sm hover:bg-white/10 transition-colors cursor-pointer"
            >
              موقعیت دفاتر و کارگاه‌ها
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
