import { defineNuxtPlugin, useAsyncData, addRouteMiddleware, navigateTo } from '#app';

export default defineNuxtPlugin(async () => {
  // Descarga segura del mapa de rutas durante SSR y lo hidrata al cliente (SPA).
  // Usamos una ruta pública de solo lectura para no chocar con el Ads-Auth.
  const { data: overrides } = await useAsyncData('sitemapOverrides', () =>
    $fetch('/api/sitemap/public').catch(() => ({}))
  );

  // Intercepción SPA para sincronizar el enrutamiento Vue con las reglas del servidor (Nitro)
  // addRouteMiddleware es el estándar de Nuxt 3, evitando los errores de contexto de useRouter()
  addRouteMiddleware('sitemap-overrides', (to) => {
    const over = overrides.value?.[to.path];
    
    if (over && over.type !== 'default') {
      if (over.type === 'redirect') {
        if (over.target.startsWith('http')) {
          if (import.meta.client) {
            window.location.href = over.target;
          }
          return false; // Cancela la navegación SPA actual
        }
        if (to.path !== over.target) {
          return navigateTo(over.target, { redirectCode: over.statusCode || 302 });
        }
      } else if (over.type === 'proxy') {
        // En SPA, un Proxy Transparente requiere forzar una recarga estándar
        // para que Nitro intercepte la solicitud de red a bajo nivel.
        if (import.meta.client) {
          window.location.href = to.fullPath;
          return false;
        }
      }
    }
  }, { global: true });
});