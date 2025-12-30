// Edit Version: 1.0.4
import React from 'react';
import { DEVELOPER_INFO } from '../constants';
import { Code, Github } from 'lucide-react';

export const DeveloperInfo: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100">
        <div className="h-40 bg-gradient-to-r from-teal-600 to-emerald-600"></div>
        
        <div className="px-8 pb-10">
          <div className="relative flex justify-between items-end -mt-12 mb-8">
            <div className="bg-white p-2 rounded-2xl shadow-md">
                <div className="w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center border-4 border-teal-50 overflow-hidden">
                    <img width="67" height="67" src="https://img.icons8.com/external-others-inmotus-design/67/external-B-hornbook-letters-others-inmotus-design.png" alt="Bader Logo"/>
                </div>
            </div>
            <div className="flex gap-3 mb-2">
                <a href={DEVELOPER_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                    <Github size={20} />
                </a>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-1">{DEVELOPER_INFO.name}</h1>
          <p className="text-teal-600 font-medium mb-8">{DEVELOPER_INFO.role}</p>

          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-10">
            <p className="text-lg">{DEVELOPER_INFO.bio}</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
             <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 transition-colors group">
                <div className="flex items-center gap-3 mb-4 text-slate-800 font-bold group-hover:text-teal-600 transition-colors">
                    <Code className="text-teal-500" />
                    <h3>المهارات التقنية</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'RSS Integration'].map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm">
                            {skill}
                        </span>
                    ))}
                </div>
             </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
             <p className="text-slate-400 text-sm">تم تطوير All-news باستخدام أحدث تقنيات الويب (React 18, TypeScript) لضمان أفضل أداء وتجربة مستخدم.</p>
          </div>

        </div>
      </div>
    </div>
  );
};