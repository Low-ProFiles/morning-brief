// src/services/importanceService.ts
import { NewsItem } from '../types/newsItem';
import { ImportanceResult } from '../types/importanceResult';
import { KEYWORD_LIST, SOURCE_RELIABILITY, WEIGHTS } from '../config';
import { fetchSocialScore } from '../fetching/naverService';
import { differenceInHours, parseISO } from 'date-fns';

const computeKeywordScore = (item: NewsItem): number => {
  const text = (item.title + ' ' + item.body).toLowerCase();
  const count = KEYWORD_LIST.reduce((sum, kw) =>
    sum + (text.split(kw.toLowerCase()).length - 1), 0);
  // 예: 문장 길이 대비 키워드 빈도 정규화
  return Math.min(1, count / 10);
}

const computeSourceScore = (item: NewsItem): number => {
  return SOURCE_RELIABILITY[item.source] ?? 0.5;
}

const computeRecencyScore = (item: NewsItem): number => {
  const hours = differenceInHours(new Date(), parseISO(item.publishedAt));
  // 최근 24시간 이내면 1, 48시간 이내면 0.5, 그 외 0.1
  if (hours <= 24) return 1;
  if (hours <= 48) return 0.5;
  return 0.1;
}

const computeLengthScore = (item: NewsItem): number => {
  const len = item.body.length;
  // 200~2000자 사이 이상적인 길이라고 가정
  if (len < 200) return len / 200;
  if (len > 2000) return Math.max(0, (3000 - len) / 1000);
  return 1;
}

export const calculateNewsImportance = async (
  items: NewsItem[]
): Promise<ImportanceResult[]> => {
  const results: ImportanceResult[] = [];

  for (const item of items) {
    const [keyword, source, recency, length, social] = await Promise.all([
      computeKeywordScore(item),
      Promise.resolve(computeSourceScore(item)),
      Promise.resolve(computeRecencyScore(item)),
      Promise.resolve(computeLengthScore(item)),
      // 소셜 스코어는 title 기준으로 대표 키워드 하나 가져와 계산 (예시)
      fetchSocialScore(KEYWORD_LIST[0]),
    ]);

    const score =
      WEIGHTS.keyword * keyword +
      WEIGHTS.source * source +
      WEIGHTS.recency * recency +
      WEIGHTS.length * length +
      WEIGHTS.social * social;

    let level: ImportanceResult['level'];
    if (score >= 0.7) level = 'high';
    else if (score >= 0.4) level = 'medium';
    else level = 'low';

    // item={body, category, id, publishedAt, source, title, url}
    results.push({ id: item.id, title: item.title, url: item.url, body: item.body, score, level });
  }

  return results;
}
