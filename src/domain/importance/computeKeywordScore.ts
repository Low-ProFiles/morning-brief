import { KEYWORD_LIST } from "../../config";
import { NewsItem } from "../../types/common/newsItem";

export const computeKeywordScore = (item: NewsItem): number => {
  const text = (item.title + ' ' + item.body).toLowerCase();
  const count = KEYWORD_LIST.reduce((sum, kw) =>
  sum + (text.split(kw.toLowerCase()).length - 1), 0);
  return Math.min(1, count / 10);
}
