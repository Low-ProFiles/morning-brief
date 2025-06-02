import axios from 'axios';
import { NewsItem } from '../../types/common/newsItem';
import { NEWS_API_TOKEN } from '../../config/apiToken';
import { NEWS_API_URL } from '../../config/apiUrl';

export async function fetchFromNewsAPI(category: string): Promise<NewsItem[]> {
  const res = await axios.get(NEWS_API_URL, {
    params: { apiKey: NEWS_API_TOKEN, category, pageSize: 1 }
  });
  return res.data.articles?.map((a: any) => ({
    id: `newsapi-${a.source.id || a.title.slice(0,10)}`,
    source: 'newsapi',
    category,
    title: a.title,
    body: a.content || a.description || '',
    url: a.url,
    publishedAt: a.publishedAt,
  }));
}
