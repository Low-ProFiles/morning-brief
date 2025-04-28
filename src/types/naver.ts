export interface ImportanceResult {
  id: string;
  title: string;
  url: string;
  body: string;
  score: number;
  level: 'high' | 'medium' | 'low';
}
