import { NewsItem } from '../types/newsItem'
import { fetchFromNewsAPI } from '../fetching/newsService'
import { fetchFromNewYorkTimes } from '../fetching/newYorkTimesService'
import { fetchFromGuardianAPI } from '../fetching/guardianService'

/** 불러올 카테고리 */
const DEFAULT_CATEGORIES = ['business'] as const
/** 각 요청 사이 1초 대기 */
const REQUEST_DELAY_MS = 1000
/** 쉬는 함수 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 순차 호출 + 딜레이 적용 버전
 */
export const useFetchNews = async (): Promise<NewsItem[]> => {
  const allNews: NewsItem[] = []

  for (const category of DEFAULT_CATEGORIES) {
    // 3개 서비스 함수를 배열로
    const services = [
      fetchFromNewsAPI,
      fetchFromNewYorkTimes,
      fetchFromGuardianAPI
    ] as const

    for (const svc of services) {
      try {
        const items = await svc(category)
        allNews.push(...items)
      } catch (err) {
        console.error(`Error in ${svc.name}(${category}):`, err)
      }
      // 호출량 제한을 위해 잠시 대기
      await delay(REQUEST_DELAY_MS)
    }
  }

  // 최신순 정렬 후 반환
  return allNews.sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  )
}
