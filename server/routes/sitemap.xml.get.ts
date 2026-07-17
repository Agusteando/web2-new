import { setHeader } from 'h3'
import { fetchBlogFeed } from '~/server/utils/blog'
import { fetchNoticias } from '~/server/utils/news'

const STATIC_ROUTES = [
  '/',
  '/acerca-de-institutos',
  '/blog-iecs-iedis',
  '/campus',
  '/convenios',
  '/daycare',
  '/elementary-school',
  '/escuela-padres',
  '/middle-school',
  '/noticias',
  '/politica-privacidad',
  '/preguntas-frecuentes',
  '/preschool',
  '/talleres-inteligentes',
  '/terminos-condiciones',
  '/ubicaciones',
  '/vida-husky',
  '/voluntarios',
]

const escapeXml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;')

const asIsoDate = (value?: string | null) => {
  if (!value) return undefined
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString()
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public.siteUrl || 'https://casitaiedis.edu.mx').replace(/\/+$/, '')

  let noticias: Awaited<ReturnType<typeof fetchNoticias>> = []
  let blogFeed: Awaited<ReturnType<typeof fetchBlogFeed>> = {
    configured: false,
    generatedAt: null,
    items: [],
  }

  try {
    noticias = await fetchNoticias()
  } catch (error) {
    console.warn('[Sitemap] News could not be loaded; serving without news detail routes.', error)
  }

  try {
    blogFeed = await fetchBlogFeed()
  } catch (error) {
    console.warn('[Sitemap] Blog could not be loaded; serving without blog detail routes.', error)
  }

  const staticEntries = STATIC_ROUTES.map((path) => {
    const isDynamicIndex = path === '/' || path === '/noticias' || path === '/blog-iecs-iedis'
    return `
  <url>
    <loc>${escapeXml(`${siteUrl}${path}`)}</loc>
    <changefreq>${isDynamicIndex ? 'daily' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : isDynamicIndex ? '0.8' : '0.6'}</priority>
  </url>`
  }).join('')

  const newsEntries = noticias.map((noticia) => {
    const lastmod = asIsoDate(noticia.fecha)
    return `
  <url>
    <loc>${escapeXml(`${siteUrl}/noticias/${noticia.id}`)}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  }).join('')

  const blogEntries = blogFeed.items.map((post) => {
    const lastmod = asIsoDate(post.updatedAt || post.publishedAt)
    return `
  <url>
    <loc>${escapeXml(`${siteUrl}/blog-iecs-iedis/${post.slug}`)}</loc>${lastmod ? `
    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  }).join('')

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=300, stale-while-revalidate=3600')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticEntries}${newsEntries}${blogEntries}
</urlset>`
})
