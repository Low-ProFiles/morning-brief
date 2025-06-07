// hooks/useFetchNews.ts
import { useState, useEffect } from "react";
import { NewsItem } from "../types/common/newsItem";
import { fetchFromGuardianAPI } from "../services/guardian/getNews";
import { apiCategoryMapping, StandardCategory } from "../config/apiParameterMapping";

type NewsItemWithCategory = NewsItem & { category: StandardCategory };

const CACHE_NAME = "news-api-cache";
const CACHE_TTL = 1000 * 60 * 5;
const REQUEST_DELAY_MS = 100;

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
    } catch {}
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
  const guardianService = {
    name: "GuardianAPI",
    fn: fetchFromGuardianAPI,
    key: "guardian" as const,
  };

  for (const category of categories) {
    const param = apiCategoryMapping[category]?.[guardianService.key];
    if (!param) {
      continue;
    }

    const paramString = Array.isArray(param) ? param.join(",") : param;
    const cacheKey = `${guardianService.name}_${category}_${paramString}`;

    try {
      const items = await fetchWithCache<NewsItem>(cacheKey, () => guardianService.fn(param));
      all.push(...items.map((i) => ({ ...i, category })));
      await new Promise((r) => setTimeout(r, REQUEST_DELAY_MS));
    } catch (err) {
      console.error(
        `Error fetching news for standard category "${category}" from ${guardianService.name}:`,
        err,
      );
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
