// Edit Version: 1.0.3
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, Info, Home, Layers } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path 
    ? 'bg-teal-50 text-teal-600 font-bold shadow-inner' 
    : 'text-slate-500 hover:text-teal-600 hover:bg-white/50';

  const navLinks = [
    { path: '/', label: 'الرئيسية', icon: <Home size={18} /> },
    { path: '/news', label: 'كل الأخبار', icon: <Layers size={18} /> },
    { path: '/developer', label: 'المطور', icon: <Info size={18} /> },
  ];

  return (
    <>
      {/* Mobile Header: Separate Floating Blocks */}
      <div className="md:hidden pt-4 pb-2 px-4 flex justify-between items-center bg-transparent sticky top-0 z-40 pointer-events-none">
         {/* Logo Block (Right) */}
         <div className="pointer-events-auto shadow-lg shadow-slate-200/50 rounded-2xl">
             <Link to="/" className="flex items-center gap-2 bg-white/95 backdrop-blur-sm py-2 px-3 rounded-2xl border border-white/50">
                <div className="w-9 h-9 shadow-sm rounded-xl overflow-hidden bg-teal-50">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <rect x="10" y="10" width="80" height="80" rx="20" fill="#0D9488" />
                        <path d="M30 35H70" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                        <path d="M30 55H70" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                        <path d="M30 75H50" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                        <circle cx="70" cy="75" r="6" fill="#99F6E4" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-lg font-black text-slate-900 tracking-tighter leading-none font-sans">
                      ALL<span className="text-teal-600">NEWS</span>
                    </h1>
                </div>
             </Link>
         </div>

         {/* Developer Info Block (Left) */}
         <div className="pointer-events-auto shadow-lg shadow-slate-200/50 rounded-2xl">
             <Link 
                to="/developer" 
                className="w-12 h-12 flex items-center justify-center bg-white/95 backdrop-blur-sm text-slate-500 rounded-2xl border border-white/50 hover:text-teal-600 active:scale-95 transition-all"
                aria-label="معلومات المطور"
             >
                <Info size={22} />
             </Link>
         </div>
      </div>

      {/* Desktop Header: Sprouted Floating Blocks */}
      <nav className="hidden md:block fixed top-6 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-start">
          
          {/* Logo Block */}
          <div className="pointer-events-auto">
            <Link to="/" className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-2 pr-4 rounded-2xl shadow-lg border border-slate-100/50 hover:scale-105 transition-transform duration-300 group">
              <div className="w-10 h-10 shadow-md rounded-xl overflow-hidden">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                   <rect x="10" y="10" width="80" height="80" rx="20" fill="#0D9488" />
                   <path d="M30 35H70" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                   <path d="M30 55H70" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                   <path d="M30 75H50" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                   <circle cx="70" cy="75" r="6" fill="#99F6E4" />
                </svg>
              </div>
              
              <div className="flex flex-col pl-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tighter leading-none font-sans">
                  ALL<span className="text-teal-600">NEWS</span>
                </h1>
                <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">Your Daily Archive</span>
              </div>
            </Link>
          </div>

          {/* Navigation Block */}
          <div className="pointer-events-auto flex gap-4">
             <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-100/50 flex items-center gap-1">
                {navLinks.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive(link.path)}`}
                >
                    {link.icon}
                    {link.label}
                </Link>
                ))}
             </div>

             {/* Action Block */}
             <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-100/50">
                <Link
                to="/add-rss"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-teal-600 shadow-md hover:shadow-teal-600/20 transition-all transform hover:-translate-y-0.5"
                >
                <Plus size={18} />
                إضافة مصدر
                </Link>
             </div>
          </div>

        </div>
      </nav>
      
      {/* Spacer for Desktop fixed header */}
      <div className="hidden md:block h-32"></div>
    </>
  );
};