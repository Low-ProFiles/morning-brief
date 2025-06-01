// src/services/importanceService.ts
import { NewsItem } from '../../types/common/newsItem';
import { ImportanceResult } from '../../types/naver';
import { KEYWORD_LIST, WEIGHTS } from '../../config';
import { fetchSocialScore } from '../../services/naver/importance';
import { computeKeywordScore } from '../../domain/importance/computeKeywordScore';
import { computeLengthScore } from '../../domain/importance/computeLengthScore';
import { computeRecencyScore } from '../../domain/importance/computeRecencyScore';
import { computeSourceScore } from '../../domain/importance/computeSourceScore';


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
      // 소셜 스코어는 title 기준으로 대표 키워드 하나 가져와 계산
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
