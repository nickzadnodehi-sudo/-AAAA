import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../../data/corporateData';
import { PortfolioProject } from '../../types';
import { Building2, Calendar, MapPin, Layers, X, CheckCircle2 } from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const filtered = PORTFOLIO_PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-right">
      {/* Title */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase">رزومه و نمونه کارها</span>
        <h1 className="text-3xl font-black text-slate-900">پروژه‌های عمرانی شرکت AKPH</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
          شناسنامه و سوابق پروژه‌های ساختمانی، تجاری، اداری و صنعتی اجرا شده و در حال ساخت.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            filter === 'all'
              ? 'bg-[#1F1F1F] text-[#F9C319]'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          همه پروژه‌ها ({PORTFOLIO_PROJECTS.length})
        </button>
        <button
          onClick={() => setFilter('ongoing')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            filter === 'ongoing'
              ? 'bg-[#1F1F1F] text-[#F9C319]'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          در حال اجرا ({PORTFOLIO_PROJECTS.filter((p) => p.category === 'ongoing').length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            filter === 'completed'
              ? 'bg-[#1F1F1F] text-[#F9C319]'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          تکمیل‌شده ({PORTFOLIO_PROJECTS.filter((p) => p.category === 'completed').length})
        </button>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold ${
                    project.category === 'ongoing'
                      ? 'bg-[#F9C319] text-[#1F1F1F]'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {project.category === 'ongoing' ? 'در حال اجرا' : 'تکمیل‌شده'}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-amber-600 transition">
                  {project.title}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>کاربری: {project.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>زیربنا: {project.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>موقعیت: {project.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">سال: {project.year}</span>
              <span className="text-xs font-bold text-amber-600 group-hover:underline">مشاهده شناسنامه ⬅</span>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-right space-y-6 relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 left-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 rounded-xl overflow-hidden bg-slate-900 mt-2">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2">
              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-700 text-xs font-bold">
                {selectedProject.type}
              </span>
              <h2 className="text-xl font-black text-slate-900">{selectedProject.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedProject.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs text-slate-700">
              <div><strong>متراژ زیربنا:</strong> {selectedProject.area}</div>
              <div><strong>موقعیت:</strong> {selectedProject.location}</div>
              <div><strong>نوع سازه:</strong> {selectedProject.structure}</div>
              <div><strong>کارفرما:</strong> {selectedProject.client}</div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs">ویژگی‌ها و مشخصات فنی پروژه:</h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedProject.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
