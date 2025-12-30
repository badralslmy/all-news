// Edit Version: 1.0.3
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Plus } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path 
    ? 'text-teal-600' 
    : 'text-slate-400';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/60 px-6 py-2 z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center px-4 relative">
        <Link to="/" className={`flex flex-col items-center gap-1 p-2 w-16 transition-colors ${isActive('/')}`}>
          <Home size={26} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">الرئيسية</span>
        </Link>
        
        {/* Redesigned Add Button */}
        <Link to="/add-rss" className="relative -top-8 group">
           <div className="absolute inset-0 bg-teal-400 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform opacity-40 blur-sm"></div>
           <div className="relative bg-gradient-to-br from-teal-500 to-teal-700 text-white w-16 h-16 rounded-2xl shadow-xl shadow-teal-600/30 flex items-center justify-center transform group-hover:scale-105 transition-all border-4 border-gray-50">
             <Plus size={32} strokeWidth={3} />
           </div>
        </Link>

        <Link to="/news" className={`flex flex-col items-center gap-1 p-2 w-16 transition-colors ${isActive('/news')}`}>
          <Layers size={26} strokeWidth={location.pathname === '/news' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">الأخبار</span>
        </Link>
      </div>
    </div>
  );
};