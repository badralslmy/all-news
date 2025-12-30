import React, { useState } from 'react';
import { Plus, Check, Search, Globe, X, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { useFeeds } from '../context/FeedContext';
import { FEED_LIBRARY } from '../constants';
import { FeedSource } from '../types';

const LOGO_DEV_TOKEN = 'pk_SHoWNvZ-SDODwOMKaW0Enw';

export const AddFeed: React.FC = () => {
  const { feeds, addFeed, removeFeed } = useFeeds();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);
  
  // Custom Form State
  const [customForm, setCustomForm] = useState({ name: '', url: '', category: 'general' });
  const [customError, setCustomError] = useState('');

  // Helpers
  const isSubscribed = (id: string) => feeds.some(f => f.id === id);
  const getLogoUrl = (domain: string) => `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&size=100&format=png`;

  const handleToggle = (item: typeof FEED_LIBRARY[0]) => {
    if (isSubscribed(item.id)) {
      // Find the actual feed ID in context (in case it was added differently, though IDs should match)
      const feedToRemove = feeds.find(f => f.id === item.id);
      if (feedToRemove) removeFeed(feedToRemove.id);
    } else {
      addFeed({
        id: item.id,
        name: item.name,
        url: item.url,
        category: item.category as any,
        color: item.color
      });
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customForm.name || !customForm.url) {
      setCustomError('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    const newId = `custom-${Date.now()}`;
    addFeed({
      id: newId,
      name: customForm.name,
      url: customForm.url,
      category: customForm.category as any,
      color: 'teal'
    });
    
    setCustomForm({ name: '', url: '', category: 'general' });
    setShowCustomModal(false);
    setCustomError('');
  };

  const filteredLibrary = FEED_LIBRARY.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">إدارة المصادر</h1>
          <p className="text-slate-500">اختر من مكتبة المصادر الموثوقة أو أضف مصادرك الخاصة.</p>
        </div>
        
        <button 
          onClick={() => setShowCustomModal(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-600 transition-all shadow-lg hover:shadow-teal-600/20 active:scale-95"
        >
          <LinkIcon size={18} />
          <span>إضافة رابط خارجي</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-12">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Search size={22} />
        </div>
        <input 
          type="text" 
          placeholder="ابحث عن صحيفة، مجلة، أو موقع إخباري..." 
          className="w-full pl-4 pr-12 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-lg transition-all placeholder:text-slate-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Library Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredLibrary.map((item) => {
          const active = isSubscribed(item.id);
          
          return (
            <div 
              key={item.id} 
              className={`group relative bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${active ? 'border-teal-500 shadow-lg shadow-teal-500/10 ring-1 ring-teal-500' : 'border-slate-100 hover:border-teal-200 hover:shadow-md'}`}
            >
              <div className="p-5 flex items-center justify-between gap-4">
                
                {/* Logo & Info */}
                <div className="flex items-center gap-4 flex-grow min-w-0">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center p-1 border border-slate-100 flex-shrink-0">
                    <img 
                      src={getLogoUrl(item.domain)} 
                      alt={item.name} 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
                      }}
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-slate-800 truncate">{item.name}</h3>
                    <span className="text-xs text-slate-400 truncate dir-ltr text-right font-mono">{item.domain}</span>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => handleToggle(item)}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${active ? 'bg-teal-500' : 'bg-slate-200'}`}
                >
                  <span 
                    className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-200 flex items-center justify-center ${active ? 'translate-x-5' : 'translate-x-0'}`}
                  >
                    {active && <Check size={12} className="text-teal-600" />}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLibrary.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
             <Globe size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-700">لم يتم العثور على نتائج</h3>
          <p className="text-slate-500 mt-2">جرب البحث عن اسم آخر أو قم بإضافة المصدر يدوياً.</p>
          <button 
            onClick={() => setShowCustomModal(true)}
            className="mt-6 text-teal-600 font-bold hover:underline"
          >
            إضافة مصدر يدوي
          </button>
        </div>
      )}

      {/* Custom Source Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
                 <h2 className="text-xl font-bold flex items-center gap-2">
                    <Plus size={24} className="text-teal-600" />
                    إضافة مصدر خارجي
                 </h2>
                 <button onClick={() => setShowCustomModal(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={24} />
                 </button>
              </div>
              
              <form onSubmit={handleCustomSubmit} className="p-6 space-y-4">
                 {customError && (
                    <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold">
                        <AlertCircle size={18} />
                        {customError}
                    </div>
                 )}

                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">اسم المصدر</label>
                    <input 
                       type="text" 
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50 focus:bg-white"
                       placeholder="مثال: مدونة التقنية الشخصية"
                       value={customForm.name}
                       onChange={e => setCustomForm({...customForm, name: e.target.value})}
                    />
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">رابط RSS</label>
                    <input 
                       type="url" 
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50 focus:bg-white dir-ltr text-left font-mono text-sm"
                       placeholder="https://example.com/feed.xml"
                       value={customForm.url}
                       onChange={e => setCustomForm({...customForm, url: e.target.value})}
                    />
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">التصنيف</label>
                    <select 
                       className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none bg-slate-50 focus:bg-white"
                       value={customForm.category}
                       onChange={e => setCustomForm({...customForm, category: e.target.value})}
                    >
                       <option value="general">أخبار عامة</option>
                       <option value="tech">تقنية</option>
                       <option value="sports">رياضة</option>
                       <option value="health">صحة</option>
                       <option value="food">طبخ</option>
                    </select>
                 </div>

                 <div className="pt-4 flex gap-3">
                    <button 
                       type="button" 
                       onClick={() => setShowCustomModal(false)}
                       className="flex-1 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                       إلغاء
                    </button>
                    <button 
                       type="submit" 
                       className="flex-1 py-3 rounded-xl font-bold bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-colors"
                    >
                       إضافة المصدر
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

    </div>
  );
};