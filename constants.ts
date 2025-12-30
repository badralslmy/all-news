// Edit Version: 1.0.5
import { FeedSource, DeveloperProfile, NewsItem } from './types';

export const APP_VERSION = '1.0.5';

export const INITIAL_FEEDS: FeedSource[] = [
  {
    id: 'alarabiya',
    name: 'العربية',
    url: 'https://www.alarabiya.net/.mrss/ar/last-24-hours.xml',
    category: 'general',
    color: 'red'
  },
  {
    id: 'sabq',
    name: 'صحيفة سبق',
    url: 'https://sabq.org/rss/all.xml',
    category: 'general',
    color: 'indigo'
  },
  {
    id: 'argaam',
    name: 'أرقام',
    url: 'https://www.argaam.com/ar/rss',
    category: 'business',
    color: 'teal'
  },
  {
    id: 'tech-wd',
    name: 'عالم التقنية',
    url: 'https://www.tech-wd.com/wd/feed/',
    category: 'tech',
    color: 'blue'
  }
];

export const FEED_LIBRARY: (FeedSource & { domain: string })[] = [
  // --- Arabic News ---
  {
    id: 'alarabiya',
    name: 'العربية',
    url: 'https://www.alarabiya.net/.mrss/ar/last-24-hours.xml',
    category: 'general',
    color: 'red',
    domain: 'alarabiya.net'
  },
  {
    id: 'sabq',
    name: 'صحيفة سبق',
    url: 'https://sabq.org/rss/all.xml',
    category: 'general',
    color: 'indigo',
    domain: 'sabq.org'
  },
  {
    id: 'okaz',
    name: 'صحيفة عكاظ',
    url: 'https://www.okaz.com.sa/rss/feed',
    category: 'general',
    color: 'green',
    domain: 'okaz.com.sa'
  },
  {
    id: 'akhbar24',
    name: 'أخبار 24',
    url: 'https://akhbar24.argaam.com/rss',
    category: 'general',
    color: 'teal',
    domain: 'akhbar24.argaam.com'
  },
  {
    id: 'alriyadh',
    name: 'جريدة الرياض',
    url: 'https://www.alriyadh.com/rss',
    category: 'general',
    color: 'blue',
    domain: 'alriyadh.com'
  },
  {
    id: 'skynewsarabia',
    name: 'سكاي نيوز عربية',
    url: 'https://www.skynewsarabia.com/rss/feeds.xml',
    category: 'general',
    color: 'red',
    domain: 'skynewsarabia.com'
  },
  {
    id: 'bbcarabic',
    name: 'BBC عربي',
    url: 'http://feeds.bbci.co.uk/arabic/rss.xml',
    category: 'general',
    color: 'red',
    domain: 'bbc.com'
  },
  {
    id: 'aljazeera',
    name: 'الجزيرة',
    url: 'https://www.aljazeera.net/aljazeerarss/a7c186be-1baa-4bd4-9d80-a848e02f2fa0/128e6d9d-9071-419b-a010-8b4e727e0281',
    category: 'general',
    color: 'indigo',
    domain: 'aljazeera.net'
  },
  {
    id: 'aawsat',
    name: 'الشرق الأوسط',
    url: 'https://aawsat.com/feed',
    category: 'general',
    color: 'green',
    domain: 'aawsat.com'
  },

  // --- Tech & Business (Arabic) ---
  {
    id: 'argaam',
    name: 'أرقام',
    url: 'https://www.argaam.com/ar/rss',
    category: 'business',
    color: 'teal',
    domain: 'argaam.com'
  },
  {
    id: 'tech-wd',
    name: 'عالم التقنية',
    url: 'https://www.tech-wd.com/wd/feed/',
    category: 'tech',
    color: 'blue',
    domain: 'tech-wd.com'
  },
  {
    id: 'unlimit-tech',
    name: 'التقنية بلا حدود',
    url: 'https://unlimit-tech.com/feed/',
    category: 'tech',
    color: 'purple',
    domain: 'unlimit-tech.com'
  },

  // --- Lifestyle & Health (Arabic) ---
  {
    id: 'hima',
    name: 'مجلة هي',
    url: 'https://www.hiamag.com/rss',
    category: 'lifestyle',
    color: 'pink',
    domain: 'hiamag.com'
  },
  {
    id: 'sayidaty',
    name: 'مجلة سيدتي',
    url: 'https://www.sayidaty.net/rss',
    category: 'lifestyle',
    color: 'pink',
    domain: 'sayidaty.net'
  },
  {
    id: 'moh-sa',
    name: 'وزارة الصحة',
    // Using a known reliable endpoint that often redirects or serves the main feed
    url: 'https://www.moh.gov.sa/RSS/Pages/RSS.aspx', 
    category: 'health',
    color: 'emerald',
    domain: 'moh.gov.sa'
  },

  // --- Global News (English) ---
  {
    id: 'bbc-news',
    name: 'BBC News',
    url: 'https://feeds.bbci.co.uk/news/rss.xml',
    category: 'general',
    color: 'red',
    domain: 'bbc.co.uk'
  },
  {
    id: 'cnn',
    name: 'CNN',
    url: 'http://rss.cnn.com/rss/edition.rss',
    category: 'general',
    color: 'red',
    domain: 'cnn.com'
  },
  {
    id: 'nytimes',
    name: 'NY Times',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    category: 'general',
    color: 'slate',
    domain: 'nytimes.com'
  },

  // --- Tech & Gaming (English) ---
  {
    id: 'theverge',
    name: 'The Verge',
    url: 'https://www.theverge.com/rss/index.xml',
    category: 'tech',
    color: 'indigo',
    domain: 'theverge.com'
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    category: 'tech',
    color: 'green',
    domain: 'techcrunch.com'
  },
  {
    id: 'wired',
    name: 'Wired',
    url: 'https://www.wired.com/feed/rss',
    category: 'tech',
    color: 'slate',
    domain: 'wired.com'
  },
  {
    id: 'mashable',
    name: 'Mashable',
    url: 'https://mashable.com/feed',
    category: 'tech',
    color: 'blue',
    domain: 'mashable.com'
  },
  {
    id: 'ign',
    name: 'IGN',
    url: 'https://feeds.feedburner.com/ign/all',
    category: 'gaming',
    color: 'red',
    domain: 'ign.com'
  },
  {
    id: 'gamespot',
    name: 'GameSpot',
    url: 'https://www.gamespot.com/feeds/mashup/',
    category: 'gaming',
    color: 'yellow',
    domain: 'gamespot.com'
  },

  // --- Sports (English) ---
  {
    id: 'espn',
    name: 'ESPN',
    url: 'https://www.espn.com/espn/news/rss',
    category: 'sports',
    color: 'red',
    domain: 'espn.com'
  }
];

export const DEVELOPER_INFO: DeveloperProfile = {
  name: 'بدر السلمي',
  role: 'مالك ومطور الموقع',
  bio: 'مطور واجهات أمامية وخبير في تقنيات الويب الحديثة. أهدف إلى توفير منصة إخبارية موثوقة تجمع المصادر الرسمية في المملكة العربية السعودية في مكان واحد.',
  email: 'contact@badralsulami.com',
  socials: {
    github: 'https://github.com/badralslmy'
  }
};

export const MOCK_NEWS: Record<string, NewsItem[]> = {
  'alarabiya': [
    {
      title: 'السعودية تعلن عن مشاريع ضخمة في الطاقة المتجددة',
      link: '#',
      pubDate: new Date().toUTCString(),
      description: 'أعلنت المملكة عن خطط جديدة لتوسيع نطاق الطاقة الشمسية والرياح لتحقيق رؤية 2030.',
      sourceId: 'alarabiya',
      thumbnail: 'https://picsum.photos/800/600?random=1'
    }
  ]
};