import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'

/**
 * Redirige automáticamente todas las visitas de enlaces viejos
 * (ej. /daycare.html) hacia su equivalente nativo en Vue (/daycare)
 * resolviendo el error 404 de Vue Router provocado por la extensión.
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  if (url.pathname.endsWith('.html') && url.pathname !== '/') {
    return sendRedirect(event, url.pathname.replace(/\.html$/, ''), 301)
  }
})