import { defineEventHandler, getRequestURL } from 'h3';
import { assertAdsDashboardAccess } from '~/server/utils/ads';

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  
  // Protegemos únicamente los endpoints y vistas sensibles relacionadas con Ads Dashboard.
  // assertAdsDashboardAccess lanzará 401 si no supera Basic Auth o IP Allowed, forzando 
  // al navegador a levantar el diálogo nativo de credenciales.
  if (url.pathname.startsWith('/ads-dashboard') || url.pathname.startsWith('/api/ads/dashboard')) {
    await assertAdsDashboardAccess(event);
  }
});