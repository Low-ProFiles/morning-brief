import React, { useEffect, useState } from 'react';
import { NewsItem } from "../../types/common/newsItem";
import { useCalculateNewsImportance } from "../../hooks/useCalculateNewsImportance";
import { stripHtml } from "../../utils/stripHtml";
import { summarizeLargeText } from "../../services/huggingface/summarize";
import { speakText } from "../../utils/textToSpeech";
import { deeplTranslate } from "../../services/deepl/translate";

interface Props {
  news: NewsItem[];
}

export const NewsImportanceList: React.FC<Props> = ({ news }) => {
  const { results, loading } = useCalculateNewsImportance(news);
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!results) return;

    results.forEach(r => {
      const raw = stripHtml(JSON.stringify(r.body));
      if (!summaries[r.id]) {
        summarizeLargeText(raw)
          .then(summary => {
            setSummaries(prev => ({ ...prev, [r.id]: summary }));
            return deeplTranslate(summary);
          })
          .then(translated => {
            setTranslations(prev => ({ ...prev, [r.id]: translated }));
          })
          .catch(err => {
            console.error('Summarization/Translation error:', err);
            setSummaries(prev => ({ ...prev, [r.id]: raw }));
          });
      }
    });
  }, [results]);

  if (loading) return <div>분류 중…</div>;

  return (
    <ul>
      {results?.map(r => (
        <li key={r.id} style={{ marginBottom: '1rem' }}>
          <strong>{r.level.toUpperCase()}</strong> (score: {r.score.toFixed(2)})
          <br />
          <button
            onClick={() => {
              const textToSpeak = translations[r.id] || summaries[r.id] || stripHtml(JSON.stringify(r.body));
              speakText(textToSpeak);
            }}
          >
            🔊 듣기
          </button>
           <button
            onClick={() => {
              if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
            }}
            style={{ marginLeft: '0.5rem' }}
          >
            ⏹️ 중지
          </button>
          <br />
          <a href={r.url} target="_blank" rel="noopener noreferrer">
            {r.title}
          </a>
          <p>
            { stripHtml(JSON.stringify(r.body))}
          </p>
          <p>{summaries[r.id] || '요약 중…'}</p>
        </li>
      ))}
    </ul>
  );
};
