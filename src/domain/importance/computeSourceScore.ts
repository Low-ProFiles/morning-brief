import { SOURCE_RELIABILITY } from "../../config";
import { NewsItem } from "../../types/common/newsItem";

export const computeSourceScore = (item: NewsItem): number => {
  return SOURCE_RELIABILITY[item.source] ?? 0.5;
}
