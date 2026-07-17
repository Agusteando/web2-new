export type BlogPost = {
  id: string
  slug: string
  status: string
  publishedAt: string
  updatedAt: string | null
  title: string
  description: string
  content: string
  thumbnail: string | null
  images: string[]
  category: string | null
  author: string
  featured: boolean
  order: number | null
  sourceUrl: string | null
}

export type BlogFeed = {
  configured: boolean
  generatedAt: string | null
  items: BlogPost[]
}

export const BLOG_FALLBACK_IMAGES = [
  '/assets/img/IECS-IEDIS IMAGES/ex-news-578x433.webp',
  '/assets/img/IECS-IEDIS IMAGES/ex-news2-578x433.webp',
  '/assets/img/IECS-IEDIS IMAGES/ex-news3-578x433.webp',
]

export const normalizeBlogImage = (value?: string | null) => {
  const image = typeof value === 'string' ? value.trim().replace(/\\/g, '/') : ''
  if (!image) return null
  if (/^https?:\/\//i.test(image)) return image
  if (image.startsWith('//')) return `https:${image}`
  return image.startsWith('/') ? image : `/${image}`
}

export const getBlogCover = (post?: Partial<BlogPost> | null, index = 0) => {
  return normalizeBlogImage(post?.thumbnail)
    || normalizeBlogImage(post?.images?.[0])
    || BLOG_FALLBACK_IMAGES[Math.abs(index) % BLOG_FALLBACK_IMAGES.length]
}

export const formatBlogDate = (value?: string | null) => {
  if (!value) return ''
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value

  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed)
}

export const toBlogIsoDate = (value?: string | null) => {
  if (!value) return undefined
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString()
}
