import { defineEventHandler } from 'h3';
import { getSitemapOverrides } from '~/server/utils/sitemapStore';

export default defineEventHandler(async () => {
  // Endpoint de solo lectura y sin protección Auth exclusivo para que 
  // el cliente SPA sepa cuándo abortar la navegación e invocar al proxy.
  try {
    return await getSitemapOverrides();
  } catch (e) {
    console.error('[Sitemap API] Error fetching public overrides:', e);
    return {};
  }
});