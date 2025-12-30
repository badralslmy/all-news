import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { NewsItem } from '../types';
import { ArrowRight, Calendar, User, Share2, ExternalLink, Globe, Printer, Bookmark, Check, X, Image as ImageIcon, Type, Clock } from 'lucide-react';
import { useSavedNews } from '../context/SavedNewsContext';

export const NewsDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSaved, saveArticle, removeArticle } = useSavedNews();
  
  const item = location.state?.item as NewsItem;
  
  // State for features
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printConfig, setPrintConfig] = useState({ showImage: true, fontSize: 'normal' });
  const [showToast, setShowToast] = useState<{msg: string, type: 'success' | 'neutral'} | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!item) {
        navigate('/');
    }
  }, [item, navigate]);

  useEffect(() => {
    if (showToast) {
        const timer = setTimeout(() => setShowToast(null), 3000);
        return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (!item) return null;

  const isArticleSaved = isSaved(item.link);

  const handleSave = () => {
    if (isArticleSaved) {
        removeArticle(item.link);
        setShowToast({ msg: 'تمت إزالة الخبر من المحفوظات', type: 'neutral' });
    } else {
        saveArticle(item);
        setShowToast({ msg: 'تم حفظ الخبر بنجاح', type: 'success' });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `اقرأ هذا الخبر على All-news: ${item.title}`,
          url: item.link
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      navigator.clipboard.writeText(`${item.title}\n${item.link}`);
      setShowToast({ msg: 'تم نسخ الرابط للحافظة', type: 'success' });
    }
  };

  const handlePrint = () => {
    setTimeout(() => {
        window.print();
    }, 100);
  };

  const dateStr = new Date(item.pubDate).toLocaleDateString('ar-SA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  
  const timeStr = new Date(item.pubDate).toLocaleTimeString('ar-SA', {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Decor (Matching Home Page) */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 no-print">
        
        {/* Top Navigation */}
        <div className="mb-8">
            <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white border border-slate-100 rounded-xl text-slate-500 hover:text-teal-600 font-bold transition-all shadow-sm hover:shadow-md"
            >
                <ArrowRight size={18} />
                العودة للرئيسية
            </Link>
        </div>

        {/* Main Article Container */}
        <article className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white/50 overflow-hidden">
            
            {/* Header Section */}
            <div className="p-6 md:p-10 pb-0">
                {/* Meta Tags */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-100">
                        <Globe size={12} />
                        {item.sourceId}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-xs font-bold border border-slate-100">
                        <Calendar size={12} />
                        {dateStr}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-xs font-bold border border-slate-100">
                        <Clock size={12} />
                        {timeStr}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight mb-8 drop-shadow-sm">
                    {item.title}
                </h1>

                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-lg shadow-slate-200 aspect-video md:aspect-[21/9] bg-slate-100">
                    <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/1200/600?grayscale'; }}
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl"></div>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-10">
                <div className="prose prose-lg prose-slate max-w-none">
                    <div 
                        className="text-slate-600 leading-loose text-lg text-justify break-words font-medium"
                        dangerouslySetInnerHTML={{ __html: item.content || item.description }} 
                    />
                </div>

                {/* Author Credit */}
                {item.author && (
                    <div className="mt-8 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 w-fit">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold">الكاتب / المحرر</p>
                            <p className="text-sm font-bold text-slate-700">{item.author}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="bg-slate-50/80 backdrop-blur border-t border-slate-100 p-6 md:p-8">
                <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6">
                    
                    {/* Action Buttons Group */}
                    <div className="flex items-center justify-center gap-3 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <button 
                            onClick={handleSave}
                            className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${isArticleSaved ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                            {isArticleSaved ? <Check size={18} /> : <Bookmark size={18} />}
                            {isArticleSaved ? 'محفوظ' : 'حفظ'}
                        </button>
                        
                        <div className="w-px h-8 bg-slate-100"></div>

                        <button 
                            onClick={handleShare}
                            className="flex-1 flex flex-col md:flex-row items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                            <Share2 size={18} />
                            مشاركة
                        </button>

                        <div className="w-px h-8 bg-slate-100"></div>

                        <button 
                            onClick={() => setShowPrintModal(true)}
                            className="flex-1 flex flex-col md:flex-row items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        >
                            <Printer size={18} />
                            طباعة
                        </button>
                    </div>

                    {/* Original Source Button */}
                    <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-teal-600 transition-all shadow-xl hover:shadow-teal-600/20 hover:-translate-y-0.5 active:scale-95"
                    >
                        <span>قراءة المصدر الأصلي</span>
                        <ExternalLink size={20} className="group-hover:rotate-45 transition-transform" />
                    </a>
                </div>
            </div>
        </article>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 md:bottom-10 right-1/2 translate-x-1/2 md:translate-x-0 md:right-10 z-[60] animate-in slide-in-from-bottom-5 fade-in duration-300 w-max max-w-[90vw]">
             <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${showToast.type === 'success' ? 'bg-slate-900 text-white border-slate-800' : 'bg-white text-slate-800 border-slate-200'}`}>
                {showToast.type === 'success' ? <div className="p-1 bg-teal-500 rounded-full"><Check size={14} className="text-white"/></div> : <Bookmark size={20}/>}
                <span className="font-bold text-sm">{showToast.msg}</span>
             </div>
        </div>
      )}

      {/* Print Preview Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 print:hidden">
            <div className="bg-white rounded-[2rem] w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white/50">
                
                {/* Modal Header */}
                <div className="bg-slate-50/50 backdrop-blur border-b border-slate-100 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-900 font-black text-xl">
                        <div className="p-2 bg-teal-100 text-teal-700 rounded-xl">
                            <Printer size={24} />
                        </div>
                        <span>معاينة الطباعة</span>
                    </div>
                    <button onClick={() => setShowPrintModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                        <X size={24} />
                    </button>
                </div>

                {/* Print Options */}
                <div className="p-4 bg-white border-b border-slate-50 flex gap-3 overflow-x-auto px-6">
                    <button 
                        onClick={() => setPrintConfig(prev => ({...prev, showImage: !prev.showImage}))}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${printConfig.showImage ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                    >
                        {printConfig.showImage ? <Check size={16} /> : <div className="w-4" />}
                        <ImageIcon size={18} />
                        تضمين الصورة
                    </button>
                    <button 
                        onClick={() => setPrintConfig(prev => ({...prev, fontSize: prev.fontSize === 'normal' ? 'large' : 'normal'}))}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${printConfig.fontSize === 'large' ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                    >
                        <Type size={18} />
                        {printConfig.fontSize === 'normal' ? 'حجم خط عادي' : 'حجم خط كبير'}
                    </button>
                </div>

                {/* Preview Area */}
                <div className="flex-grow overflow-y-auto p-8 md:p-12 bg-white">
                    <div className={`max-w-xl mx-auto ${printConfig.fontSize === 'large' ? 'text-xl' : 'text-base'}`}>
                        <div className="text-center mb-8 border-b-2 border-slate-900 pb-6">
                            <h1 className="font-black text-3xl text-slate-900 mb-4 leading-tight">{item.title}</h1>
                            <div className="flex items-center justify-center gap-4 text-slate-500 text-sm font-bold">
                                <span>{item.sourceId}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span>{dateStr}</span>
                            </div>
                        </div>

                        {printConfig.showImage && item.thumbnail && (
                            <img src={item.thumbnail} alt="News" className="w-full h-64 object-cover rounded-2xl mb-8 grayscale opacity-90 border border-slate-100" />
                        )}

                        <div 
                            className="prose prose-slate max-w-none text-slate-900 leading-loose text-justify break-words font-serif"
                            dangerouslySetInnerHTML={{ __html: item.content || item.description }} 
                        />

                        <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                             <Printer size={12} />
                             تمت الطباعة من منصة All-news بتاريخ {new Date().toLocaleDateString('ar-SA')}
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                    <button 
                        onClick={() => setShowPrintModal(false)}
                        className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                        إلغاء
                    </button>
                    <button 
                        onClick={handlePrint}
                        className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg shadow-teal-600/20 flex items-center gap-2 transition-transform active:scale-95"
                    >
                        <Printer size={20} />
                        طباعة المستند
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Hidden Print Area (This becomes visible only when window.print() is called) */}
      <div id="print-area" className="hidden print-only bg-white p-8 w-full max-w-none">
            <div className={`max-w-4xl mx-auto ${printConfig.fontSize === 'large' ? 'text-2xl' : 'text-lg'}`}>
                <div className="flex items-center justify-between border-b-4 border-black pb-6 mb-8">
                    <div>
                        <h1 className="font-black text-5xl text-black mb-2">All-news</h1>
                        <p className="text-base text-gray-600 font-bold">أرشيف الأخبار اليومي</p>
                    </div>
                    <div className="text-right">
                         <span className="block text-xl font-bold text-black">{new Date().toLocaleDateString('ar-SA')}</span>
                         <span className="block text-sm text-gray-500">تمت الطباعة آلياً</span>
                    </div>
                </div>

                <h2 className="font-black text-4xl text-black mb-6 leading-tight">{item.title}</h2>
                
                <div className="flex gap-6 text-base text-gray-600 mb-8 font-bold border-b border-gray-200 pb-6">
                    <span className="flex items-center gap-2">
                        <Calendar size={18}/> {dateStr}
                    </span>
                    <span className="flex items-center gap-2">
                        <Globe size={18}/> {item.sourceId}
                    </span>
                </div>

                {printConfig.showImage && item.thumbnail && (
                    <div className="mb-8">
                         <img src={item.thumbnail} className="w-full max-h-[500px] object-cover rounded-xl border border-gray-300 grayscale contrast-125" />
                    </div>
                )}

                <div className="leading-loose text-justify font-serif text-black break-words" dangerouslySetInnerHTML={{ __html: item.content || item.description }} />
                
                <div className="mt-16 pt-6 border-t-2 border-gray-100 text-sm text-gray-500 text-center font-mono">
                    {item.link}
                </div>
            </div>
      </div>
    </div>
  );
};