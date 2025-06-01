import { useState, useEffect } from 'react';
import { NewsItem } from '../types/common/newsItem';
import { ImportanceResult } from '../types/naver';
import { calculateNewsImportance } from '../domain/importance/calculateNewsImportance';

export const useCalculateNewsImportance = (newsItems: NewsItem[]) => {
  const [results, setResults] = useState<ImportanceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!newsItems.length) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const data = await calculateNewsImportance(newsItems);
        if (!cancelled) setResults(data);
      } catch (e: any) {
        if (!cancelled) setError(e.message || 'Unknown error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [newsItems]);

  return { results, loading, error };
}
