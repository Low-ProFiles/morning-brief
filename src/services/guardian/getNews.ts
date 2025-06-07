import axios from "axios";
import { NewsItem } from "../../types/common/newsItem";
import { GUARDIAN_API_TOKEN } from "../../config/apiToken";
import { GUARDIAN_API_URL } from "../../config/apiUrl";

import { apiCategoryMapping, StandardCategory } from "../../config/apiParameterMapping";

export async function fetchFromGuardianAPI(
  standardCategory: StandardCategory,
): Promise<NewsItem[]> {
  const guardianCategory = apiCategoryMapping[standardCategory]?.guardian;

  if (!guardianCategory) {
    return [];
  }

  try {
    const res = await axios.get(GUARDIAN_API_URL, {
      params: {
        "api-key": GUARDIAN_API_TOKEN,
        section: guardianCategory,
        "show-fields": "body,headline",
        "page-size": 10,
      },
    });
    return (
      res.data.response.results?.map((r: any) => ({
        id: `guardian-${r.id}`,
        source: "guardian",
        category: standardCategory,
        title: r.fields.headline,
        body: r.fields.body || "",
        url: r.webUrl,
        publishedAt: r.webPublicationDate,
      })) || []
    );
  } catch (err) {
    console.error(
      `Error in fetchFromGuardianAPI(${standardCategory} -> ${guardianCategory}):`,
      err,
    );
    throw err;
  }
}
