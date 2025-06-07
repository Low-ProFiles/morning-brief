export type StandardCategory =
  | "politics"
  | "business"
  | "society"
  | "culture"
  | "environment"
  | "sport"
  | "science"
  | "fashion";

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
  | "politics"
  | "business"
  | "society"
  | "culture"
  | "environment"
  | "sport"
  | "science"
  | "fashion";

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
  business: {
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
  environment: {
    newsapi: "sports",
    nytimes: "sports",
    guardian: "environment",
  },
  sport: {
    newsapi: "sports",
    nytimes: "sports",
    guardian: "sport",
  },
  science: {
    newsapi: "sports",
    nytimes: "sports",
    guardian: "science",
  },
  fashion: {
    newsapi: "sports",
    nytimes: "sports",
    guardian: "fashion",
  },
};
