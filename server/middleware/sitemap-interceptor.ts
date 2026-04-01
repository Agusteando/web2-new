import { defineEventHandler, getRequestURL, sendRedirect, proxyRequest } from 'h3';
import { getSitemapOverrides } from '~/server/utils/sitemapStore';

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  
  // Ignoramos activos estáticos y llamadas API para no afectar el rendimiento
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_nuxt/') || url.pathname.startsWith('/assets/')) {
    return;
  }
  
  const overrides = await getSitemapOverrides();
  const over = overrides[url.pathname];
  
  if (over && over.type !== 'default') {
    if (over.type === 'redirect') {
      return sendRedirect(event, over.target, over.statusCode || 302);
    } else if (over.type === 'proxy') {
      // Si el target es relativo, lo convertimos en absoluto resolviendo contra el propio host
      // Esto permite "espejear" rutas internas transparentemente manteniendo la URL original en el navegador.
      let target = over.target;
      if (target.startsWith('/')) {
        target = `${url.protocol}//${url.host}${target}`;
      }
      return proxyRequest(event, target);
    }
  }
});