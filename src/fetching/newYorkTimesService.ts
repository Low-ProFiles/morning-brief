import axios from 'axios';
import { NewsItem } from '../types/newsItem';
import { withRetry } from '../common/withRetry';

const NEW_YORK_TIMES_API_TOKEN = import.meta.env.VITE_NEW_YORK_TIMES_API_TOKEN;

const formatDate = (d: Date): string => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${y}${m}${dd}`
}

export const fetchFromNewYorkTimes = (category: string): Promise<NewsItem[]> => {
  const today        = new Date()
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(today.getDate() - 1)

  return withRetry(() =>
    axios
      .get<{
        response: { docs: Array<{
          uri: string
          headline: { main: string }
          abstract: string
          web_url: string
          pub_date: string
        }> }
      }>(
        'https://api.nytimes.com/svc/search/v2/articlesearch.json',
        {
          params: {
            'api-key': NEW_YORK_TIMES_API_TOKEN,
            fq:        `section_name:("${category}")`,
            sort:      'newest',
            begin_date: formatDate(sevenDaysAgo),
            end_date:   formatDate(today),
            page:       0,
          },
        }
      )
      .then(res =>
        res.data.response.docs.map(d => ({
          id:           `nyt-${d.uri}`,
          source:       'nytimes' as const,
          category,
          title:        d.headline.main,
          body:         d.abstract,
          url:          d.web_url,
          publishedAt:  d.pub_date,
        }))
      )
  )
}
