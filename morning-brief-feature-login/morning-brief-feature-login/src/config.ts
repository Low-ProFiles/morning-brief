// src/config.ts
export const KEYWORD_LIST = [
  '경제', '정치', '기술', '국제', '시장', '혁신', '투자', 'AI', '클라우드', '전망'
];

export const SOURCE_RELIABILITY: Record<string, number> = {
  newsapi: 0.8,
  nytimes: 1.0,
  guardian: 0.9,
};

export const WEIGHTS = {
  keyword: 0.3,
  source: 0.2,
  social: 0.2,
  recency: 0.2,
  length: 0.1,
};
