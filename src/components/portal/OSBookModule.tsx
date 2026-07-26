import React, { useState } from 'react';
import { OS_CHAPTERS } from '../../data/corporateData';
import { OSChapter } from '../../types';
import { BookOpen, Search, Filter, ShieldAlert, History, Check, Tag } from 'lucide-react';

export const OSBookModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [showHistory, setShowHistory] = useState(false);

  const filteredChapters = OS_CHAPTERS.map((ch) => {
    if (selectedChapterId !== 'all' && ch.id !== selectedChapterId) return null;

    const filteredArticles = ch.articles.filter((art) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        art.title.toLowerCase().includes(term) ||
        art.content.toLowerCase().includes(term) ||
        art.code.toLowerCase().includes(term) ||
        art.tags.some((t) => t.toLowerCase().includes(term))
      );
    });

    if (filteredArticles.length === 0) return null;

    return {
      ...ch,
      articles: filteredArticles,
    };
  }).filter(Boolean) as OSChapter[];

  return (
    <div className="space-y-6 text-right">
      {/* Module Title Bar */}
      <div className="bg-[#1F1F1F] text-white p-6 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#F9C319]" />
            <h1 className="text-xl font-black text-white">مرجع استانداردهای سازمانی OS (Online OS Book)</h1>
          </div>
          <p className="text-xs text-slate-300">
            موتور جستجوی هوشمند آیین‌نامه‌ها، دستورالعمل‌های کارگاهی، ضوابط HSE و کنترل کیفیت
          </p>
        </div>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-3.5 py-2 rounded-xl bg-[#2B2B2B] hover:bg-[#333] border border-slate-700 text-xs font-bold text-amber-300 flex items-center gap-2 transition cursor-pointer shrink-0"
        >
          <History className="w-4 h-4 text-[#F9C319]" />
          <span>تاریخچه نسخه‌ها (Rev 2.1)</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجوی عنوان، کداستاندارد یا کلمات کلیدی (مثلا: آرماتور، HSE، اسلامپ)..."
            className="w-full px-4 py-2.5 pr-10 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#F9C319] outline-hidden text-xs text-slate-900"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedChapterId('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
              selectedChapterId === 'all'
                ? 'bg-[#1F1F1F] text-[#F9C319]'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            همه فصول
          </button>
          {OS_CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChapterId(ch.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                selectedChapterId === ch.id
                  ? 'bg-[#1F1F1F] text-[#F9C319]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              فصل {ch.chapterNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Version Control Modal/Panel */}
      {showHistory && (
        <div className="bg-[#18181B] text-white p-5 rounded-2xl border border-amber-500/40 text-xs space-y-3">
          <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
            <History className="w-4 h-4" />
            تاریخچه تغییرات و نسخه‌گذاری کتابچه OS (Audit Log)
          </h3>
          <ul className="space-y-2 text-slate-300 font-mono">
            <li className="bg-[#27272A] p-2.5 rounded-lg border border-slate-700 flex justify-between">
              <span><strong>Rev 2.1 (نسخه فعلی)</strong> - به‌روزرسانی کدگذاری اسناد بر اساس فرمول [سال]-[سریال]-[کدپروژه][نوع]</span>
              <span className="text-amber-300">۱۴۰۵/۰۱/۱۰</span>
            </li>
            <li className="bg-[#27272A] p-2.5 rounded-lg border border-slate-700 flex justify-between opacity-75">
              <span><strong>Rev 2.0</strong> - الحاق الزامات جدید آزمایش نمونه‌های بتن تازه و کلاه ایمنی استاندارد ANSI</span>
              <span className="text-slate-400">۱۴۰۴/۱۰/۱۵</span>
            </li>
            <li className="bg-[#27272A] p-2.5 rounded-lg border border-slate-700 flex justify-between opacity-50">
              <span><strong>Rev 1.0</strong> - نسخه اولیه آیین‌نامه‌ها و ضوابط تنخواه کارگاهی</span>
              <span className="text-slate-400">۱۴۰۳/۰۶/۰۱</span>
            </li>
          </ul>
        </div>
      )}

      {/* Chapters & Articles Display */}
      <div className="space-y-6">
        {filteredChapters.map((ch) => (
          <div key={ch.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-[#F9C319] text-[#1F1F1F] text-xs font-black">
                  فصل {ch.chapterNumber}
                </span>
                <h2 className="font-black text-sm text-white">{ch.title}</h2>
              </div>
              <span className="text-xs text-amber-300 font-mono">{ch.version}</span>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed border-b border-slate-100 pb-3">{ch.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ch.articles.map((art) => (
                  <div
                    key={art.code}
                    className={`p-4 rounded-xl border text-xs space-y-2.5 text-right ${
                      art.importance === 'critical'
                        ? 'bg-rose-50/50 border-rose-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">{art.title}</span>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                          art.importance === 'critical'
                            ? 'bg-rose-600 text-white'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {art.code}
                      </span>
                    </div>

                    <p className="text-slate-700 leading-relaxed">{art.content}</p>

                    <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                      <Tag className="w-3 h-3 text-slate-400" />
                      {art.tags.map((tg, idx) => (
                        <span key={idx} className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px] text-slate-600">
                          #{tg}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
