import { differenceInHours, parseISO } from 'date-fns';
import { NewsItem } from '../../types/common/newsItem';

export const computeRecencyScore = (item: NewsItem): number => {
  const hours = differenceInHours(new Date(), parseISO(item.publishedAt));
  // 최근 24시간 이내면 1, 48시간 이내면 0.5, 그 외 0.1
  if (hours <= 24) return 1;
  if (hours <= 48) return 0.5;
  return 0.1;
}
