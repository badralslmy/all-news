// Edit Version: 1.0.3
import React, { useEffect, useState } from 'react';
import { NewsItem } from '../types';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

interface HeroProps {
  news: NewsItem[];
}

export const Hero: React.FC<HeroProps> = ({ news }) => {
  const [featured, setFeatured] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (news.length > 0) {
      const random = news[0]; // Take the latest news
      setFeatured(random);
    }
  }, [news]);

  if (!featured) return (
      <div className="w-full h-[450px] bg-slate-200 animate-pulse rounded-3xl mb-12"></div>
  );

  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-teal-900/10 group">
      {/* Background Image */}
      <img 
        src={featured.thumbnail} 
        alt={featured.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-90"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
        <div className="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="px-4 py-1.5 bg-teal-600 text-xs font-bold rounded-full shadow-lg shadow-teal-600/30">
            أحدث الأخبار
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-300 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Clock size={12} />
                {new Date(featured.pubDate).toLocaleTimeString('ar-SA', {hour: '2-digit', minute:'2-digit'})}
            </span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight max-w-4xl drop-shadow-lg animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          {featured.title}
        </h2>
        
        <p className="text-slate-200 text-lg mb-8 max-w-2xl line-clamp-2 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
           {featured.description.replace(/<[^>]+>/g, '')}
        </p>

        <Link 
          to="/news/details"
          state={{ item: featured }}
          className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300"
        >
          اقرأ التفاصيل
          <ArrowLeft size={20} className="text-teal-600" />
        </Link>
      </div>
    </div>
  );
};