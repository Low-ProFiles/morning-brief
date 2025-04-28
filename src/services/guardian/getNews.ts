import axios from 'axios';
import { NewsItem } from '../../types/common/newsItem';
import { GUARDIAN_API_TOKEN } from '../../config/apiToken'
import { GUARDIAN_API_URL } from '../../config/apiUrl';

export async function fetchFromGuardianAPI(category: string): Promise<NewsItem[]> {
  const res = await axios.get(GUARDIAN_API_URL, {
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
