import { defineEventHandler } from 'h3';
import { getSitemapOverrides } from '~/server/utils/sitemapStore';

export default defineEventHandler(async () => {
  // Autenticación manejada globalmente por server/middleware/ads-auth.ts
  return await getSitemapOverrides();
});