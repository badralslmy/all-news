// Edit Version: 1.0.3
import React from 'react';
import { DEVELOPER_INFO, APP_VERSION } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-right">
            <h2 className="text-2xl font-black tracking-tight mb-2">All-news</h2>
            <p className="text-slate-400 text-sm">منصتك الأولى لمتابعة الأخبار من جميع المصادر في مكان واحد.</p>
            <p className="text-slate-500 text-xs mt-4">
              جميع الحقوق محفوظة © {new Date().getFullYear()} - الإصدار {APP_VERSION}
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-400 mb-2">
              تم التطوير والحب بواسطة
            </p>
            <a href="/developer" className="inline-block px-4 py-2 bg-slate-800 rounded-full text-indigo-400 font-bold hover:bg-slate-700 hover:text-indigo-300 transition-colors">
              {DEVELOPER_INFO.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};