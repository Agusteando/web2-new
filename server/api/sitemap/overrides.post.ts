import { defineEventHandler, readBody, createError } from 'h3';
import { saveSitemapOverride } from '~/server/utils/sitemapStore';

export default defineEventHandler(async (event) => {
  // Autenticación manejada globalmente por server/middleware/ads-auth.ts
  const body = await readBody(event);
  if (!body || !body.path || !body.override) {
    throw createError({ statusCode: 400, message: 'Invalid payload' });
  }
  await saveSitemapOverride(body.path, body.override);
  return { success: true };
});