import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchFeedItems } from '../services/rssService';
import { NewsItem } from '../types';
import { NewsCard } from '../components/NewsCard';
import { Loader2, Search, Filter, CalendarDays, Newspaper, X } from 'lucide-react';
import { useFeeds } from '../context/FeedContext';
import { useSavedNews } from '../context/SavedNewsContext';

export const NewsFeed: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSource = searchParams.get('source') || 'all';
  const { feeds } = useFeeds();
  const { savedArticles, isSaved } = useSavedNews();

  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState(initialSource);
  const [selectedDate, setSelectedDate] = useState('all'); // 'all', 'today', 'week'

  useEffect(() => {
    const loadAllNews = async () => {
      setLoading(true);
      try {
        let collected: NewsItem[] = [];
        await Promise.all(
          feeds.map(async (feed) => {
            try {
              const items = await fetchFeedItems(feed);
              collected = [...collected, ...items];
            } catch (err) {
              console.error(err);
            }
          })
        );
        // Sort descending
        collected.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        setAllNews(collected);
      } finally {
        setLoading(false);
      }
    };
    
    if (feeds.length > 0) {
        loadAllNews();
    } else {
        setLoading(false);
    }
  }, [feeds]);

  useEffect(() => {
      if (initialSource) {
          setSelectedSource(initialSource);
      }
  }, [initialSource]);

  // Filtering Logic
  const filteredNews = useMemo(() => {
    let baseList = allNews;
    if (selectedSource === 'saved') {
        baseList = savedArticles;
    }

    return baseList.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSource = selectedSource === 'all' || selectedSource === 'saved' ? true : item.sourceId === selectedSource;

      let matchesDate = true;
      const itemDate = new Date(item.pubDate);
      const now = new Date();
      
      if (selectedDate === 'today') {
        matchesDate = itemDate.getDate() === now.getDate() && 
                      itemDate.getMonth() === now.getMonth() && 
                      itemDate.getFullYear() === now.getFullYear();
      } else if (selectedDate === 'week') {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = itemDate >= oneWeekAgo;
      }

      return matchesSearch && matchesSource && matchesDate;
    });
  }, [allNews, savedArticles, searchQuery, selectedSource, selectedDate]);

  const getBadgeColor = (color?: string) => {
    switch(color) {
        case 'red': return 'bg-red-500';
        case 'emerald': return 'bg-emerald-500';
        case 'green': return 'bg-emerald-600';
        case 'teal': return 'bg-teal-500';
        case 'blue': return 'bg-blue-500';
        case 'indigo': return 'bg-indigo-500';
        case 'purple': return 'bg-purple-500';
        case 'pink': return 'bg-pink-500';
        case 'yellow': return 'bg-yellow-500';
        case 'slate': return 'bg-slate-500';
        default: return 'bg-teal-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-teal-600">
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & Controls */}
      <div className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-black text-slate-900">أرشيف الأخبار</h1>
            <span className="text-slate-500 font-medium">عدد الأخبار: {filteredNews.length}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search */}
            <div className="md:col-span-5 relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="ابحث في العناوين والتفاصيل..." 
                    className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Source Filter */}
            <div className="md:col-span-4 relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Newspaper size={20} />
                </div>
                <select 
                    className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none appearance-none cursor-pointer"
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                >
                    <option value="all">جميع المصادر</option>
                    <option value="saved" className="font-bold text-teal-600">★ العناصر المحفوظة</option>
                    <hr />
                    {feeds.map(feed => (
                        <option key={feed.id} value={feed.id}>{feed.name}</option>
                    ))}
                </select>
            </div>

             {/* Date Filter */}
             <div className="md:col-span-3 relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <CalendarDays size={20} />
                </div>
                <select 
                    className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none appearance-none cursor-pointer"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                >
                    <option value="all">كل الأوقات</option>
                    <option value="today">اليوم</option>
                    <option value="week">هذا الأسبوع</option>
                </select>
            </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredNews.map((item, idx) => {
            const source = feeds.find(f => f.id === item.sourceId);
            const isItemSaved = isSaved(item.link);
            const badgeColor = getBadgeColor(source?.color);

            return (
                <NewsCard 
                    key={`${item.sourceId}-${idx}`} 
                    item={item} 
                    badgeText={source?.name || (isItemSaved ? 'محفوظ' : '')}
                    badgeColor={badgeColor}
                />
            );
        })}
      </div>

      {filteredNews.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
              <div className="inline-block p-4 bg-slate-100 rounded-full text-slate-400 mb-4">
                  <Filter size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                 {selectedSource === 'saved' ? 'لا توجد مقالات محفوظة' : 'لم يتم العثور على نتائج'}
              </h3>
              <p className="text-slate-500">
                {selectedSource === 'saved' 
                    ? 'قم بحفظ بعض المقالات أولاً لتظهر هنا.'
                    : 'حاول تغيير مصطلحات البحث أو الفلاتر المستخدمة.'}
              </p>
              <button 
                  onClick={() => {
                      setSearchQuery('');
                      setSelectedSource('all');
                      setSelectedDate('all');
                  }}
                  className="mt-6 text-teal-600 font-bold hover:underline"
              >
                  إعادة تعيين الفلاتر
              </button>
          </div>
      )}
    </div>
  );
};