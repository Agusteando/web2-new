import { getQuery } from 'h3'
import { fetchBlogFeed } from '~/server/utils/blog'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const requestedLimit = Number(query.limit)
  const limit = Number.isFinite(requestedLimit)
    ? Math.max(1, Math.min(100, requestedLimit))
    : undefined
  const featuredOnly = String(query.featured || '').toLowerCase() === 'true'

  const feed = await fetchBlogFeed()
  const filtered = featuredOnly
    ? feed.items.filter((post) => post.featured)
    : feed.items

  return {
    configured: feed.configured,
    generatedAt: feed.generatedAt,
    count: filtered.length,
    items: limit ? filtered.slice(0, limit) : filtered,
  }
})
