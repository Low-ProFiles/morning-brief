import axios from 'axios';
import { NewsItem } from '../types/newsItem';

const NEWS_API_TOKEN = import.meta.env.VITE_NEWS_API_TOKEN;


export async function fetchFromNewsAPI(category: string): Promise<NewsItem[]> {
  const res = await axios.get('https://newsapi.org/v2/top-headlines', {
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
