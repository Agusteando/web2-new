import { defineEventHandler, getRequestURL, sendRedirect, proxyRequest } from 'h3';
import { getSitemapOverrides } from '~/server/utils/sitemapStore';

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  
  // Bypass temprano para estáticos, API y rutas ya prerenderizadas.
  // Esto garantiza que Vercel Free Tier no facture Serverless Functions por tráfico del lado público.
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
        let target = over.target;
        if (target.startsWith('/')) {
          target = `${url.protocol}//${url.host}${target}`;
        }
        return proxyRequest(event, target);
      }
    }
  } catch (e) {
    console.error('[Sitemap Interceptor] Error apply overrides:', e);
  }
});