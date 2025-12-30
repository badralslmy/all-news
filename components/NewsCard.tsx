import React from 'react';
import { NewsItem } from '../types';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Globe } from 'lucide-react';

interface NewsCardProps {
  item: NewsItem;
  badgeColor?: string;
  badgeText?: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, badgeColor = 'bg-teal-600', badgeText }) => {
  // Strip HTML tags from description for preview
  const plainDescription = item.description.replace(/<[^>]+>/g, '').substring(0, 100) + '...';
  
  // Format Date
  const dateStr = new Date(item.pubDate).toLocaleDateString('ar-SA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Link 
      to="/news/details" 
      state={{ item }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-52 overflow-hidden bg-slate-100">
         {item.thumbnail ? (
            <img 
              src={item.thumbnail} 
              alt={item.title} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://picsum.photos/800/600?grayscale';
              }}
            />
         ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                <Globe size={48} />
            </div>
         )}
         {badgeText && (
           <span className={`absolute top-4 right-4 ${badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
             {badgeText}
           </span>
         )}
         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <Calendar size={14} className="text-teal-400" />
          <span>{dateStr}</span>
        </div>

        <h3 className="font-bold text-lg text-slate-800 mb-3 line-clamp-2 leading-tight group-hover:text-teal-600 transition-colors">
            {item.title}
        </h3>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-3 leading-relaxed">
          {plainDescription}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <User size={12} />
                </div>
                <span>{item.author || 'محرر الأخبار'}</span>
            </div>
            <span className="text-teal-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <ArrowLeft size={18} />
            </span>
        </div>
      </div>
    </Link>
  );
};