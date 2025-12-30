import React, { useRef } from 'react';
import { NewsItem, FeedSource } from '../types';
import { NewsCard } from './NewsCard';
import { ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HorizontalFeedProps {
  feed: FeedSource;
  items: NewsItem[];
}

export const HorizontalFeed: React.FC<HorizontalFeedProps> = ({ feed, items }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const getBadgeColor = (color: string) => {
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

  const getTextColor = (color: string) => {
    switch(color) {
        case 'red': return 'text-red-600';
        case 'emerald': return 'text-emerald-600';
        case 'green': return 'text-emerald-700';
        case 'teal': return 'text-teal-600';
        case 'blue': return 'text-blue-600';
        case 'indigo': return 'text-indigo-600';
        case 'purple': return 'text-purple-600';
        case 'pink': return 'text-pink-600';
        case 'yellow': return 'text-yellow-600';
        case 'slate': return 'text-slate-600';
        default: return 'text-teal-600';
    }
  };

  const badgeColor = getBadgeColor(feed.color);
  const textColor = getTextColor(feed.color);

  return (
    <div className="py-8 border-b border-slate-100 last:border-0">
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-slate-50 ${textColor}`}>
                <Newspaper size={24} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-800">{feed.name}</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">أحدث الأخبار</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <Link 
                to={`/news?source=${feed.id}`}
                className="text-sm font-bold text-slate-400 hover:text-teal-600 transition-colors hidden md:block"
            >
                عرض الكل
            </Link>
            <div className="flex gap-2">
                <button onClick={() => scroll('right')} className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors">
                    <ChevronRight size={20} />
                </button>
                <button onClick={() => scroll('left')} className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors">
                    <ChevronLeft size={20} />
                </button>
            </div>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 pb-8 px-4 scroll-smooth no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, idx) => (
          <div key={idx} className="min-w-[300px] md:min-w-[340px] snap-center">
            <NewsCard item={item} badgeText={feed.category} badgeColor={badgeColor} />
          </div>
        ))}
        
        {/* "View More" Card at the end */}
        <div className="min-w-[200px] flex items-center justify-center snap-center">
             <Link 
                to={`/news?source=${feed.id}`}
                className="flex flex-col items-center gap-4 group"
             >
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                    <ChevronLeft size={32} />
                </div>
                <span className="font-bold text-slate-500 group-hover:text-teal-600 transition-colors">عرض المزيد</span>
             </Link>
        </div>
      </div>
    </div>
  );
};