import React, { createContext, useContext, useState, useEffect } from 'react';
import { FeedSource } from '../types';
import { INITIAL_FEEDS } from '../constants';

interface FeedContextType {
  feeds: FeedSource[];
  addFeed: (feed: FeedSource) => void;
  updateFeed: (id: string, updatedFeed: FeedSource) => void;
  removeFeed: (id: string) => void;
  reorderFeeds: (fromIndex: number, toIndex: number) => void;
  resetFeeds: () => void;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [feeds, setFeeds] = useState<FeedSource[]>(() => {
    try {
      const saved = localStorage.getItem('allnews_feeds');
      return saved ? JSON.parse(saved) : INITIAL_FEEDS;
    } catch (e) {
      return INITIAL_FEEDS;
    }
  });

  useEffect(() => {
    localStorage.setItem('allnews_feeds', JSON.stringify(feeds));
  }, [feeds]);

  const addFeed = (feed: FeedSource) => {
    setFeeds(prev => [...prev, feed]);
  };

  const updateFeed = (id: string, updatedFeed: FeedSource) => {
    setFeeds(prev => prev.map(f => f.id === id ? updatedFeed : f));
  };

  const removeFeed = (id: string) => {
    setFeeds(prev => prev.filter(f => f.id !== id));
  };

  const reorderFeeds = (fromIndex: number, toIndex: number) => {
    setFeeds(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  };

  const resetFeeds = () => {
    setFeeds(INITIAL_FEEDS);
  };

  return (
    <FeedContext.Provider value={{ feeds, addFeed, updateFeed, removeFeed, reorderFeeds, resetFeeds }}>
      {children}
    </FeedContext.Provider>
  );
};

export const useFeeds = () => {
  const context = useContext(FeedContext);
  if (context === undefined) {
    throw new Error('useFeeds must be used within a FeedProvider');
  }
  return context;
};