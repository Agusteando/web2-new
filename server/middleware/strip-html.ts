import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'

/**
 * Redirige automáticamente todas las visitas de enlaces viejos 
 * (ej. /daycare.html) hacia su equivalente nativo en Vue (/daycare)
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  
  if (url.pathname.endsWith('.html') && url.pathname !== '/') {
    // Si entran a /index.html lo mandamos limpio al home
    if (url.pathname === '/index.html') {
      return sendRedirect(event, '/', 301)
    }
    // Para el resto de rutas (ej. /daycare.html -> /daycare)
    return sendRedirect(event, url.pathname.replace(/\.html$/, ''), 301)
  }
})