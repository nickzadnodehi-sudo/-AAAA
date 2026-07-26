import React from 'react';
import { PublicTab } from '../types';
import { Building2, Phone, Mail, MapPin, ShieldCheck, FileCheck2, ArrowLeft, ExternalLink } from 'lucide-react';

interface PublicFooterProps {
  onSelectPublicTab: (tab: PublicTab) => void;
  onOpenLoginModal: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({
  onSelectPublicTab,
  onOpenLoginModal,
}) => {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Geometric background hint */}
      <div className="absolute right-0 bottom-0 w-96 h-96 border-t border-l border-white/5 pointer-events-none transform translate-x-12 translate-y-12" />
      <div className="absolute left-0 top-0 w-64 h-64 bg-akph-yellow/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: About & Logo */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-none bg-white flex items-center justify-center shadow-lg border border-white/10 overflow-hidden">
                <img src="/logo.png" alt="AKPH Logo" className="w-full h-full object-contain p-1.5" />
              </div>
              <div>
                <h3 className="font-black text-white text-lg tracking-tight">آریا کاوش پی هامون</h3>
                <p className="text-[10px] text-akph-yellow font-mono tracking-widest uppercase mt-1">Arya Kavosh Pey Hamoon</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              مهندسی، نظم و اعتماد در مسیر اجرای پروژه‌ها.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="px-3 py-1.5 rounded-none bg-akph-yellow/10 text-akph-yellow border border-akph-yellow/20 text-[11px] font-bold tracking-wide">
                پایه ۱ ارشد نظام مهندسی
              </span>
              <span className="px-3 py-1.5 rounded-none bg-white/5 text-gray-300 border border-white/10 text-[11px] font-mono tracking-widest">
                ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-black text-white text-base mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-akph-yellow"></div>
              دسترسی سریع
            </h4>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <button
                  onClick={() => onSelectPublicTab('about')}
                  className="hover:text-akph-yellow transition-colors duration-300 flex items-center gap-2 cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-akph-yellow transition-colors duration-300" />
                  درباره شرکت و صلاحیت‌ها
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPublicTab('portfolio')}
                  className="hover:text-akph-yellow transition-colors duration-300 flex items-center gap-2 cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-akph-yellow transition-colors duration-300" />
                  پروژه‌های فاخر و نمونه‌کارها
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPublicTab('os_standards')}
                  className="hover:text-akph-yellow transition-colors duration-300 flex items-center gap-2 cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:text-akph-yellow transition-colors duration-300" />
                  کتابچه دستورالعمل‌های OS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPublicTab('verify')}
                  className="hover:text-akph-yellow transition-colors duration-300 flex items-center gap-2 cursor-pointer text-akph-yellow font-bold group"
                >
                  <FileCheck2 className="w-4 h-4 text-akph-yellow group-hover:scale-110 transition-transform duration-300" />
                  سامانه استعلام و اعتبارسنجی QR
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal & Security */}
          <div>
            <h4 className="font-black text-white text-base mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-akph-yellow"></div>
              پورتال سازمانی
            </h4>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed font-light">
              اعضای شرکت، سرپرستان کارگاه، حسابداران و پرسنل اداری جهت دسترسی به ابزارهای هوشمند از این قسمت وارد شوند.
            </p>
            <button
              onClick={onOpenLoginModal}
              className="w-full py-3.5 px-4 rounded-none bg-white/5 hover:bg-white/10 border border-white/20 text-white hover:text-akph-yellow font-bold text-sm flex items-center justify-center gap-3 transition-colors duration-300 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-akph-yellow" />
              <span className="tracking-wide">ورود به پورتال پرسنل</span>
            </button>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="font-black text-white text-base mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-akph-yellow"></div>
              دفتر مرکزی و ارتباط
            </h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-akph-yellow shrink-0 mt-0.5" />
                <span className="text-gray-300 leading-relaxed">
                  تهران، خیابان ولیعصر، بالاتر از ظفر، برج اداری هامون، طبقه ۹، واحد ۹۰۴
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-akph-yellow shrink-0" />
                <span className="text-gray-300 dir-ltr font-mono tracking-widest">۰۲۱ - ۸۸۷۷۶۶۵۵</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-akph-yellow shrink-0" />
                <span className="text-gray-300 font-mono tracking-widest">info@akph-co.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4 font-light">
          <p>© ۱۴۰۵ تمامی حقوق برای شرکت آریا کاوش پی هامون (سهامی خاص) محفوظ است.</p>
          <div className="flex items-center gap-6 text-gray-400">
            <span className="tracking-widest">انضباط در اجرا | کیفیت در سازه</span>
            <span className="text-gray-700">•</span>
            <button onClick={() => onSelectPublicTab('verify')} className="hover:text-akph-yellow transition-colors duration-300 cursor-pointer">
              اعتبارسنجی اسناد
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
