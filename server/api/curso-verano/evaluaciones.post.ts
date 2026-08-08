import type { H3Event } from 'h3'
import {
  createError,
  defineEventHandler,
  getRequestHeader,
  getRequestURL,
  readBody,
  setResponseHeader,
} from 'h3'
import { saveSummerReview, type SummerReviewProgram } from '~/server/utils/summerReviews'

const CYCLE_YEAR = 2026
const MAX_COMMENT_LENGTH = 2000
const MAX_STUDENT_NAME_LENGTH = 120
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT = 30

interface RateBucket {
  count: number
  resetAt: number
}

const rateBuckets = new Map<string, RateBucket>()

const cleanText = (value: unknown, maxLength: number) => String(value ?? '')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, maxLength)

const cleanComment = (value: unknown) => String(value ?? '')
  .replace(/\r\n?/g, '\n')
  .trim()
  .slice(0, MAX_COMMENT_LENGTH)

const getClientIp = (event: H3Event) => {
  const forwarded = getRequestHeader(event, 'x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return getRequestHeader(event, 'x-real-ip') || event.node.req.socket.remoteAddress || 'unknown'
}

const assertSameOrigin = (event: H3Event) => {
  const origin = getRequestHeader(event, 'origin')
  if (!origin) return

  let originHost = ''
  try {
    originHost = new URL(origin).host
  } catch {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const requestHost = getRequestURL(event).host
  if (!requestHost || originHost !== requestHost) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
}

const assertRateLimit = (key: string) => {
  const now = Date.now()
  const current = rateBuckets.get(key)

  if (!current || current.resetAt <= now) {
    if (rateBuckets.size > 2000) {
      for (const [bucketKey, bucket] of rateBuckets) {
        if (bucket.resetAt <= now) rateBuckets.delete(bucketKey)
      }
    }

    rateBuckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return
  }

  current.count += 1
  if (current.count > RATE_LIMIT) {
    throw createError({ statusCode: 429, statusMessage: 'Too Many Requests' })
  }
}

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'private, no-store')
  assertSameOrigin(event)
  assertRateLimit(getClientIp(event))

  const body = await readBody<Record<string, unknown>>(event)
  const submissionKey = cleanText(body?.submissionId, 64)
  const studentName = cleanText(body?.studentName, MAX_STUDENT_NAME_LENGTH)
  const program: SummerReviewProgram = body?.program === 'clinica' ? 'clinica' : 'curso'
  const rating = Number(body?.rating)
  const comment = cleanComment(body?.comment)

  if (!/^[a-zA-Z0-9-]{16,64}$/.test(submissionKey)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid submission' })
  }

  if (studentName.length < 2 || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid evaluation' })
  }

  await saveSummerReview({
    submissionKey,
    cycleYear: CYCLE_YEAR,
    studentName,
    program,
    rating,
    comment,
  })

  return { ok: true }
})
