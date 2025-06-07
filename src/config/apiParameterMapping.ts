export type StandardCategory =
  | "politics"
  | "economy"
  | "society"
  | "culture"
  | "sports"
  | "general"
  | "health"
  | "science"
  | "technology";

type NewsAPICategory =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";
type NYTAPICategory =
  | "arts"
  | "business"
  | "movies"
  | "politics"
  | "science"
  | "sports"
  | "technology"
  | "world"
  | "us";
type GuardianAPICategory =
  | "news"
  | "sport"
  | "commentisfree"
  | "culture"
  | "politics"
  | "business"
  | "environment"
  | "technology"
  | "society";

export const apiCategoryMapping: {
  [key in StandardCategory]?: {
    newsapi?: NewsAPICategory;
    nytimes?: NYTAPICategory | NYTAPICategory[];
    guardian?: GuardianAPICategory;
  };
} = {
  politics: {
    newsapi: "general",
    nytimes: "politics",
    guardian: "politics",
  },
  economy: {
    newsapi: "business",
    nytimes: "business",
    guardian: "business",
  },
  society: {
    newsapi: "general",
    nytimes: "us",
    guardian: "society",
  },
  culture: {
    newsapi: "entertainment",
    nytimes: "arts",
    guardian: "culture",
  },
  sports: {
    newsapi: "sports",
    nytimes: "sports",
    guardian: "sport",
  },
};
