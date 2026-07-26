import React from 'react';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: 'اتمام بتن‌ریزی دال مجوف سقف طبقه ۱۴ برج‌های هامون (کد ۱۸۴)',
      date: '۱۴۰۵/۰۵/۰۲',
      author: 'سرپرستی کارگاه ۱۸۴',
      category: 'گزارش پیشرفت پروژه',
      summary: 'با تلاش شبانه‌روزی کادر فنی و نظارت عالیه، عملیات بتن‌ریزی سقف طبقه ۱۴ با موفقیت و اخذ تمام نمونه‌های مکعبی انجام گردید.',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'رونمایی از نسخه جدید کتابچه استانداردهای OS و ماژول‌های اتوماسیون',
      date: '۱۴۰۵/۰۴/۲۰',
      author: 'دفتر فنی مرکزی AKPH',
      category: 'اخبار سازمانی',
      summary: 'ویرایش جدید کتابچه OS شامل سیستم کدگذاری خودکار اسناد، تولید نامه با QR کد اعتبارسنجی و سامانه تنخواه رونمایی شد.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'نکات کلیدی در کنترل اسلامپ و افت بتن تازه در هوای گرم تابستان',
      date: '۱۴۰۵/۰۴/۱۰',
      author: 'مهندس نیک‌زاد نودهی',
      category: 'مقالات فنی-مهندسی',
      summary: 'بررسی اثرات دمای محیط بر زمان گیرش اولیه بتن و الزامات استفاده از روان‌کننده‌های فوق دیرگیر طبق آیین‌نامه بتن ایران (آبا).',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-right">
      <div className="space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase">اخبار و مطالب فنی</span>
        <h1 className="text-3xl font-black text-slate-900">گزارشات کارگاهی و مقالات تخصصی مهندسی</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2 py-1 bg-[#1F1F1F] text-[#F9C319] text-[10px] font-bold rounded">
                  {post.category}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-extrabold text-slate-900 text-base leading-snug">{post.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{post.summary}</p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 mt-2 pt-3">
              <span>{post.date}</span>
              <span>{post.author}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
