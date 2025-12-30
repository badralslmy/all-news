export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content?: string;
  thumbnail?: string;
  sourceId: string;
  author?: string;
}

export interface FeedSource {
  id: string;
  name: string; // Display name
  url: string; // RSS URL
  category: 'general' | 'health' | 'business' | 'lifestyle' | 'tech' | 'sports' | 'gaming';
  color: string; // Color theme for the section
}

export interface DeveloperProfile {
  name: string;
  role: string;
  bio: string;
  email: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}