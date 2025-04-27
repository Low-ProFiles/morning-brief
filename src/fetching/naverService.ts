import axios from 'axios';

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID!;
const NAVER_CLIENT_SECRET = import.meta.env.VITE_NAVER_CLIENT_SECRET!;

// keyword 당 최근 7일 검색량 평균을 반환
export async function fetchSocialScore(keyword: string): Promise<number> {
  const res = await axios.post(
    '/api/naver/search',
    {
      startDate: '2025-04-20',
      endDate: '2025-04-27',
      timeUnit: 'date',
      keywordGroups: [{ groupName: keyword, keywords: [keyword] }],
    },
    {
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
        'Content-Type': 'application/json',
      },
    }
  );

  const data = res.data.results[0].data as { ratio: number }[];
  // 0~100 사이 ratio를 0~1로 정규화 (예시)
  const avg = data.reduce((sum, o) => sum + o.ratio, 0) / data.length;
  return Math.min(1, avg / 100);
}
