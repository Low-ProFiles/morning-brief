// src/services/news/getNews.ts
import axios from "axios";
import { NewsItem } from "../../types/common/newsItem";
import { NEWS_API_TOKEN } from "../../config/apiToken";
import { NEWS_API_URL } from "../../config/apiUrl";
import { StandardCategory } from "../../config/apiParameterMapping";

export async function fetchFromNewsAPI(category: StandardCategory): Promise<NewsItem[]> {
  try {
    const res = await axios.get(NEWS_API_URL, {
      params: { apiKey: NEWS_API_TOKEN, category, pageSize: 10 },
    });
    const articles = res.data?.articles;
    if (!articles || !Array.isArray(articles)) {
      return [];
    }
    return (
      articles.map((a: any) => ({
        id: `newsapi-${a.source?.id || a.title?.slice(0, 10)}-${a.publishedAt}`,
        source: "newsapi",
        category: category,
        title: a.title || "No Title",
        body: a.content || a.description || "",
        url: a.url || "#",
        publishedAt: a.publishedAt || new Date().toISOString(),
      })) || []
    );
  } catch (err) {
    console.error(`Error in fetchFromNewsAPI(${category}):`, err);
    throw err;
  }
}
