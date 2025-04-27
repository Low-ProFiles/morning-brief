import axios from 'axios';
import { NewsItem } from '../types/newsItem';

const GUARDIAN_API_TOKEN = import.meta.env.VITE_GUARDIAN_API_TOKEN;

export async function fetchFromGuardianAPI(category: string): Promise<NewsItem[]> {
  const res = await axios.get('https://content.guardianapis.com/search', {
    params: {
      'api-key': GUARDIAN_API_TOKEN,
      section: category,
      'show-fields': 'body,headline',
      'page-size': 1,
    }
  });
  return res.data.response.results?.map((r: any) => ({
    id: `guardian-${r.id}`,
    source: 'guardian',
    category,
    title: r.fields.headline,
    body: r.fields.body,
    url: r.webUrl,
    publishedAt: r.webPublicationDate,
  }));
}
