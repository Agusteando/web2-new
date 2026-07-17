export type PublicNoticia = {
  id: number
  fecha: string
  titulo: string
  contenido: string
  imagen: string | null
  fb?: string
}

export const formatNewsDate = (value?: string | null) => {
  if (!value) return ''

  try {
    return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(new Date(value))
  } catch {
    return String(value)
  }
}

export const normalizeNewsImage = (value?: string | null) => {
  if (!value) return null
  return /^https?:\/\//i.test(value) ? value : (value.startsWith('/') ? value : `/${value}`)
}

export const stripNewsHtml = (value?: string | null) => {
  if (!value) return ''

  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

export const getNewsExcerpt = (value?: string | null, maxLength = 180) => {
  const text = stripNewsHtml(value)
  if (text.length <= maxLength) return text

  const clipped = text.slice(0, maxLength + 1)
  const lastSpace = clipped.lastIndexOf(' ')
  return `${clipped.slice(0, lastSpace > 80 ? lastSpace : maxLength).trim()}…`
}

export const toIsoDate = (value?: string | null) => {
  if (!value) return undefined
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString()
}
