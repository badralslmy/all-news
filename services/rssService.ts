// Edit Version: 1.0.3
import { FeedSource, NewsItem } from '../types';
import { MOCK_NEWS } from '../constants';

// RSS to JSON proxy service
const RSS_TO_JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

export const fetchFeedItems = async (feed: FeedSource): Promise<NewsItem[]> => {
  const cacheKey = `allnews_cache_${feed.id}`;

  // 1. Check Cache
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      // If cache is valid (less than 10 minutes old)
      if (Date.now() - timestamp < CACHE_DURATION) {
        // console.log(`Serving ${feed.name} from cache`);
        return data;
      }
    }
  } catch (e) {
    console.warn('Cache parsing error', e);
  }

  // 2. Fetch Fresh Data
  try {
    const response = await fetch(`${RSS_TO_JSON_API}${encodeURIComponent(feed.url)}`);
    const data = await response.json();

    if (data.status === 'ok' && data.items) {
      const items: NewsItem[] = data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description,
        content: item.content || item.description, // Fallback to description if content is empty
        // Priority: Enclosure (High Res) > Thumbnail > Extracted from Desc > Random Fallback
        thumbnail: item.enclosure?.link || item.thumbnail || extractImageFromDescription(item.description) || `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`,
        sourceId: feed.id,
        author: item.author || feed.name
      }));

      // 3. Save to Cache
      try {
        localStorage.setItem(cacheKey, JSON.stringify({
          timestamp: Date.now(),
          data: items
        }));
      } catch (e) {
        console.warn('LocalStorage quota exceeded', e);
      }

      return items;
    } else {
      throw new Error('RSS Fetch status not ok');
    }
  } catch (error) {
    console.warn(`Failed to fetch real RSS for ${feed.name}`, error);
    
    // Only fall back to mock data if it's one of our initial demo feeds
    if (MOCK_NEWS[feed.id]) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mock = MOCK_NEWS[feed.id] || [];
                resolve([...mock, ...mock]);
            }, 500);
        });
    }

    // Try to return stale cache if fetch fails
    try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            const { data } = JSON.parse(cached);
            return data;
        }
    } catch(e) {}

    return [];
  }
};

export const fetchAllFeeds = async (feeds: FeedSource[]): Promise<NewsItem[]> => {
  const promises = feeds.map(feed => fetchFeedItems(feed));
  const results = await Promise.all(promises);
  return results.flat().sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
};

function extractImageFromDescription(html: string): string | undefined {
    if (!html) return undefined;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const img = doc.querySelector('img');
    return img?.src;
}