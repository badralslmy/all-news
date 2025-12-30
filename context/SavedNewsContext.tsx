import React, { createContext, useContext, useState, useEffect } from 'react';
import { NewsItem } from '../types';

interface SavedNewsContextType {
  savedArticles: NewsItem[];
  saveArticle: (article: NewsItem) => void;
  removeArticle: (url: string) => void;
  isSaved: (url: string) => boolean;
}

const SavedNewsContext = createContext<SavedNewsContextType | undefined>(undefined);

export const SavedNewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedArticles, setSavedArticles] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem('allnews_saved_articles');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('allnews_saved_articles', JSON.stringify(savedArticles));
  }, [savedArticles]);

  const saveArticle = (article: NewsItem) => {
    setSavedArticles(prev => {
      if (prev.some(item => item.link === article.link)) return prev;
      return [article, ...prev];
    });
  };

  const removeArticle = (url: string) => {
    setSavedArticles(prev => prev.filter(item => item.link !== url));
  };

  const isSaved = (url: string) => {
    return savedArticles.some(item => item.link === url);
  };

  return (
    <SavedNewsContext.Provider value={{ savedArticles, saveArticle, removeArticle, isSaved }}>
      {children}
    </SavedNewsContext.Provider>
  );
};

export const useSavedNews = () => {
  const context = useContext(SavedNewsContext);
  if (context === undefined) {
    throw new Error('useSavedNews must be used within a SavedNewsProvider');
  }
  return context;
};