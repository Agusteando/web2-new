import { defineEventHandler, getRequestURL } from 'h3';
import { assertAdsDashboardAccess } from '~/server/utils/ads';

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  
  // Protegemos unificadamente las superficies de control interno compartiendo la validación
  // de IP Allowlist + HTTP Basic Auth para forzar el diálogo nativo del navegador.
  if (
    url.pathname.startsWith('/ads-dashboard') || 
    url.pathname.startsWith('/api/ads/dashboard') ||
    url.pathname === '/sitemap' ||
    url.pathname.startsWith('/api/sitemap/overrides')
  ) {
    await assertAdsDashboardAccess(event);
  }
});