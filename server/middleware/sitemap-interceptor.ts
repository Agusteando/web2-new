import { defineEventHandler, getRequestURL, sendRedirect, proxyRequest } from 'h3';
import { getSitemapOverrides } from '~/server/utils/sitemapStore';

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  
  // Ignoramos activos estáticos y llamadas API temprano para proteger el rendimiento de Vercel
  if (
    url.pathname.startsWith('/api/') || 
    url.pathname.startsWith('/_nuxt/') || 
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/favicon')
  ) {
    return;
  }
  
  try {
    const overrides = await getSitemapOverrides();
    const over = overrides[url.pathname];
    
    if (over && over.type !== 'default') {
      if (over.type === 'redirect') {
        return sendRedirect(event, over.target, over.statusCode || 302);
      } else if (over.type === 'proxy') {
        // Si el target es relativo, lo convertimos en absoluto resolviendo contra el propio host
        let target = over.target;
        if (target.startsWith('/')) {
          target = `${url.protocol}//${url.host}${target}`;
        }
        return proxyRequest(event, target);
      }
    }
  } catch (e) {
    // Si la DB falla temporalmente (max connections, timeout), fallamos limpiamente 
    // y dejamos que la petición continúe hacia Nuxt para evitar tirar la página con Error 500
    console.error('[Sitemap Interceptor] Error apply overrides:', e);
  }
});