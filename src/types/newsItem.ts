export interface NewsItem {
  id: string;
  source: 'newsapi' | 'nytimes' | 'guardian';
  category: string;
  title: string;
  body: string;
  url: string;
  publishedAt: string;
}
