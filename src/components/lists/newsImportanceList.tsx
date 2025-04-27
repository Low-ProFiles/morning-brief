import { NewsItem } from "../../types/newsItem";
import { useCalculateNewsImportance } from "../../hooks/useCalculateNewsImportance";
import { stripHtml } from "../../common/stripHtml";
import { useEffect, useState } from "react";
import { summarizeLargeText } from "../../fetching/huggingFaceService";

interface Props {
  news: NewsItem[];
}

export const NewsImportanceList = ({ news }: Props) => {
  const { results, loading } = useCalculateNewsImportance(news);
  const [summaries, setSummaries] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!results) return;

    results.forEach(r => {
      const rawText = stripHtml(JSON.stringify(r.body));
      // 이미 요약된 적이 없으면 호출
      if (!summaries[r.id]) {
        summarizeLargeText(rawText)
          .then((summary: any) => {
            setSummaries(prev => ({ ...prev, [r.id]: summary }));
          })
          .catch(() => {
            setSummaries(prev => ({ ...prev, [r.id]: rawText }));
          });
      }
    });
  }, [results]);

  if (loading) return <div>분류 중…</div>;

  return (
    <ul>
      {results?.map((r: any) => (
        <li key={r.id}>
          <strong>{r.level.toUpperCase()}</strong>{' '}
          (score: {r.score.toFixed(2)})
          <br />
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {r.title}
          </a>
          <br />
          {stripHtml(JSON.stringify(r.body))}
        </li>
      ))}
    </ul>
  );
}
