import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NewsItem } from './types/common/newsItem';
import { useFetchNews } from './hooks/useFetchNews';
import { NewsImportanceList } from './components/lists/newsImportanceList';
import BottomBar from './components/BottomBar';

import MyMain from './MyMain';
import NewsDetail from './NewsDetail';

export default function App() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    useFetchNews()
      .then((items: any) => setNews(items))
      .catch((e: any) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading news…</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>뉴스 중요도</h1>
              <NewsImportanceList news={news} />
            </>
          }
        />
        <Route path="/mytest" element={<MyMain />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
      <BottomBar />
    </>
  );
}
