import type { BlogFeed, BlogPost } from '~/utils/blog'

const BLOG_CACHE_SECONDS = 60 * 60 * 24
const PUBLISHED_STATUSES = new Set(['PUBLICADO', 'PUBLISHED', 'ACTIVO', 'ACTIVE'])

type UnknownRecord = Record<string, unknown>

const asRecord = (value: unknown): UnknownRecord => (
  value && typeof value === 'object' && !Array.isArray(value)
    ? value as UnknownRecord
    : {}
)

const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''

const asBoolean = (value: unknown) => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return value === 1
  return ['1', 'TRUE', 'SI', 'SÍ', 'YES', 'DESTACADO'].includes(asText(value).toUpperCase())
}

const asNumber = (value: unknown) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const asIsoDate = (value: unknown) => {
  const text = asText(value)
  if (!text) return ''
  const parsed = new Date(text)
  return Number.isNaN(parsed.getTime()) ? text : parsed.toISOString()
}

const slugify = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 120)

const splitImages = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map(asText).filter(Boolean)
  }

  return asText(value)
    .split(/[\n,|]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

const normalizePost = (value: unknown, index: number): BlogPost | null => {
  const row = asRecord(value)
  const title = asText(row.title ?? row.titulo)
  const content = asText(row.content ?? row.contenido)
  const description = asText(row.description ?? row.descripcion)
    || content.replace(/\s+/g, ' ').slice(0, 240)
  const status = asText(row.status ?? row.estatus).toUpperCase() || 'PUBLICADO'

  if (!title || !PUBLISHED_STATUSES.has(status)) return null

  const id = asText(row.id) || asText(row.sourcePostId ?? row.fuente_post_id) || String(index + 1)
  const slug = slugify(asText(row.slug) || title || id)
  if (!slug) return null

  const images = splitImages(row.images ?? row.imagenes ?? row.imagenes_urls)
  const thumbnail = asText(row.thumbnail ?? row.thumbnailUrl ?? row.thumbnail_url) || images[0] || null

  return {
    id,
    slug,
    status,
    publishedAt: asIsoDate(row.publishedAt ?? row.fecha ?? row.fecha_publicacion),
    updatedAt: asIsoDate(row.updatedAt ?? row.fecha_actualizacion) || null,
    title,
    description,
    content,
    thumbnail,
    images,
    category: asText(row.category ?? row.categoria) || null,
    author: asText(row.author ?? row.autor) || 'Equipo IECS-IEDIS',
    featured: asBoolean(row.featured ?? row.destacado),
    order: asNumber(row.order ?? row.orden),
    sourceUrl: asText(row.sourceUrl ?? row.fuente_url) || null,
  }
}

const normalizePayload = (payload: unknown, configured: boolean): BlogFeed => {
  const root = asRecord(payload)
  const sourceItems = Array.isArray(payload)
    ? payload
    : Array.isArray(root.items)
      ? root.items
      : Array.isArray(root.posts)
        ? root.posts
        : []

  const items = sourceItems
    .map(normalizePost)
    .filter((post): post is BlogPost => Boolean(post))
    .sort((left, right) => {
      if (left.featured !== right.featured) return left.featured ? -1 : 1
      const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER
      const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER
      if (leftOrder !== rightOrder) return leftOrder - rightOrder
      return new Date(right.publishedAt || 0).getTime() - new Date(left.publishedAt || 0).getTime()
    })

  return {
    configured,
    generatedAt: asIsoDate(root.generatedAt ?? root.generated_at) || null,
    items,
  }
}

const fetchBlogFeedCached = defineCachedFunction(async (sourceUrl: string): Promise<BlogFeed> => {
  const payload = await $fetch<unknown>(sourceUrl, {
    method: 'GET',
    retry: 1,
    timeout: 15_000,
    headers: {
      accept: 'application/json',
      'user-agent': 'IECS-IEDIS-Website/1.0',
    },
  })

  return normalizePayload(payload, true)
}, {
  maxAge: BLOG_CACHE_SECONDS,
  name: 'blog-google-sheet-feed',
  getKey: (sourceUrl: string) => sourceUrl,
})

export const fetchBlogFeed = async (): Promise<BlogFeed> => {
  const config = useRuntimeConfig()
  const sourceUrl = asText(config.blogGoogleExecUrl)

  if (!sourceUrl) {
    return { configured: false, generatedAt: null, items: [] }
  }

  try {
    return await fetchBlogFeedCached(sourceUrl)
  } catch (error) {
    console.error('[Blog IECS-IEDIS] Google Apps Script feed unavailable.', error)
    return { configured: true, generatedAt: null, items: [] }
  }
}

export const fetchBlogPostBySlug = async (slug: string) => {
  const normalizedSlug = slugify(slug)
  const feed = await fetchBlogFeed()
  return feed.items.find((post) => post.slug === normalizedSlug) || null
}
