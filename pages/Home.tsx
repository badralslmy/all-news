// Edit Version: 1.0.3
import React, { useEffect, useState } from 'react';
import { fetchFeedItems } from '../services/rssService';
import { FeedSource, NewsItem } from '../types';
import { Hero } from '../components/Hero';
import { HorizontalFeed } from '../components/HorizontalFeed';
import { Loader2, Plus, Bookmark, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFeeds } from '../context/FeedContext';
import { useSavedNews } from '../context/SavedNewsContext';

export const Home: React.FC = () => {
  const { feeds } = useFeeds();
  const { savedArticles } = useSavedNews();
  const [feedsData, setFeedsData] = useState<Record<string, NewsItem[]>>({});
  const [allNews, setAllNews] = useState<NewsItem[]>([]); // For Hero
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Toggle State: 'feeds' or 'saved'
  const [viewMode, setViewMode] = useState<'feeds' | 'saved'>('feeds');

  useEffect(() => {
    const loadFeeds = async () => {
      try {
        setLoading(true);
        const results: Record<string, NewsItem[]> = {};
        let collectedHeroNews: NewsItem[] = [];

        await Promise.all(
          feeds.map(async (feed) => {
            try {
              const items = await fetchFeedItems(feed);
              if (items.length > 0) {
                results[feed.id] = items;
                collectedHeroNews = [...collectedHeroNews, ...items];
              }
            } catch (err) {
              console.error(`Error loading feed ${feed.name}`, err);
            }
          })
        );

        // Sort for Hero
        collectedHeroNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        
        setFeedsData(results);
        setAllNews(collectedHeroNews);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل الأخبار.');
      } finally {
        setLoading(false);
      }
    };

    if (feeds.length > 0) {
        loadFeeds();
    } else {
        setLoading(false);
    }
  }, [feeds]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-teal-600">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="text-lg font-bold text-slate-600">جاري إعداد صفحتك...</p>
      </div>
    );
  }

  // Create a dummy feed source object for Saved News to use HorizontalFeed
  const savedFeedSource: FeedSource = {
    id: 'saved',
    name: 'المقالات المحفوظة',
    url: '',
    category: 'general',
    color: 'teal'
  };

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-6">
      
      {/* Hero Section (Only show in Feeds mode) */}
      {viewMode === 'feeds' && (
          <div className="px-4 sm:px-0">
             {allNews.length > 0 && <Hero news={allNews.slice(0, 5)} />}
          </div>
      )}

      {/* Filter Toggle */}
      <div className="flex justify-center mb-8 px-4">
        <div className="bg-slate-200 p-1.5 rounded-2xl flex items-center shadow-inner">
            <button 
                onClick={() => setViewMode('feeds')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${viewMode === 'feeds' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Layers size={16} />
                أخباري
            </button>
            <button 
                onClick={() => setViewMode('saved')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${viewMode === 'saved' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Bookmark size={16} />
                محفوظاتي
                {savedArticles.length > 0 && (
                    <span className="bg-teal-100 text-teal-700 text-[10px] px-1.5 py-0.5 rounded-full">{savedArticles.length}</span>
                )}
            </button>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'saved' ? (
        <div className="px-4 sm:px-0 min-h-[50vh]">
            {savedArticles.length > 0 ? (
                <div className="relative">
                   <HorizontalFeed feed={savedFeedSource} items={savedArticles} />
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <Bookmark size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">لا توجد عناصر محفوظة</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">
                        قم بحفظ الأخبار المهمة للرجوع إليها لاحقاً. ستظهر جميع مقالاتك المحفوظة في هذا القسم.
                    </p>
                </div>
            )}
        </div>
      ) : (
        <div className="space-y-4">
            {feeds.map((feed) => {
                const items = feedsData[feed.id];
                if (!items || items.length === 0) return null;
                return <HorizontalFeed key={feed.id} feed={feed} items={items} />;
            })}
        </div>
      )}

      {/* Add Source CTA (Only show in Feeds mode) */}
      {viewMode === 'feeds' && (
          <div className="mt-12 px-4 sm:px-0">
            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-64 h-64 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
                
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black mb-4">
                        {feeds.length === 0 ? 'ابدأ بإضافة مصادرك المفضلة' : 'هل لديك مصدر آخر؟'}
                    </h2>
                    <p className="text-slate-300 text-lg mb-8">
                        {feeds.length === 0 
                            ? 'أرشيفك فارغ حالياً. قم بإضافة روابط RSS لمواقعك الإخبارية المفضلة لمتابعتها هنا.' 
                            : 'قم بتوسيع أرشيفك الشخصي وتابع المزيد من الأخبار في مكان واحد.'}
                    </p>
                    <Link 
                        to="/add-rss"
                        className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-teal-50 transition-all transform hover:-translate-y-1 shadow-lg"
                    >
                        <Plus size={24} className="text-teal-600" />
                        إضافة مصدر جديد
                    </Link>
                </div>
            </div>
          </div>
      )}
    </div>
  );
};