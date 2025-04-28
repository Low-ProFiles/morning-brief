import { NewsItem } from "../../types/common/newsItem";

export const computeLengthScore = (item: NewsItem): number => {
  const len = item.body.length;
  // 200~2000자 사이 이상적인 길이라고 가정
  if (len < 200) return len / 200;
  if (len > 2000) return Math.max(0, (3000 - len) / 1000);
  return 1;
}
