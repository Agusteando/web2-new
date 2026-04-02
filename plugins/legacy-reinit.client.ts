export default defineNuxtPlugin((nuxtApp) => {
  // Cuando navegamos entre rutas en una SPA, los scripts jQuery/GSAP del DOM anterior pierden sus referencias.
  // Este plugin fuerza una recarga segura para garantizar que los efectos visuales (Three.js, Swiper, ScrollTrigger) 
  // se inicien perfectamente en cada vista como si fuera la web original.
  nuxtApp.hook('page:finish', () => {
    if (import.meta.client) {
      setTimeout(() => {
        // Failsafe 1: Evitar que el scroll quede bloqueado si un menú o loader anterior 
        // no limpió correctamente sus candados de desbordamiento en el body.
        document.body.style.removeProperty('overflow');

        // Failsafe 2: Forzar un evento nativo de redimensionamiento para despertar plugins
        // que calculan el viewport antes del cambio de ruta SPA.
        window.dispatchEvent(new Event('resize'));

        // Failsafe 3: Forzar actualización explícita del scroll.
        if ((window as any).ScrollTrigger && typeof (window as any).ScrollTrigger.refresh === 'function') {
          (window as any).ScrollTrigger.refresh();
        }

        // Failsafe 4: Reactivar las dependencias legacy (Swiper, Isotope, etc.)
        if ((window as any).jQuery) {
          (window as any).jQuery(document).trigger('ready');
          (window as any).jQuery(window).trigger('load');
        }
      }, 150); // 150ms asegura que Vue ha terminado de pintar el nuevo DOM
    }
  });
});