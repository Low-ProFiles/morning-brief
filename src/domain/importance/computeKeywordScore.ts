import { KEYWORD_LIST } from "../../config";
import { NewsItem } from "../../types/common/newsItem";

export const computeKeywordScore = (item: NewsItem): number => {
  const text = (item.title + ' ' + item.body).toLowerCase();
  const count = KEYWORD_LIST.reduce((sum, kw) =>
    sum + (text.split(kw.toLowerCase()).length - 1), 0);
  // 예: 문장 길이 대비 키워드 빈도 정규화
  return Math.min(1, count / 10);
}
