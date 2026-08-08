import { defineEventHandler, getQuery, setResponseHeader } from 'h3'
import {
  getSummerReviewStats,
  listSummerReviews,
  type SummerReviewProgram,
} from '~/server/utils/summerReviews'

const CYCLE_YEAR = 2026

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'private, no-store')

  const query = getQuery(event)
  const program: SummerReviewProgram | undefined = query.program === 'clinica'
    ? 'clinica'
    : query.program === 'curso'
      ? 'curso'
      : undefined

  const [stats, reviews] = await Promise.all([
    getSummerReviewStats(CYCLE_YEAR),
    listSummerReviews(CYCLE_YEAR, { program, limit: 5000 }),
  ])

  return {
    cycleYear: CYCLE_YEAR,
    stats,
    reviews,
  }
})
