// server/trends.ts
import express from 'express'
import cors    from 'cors'
import googleTrends from 'google-trends-api'

const app = express()
app.use(cors(), express.json())

// 간단 캐시(1시간) + 에러 처리
const cache = new Map<string, { score: number; expires: number }>()

app.post('/api/trends', async (req, res) => {
  const { keyword } = req.body as { keyword: string }
  const now = Date.now()

  // 1시간 캐시
  const hit = cache.get(keyword)
  if (hit && hit.expires > now) {
    return res.json({ score: hit.score })
  }

  const endDate   = new Date()
  const startDate = new Date(endDate)
  startDate.setDate(endDate.getDate() - 7)

  try {
    const raw = await googleTrends.interestOverTime({
      keyword,
      startTime: startDate,
      endTime:   endDate,
    })
    const parsed = JSON.parse(raw) as {
      default: { timelineData: Array<{ value: number[] }> }
    }
    const values = parsed.default.timelineData.map((d) => d.value[0])
    const avg    = values.reduce((a, b) => a + b, 0) / values.length
    const score  = Math.min(1, avg / 100)

    cache.set(keyword, { score, expires: now + 1000 * 60 * 60 })
    res.json({ score })
  } catch (err: any) {
    console.error('Trends error', err)
    res.status(502).json({ error: 'Trends fetch failed' })
  }
})

app.listen(4000, () =>
  console.log('Trends proxy listening on http://localhost:4000/api/trends')
)
