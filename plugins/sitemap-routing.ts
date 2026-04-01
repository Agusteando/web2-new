import { defineNuxtPlugin, useState } from '#app';
import { useRouter } from 'vue-router';

export default defineNuxtPlugin(async () => {
  // Inyección de estado SSR a SPA con latencia cero.
  // Evitamos consumir un endpoint expuesto resolviendo la tabla en el servidor durante el render inicial.
  const overrides = useState('sitemapOverrides', () => ({}));
  
  if (import.meta.server) {
    const { getSitemapOverrides } = await import('~/server/utils/sitemapStore');
    overrides.value = await getSitemapOverrides();
  }

  const router = useRouter();
  
  // Intercepción SPA para sincronizar el enrutamiento Vue con las reglas del servidor (Nitro)
  router.beforeEach((to, from, next) => {
    const over = overrides.value?.[to.path];
    
    if (over && over.type !== 'default') {
      if (over.type === 'redirect') {
        if (over.target.startsWith('http')) {
          if (import.meta.client) window.location.href = over.target;
          return false;
        }
        if (to.path !== over.target) {
          return next(over.target);
        }
      } else if (over.type === 'proxy') {
        // En SPA, un Proxy Transparente requiere recargar la vista para que el servidor 
        // intercepte la solicitud de red (sitemap-interceptor.ts) y entregue el contenido alterno.
        if (import.meta.client) {
          window.location.href = to.fullPath;
          return false;
        }
      }
    }
    next();
  });
});