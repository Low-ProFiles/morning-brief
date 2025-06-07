// hooks/useFetchNews.ts
import { useState, useEffect } from "react";
import { NewsItem } from "../types/common/newsItem";
import { fetchFromNewsAPI } from "../services/news/getNews";
import { fetchFromNewYorkTimes } from "../services/new-york-times/getNews";
import { fetchFromGuardianAPI } from "../services/guardian/getNews";
import { apiCategoryMapping, StandardCategory } from "../config/apiParameterMapping";

type NewsItemWithCategory = NewsItem & { category: StandardCategory };

const CACHE_NAME = "news-api-cache";
const CACHE_TTL = 1000 * 60 * 5; // 5분
const REQUEST_DELAY_MS = 1000;

// Cache Storage에 저장된 JSON이 { timestamp, data } 형태라고 가정
async function fetchWithCache<T>(key: string, fetcher: () => Promise<T[]>): Promise<T[]> {
  const cache = await caches.open(CACHE_NAME);
  const req = new Request(key);
  const resp = await cache.match(req);

  if (resp) {
    try {
      const { timestamp, data } = (await resp.json()) as {
        timestamp: number;
        data: T[];
      };
      if (Date.now() - timestamp < CACHE_TTL) {
        return data;
      }
    } catch {
      // parsing 에러 나면 그냥 새로 fetch
    }
  }

  const fresh = await fetcher();
  const wrapped = new Response(JSON.stringify({ timestamp: Date.now(), data: fresh }));
  await cache.put(req, wrapped.clone());
  return fresh;
}

async function fetchNewsFromServices(
  categories: StandardCategory[],
): Promise<NewsItemWithCategory[]> {
  const all: NewsItemWithCategory[] = [];
  const services = [
    { name: "NewsAPI", fn: fetchFromNewsAPI, key: "newsapi" as const },
    { name: "NewYorkTimes", fn: fetchFromNewYorkTimes, key: "nytimes" as const },
    { name: "GuardianAPI", fn: fetchFromGuardianAPI, key: "guardian" as const },
  ];

  for (const category of categories) {
    for (const svc of services) {
      const param = apiCategoryMapping[category]?.[svc.key];
      if (!param) continue;

      // 캐시 키: 서비스이름_카테고리_파라미터
      const paramString = Array.isArray(param) ? param.join(",") : param;
      const cacheKey = `${svc.name}_${category}_${paramString}`;

      const items = await fetchWithCache<NewsItem>(cacheKey, () => svc.fn(param));
      all.push(...items.map((i) => ({ ...i, category })));
      await new Promise((r) => setTimeout(r, REQUEST_DELAY_MS));
    }
  }
  return all;
}

export function useFetchNews(standardCategories: StandardCategory[]) {
  const [data, setData] = useState<NewsItemWithCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (standardCategories.length === 0) {
      setData([]);
      return;
    }
    let canceled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchNewsFromServices(standardCategories);
        if (!canceled) setData(result);
      } catch (e) {
        if (!canceled) setError(e);
      } finally {
        if (!canceled) setIsLoading(false);
      }
    };

    load();
    return () => {
      canceled = true;
    };
  }, [standardCategories]);

  return { data, isLoading, error };
}
