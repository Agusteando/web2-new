export default defineNuxtPlugin((nuxtApp) => {
  // Cuando navegamos entre rutas en una SPA, los scripts jQuery/GSAP del DOM anterior pierden sus referencias.
  // Este plugin fuerza una recarga segura para garantizar que los efectos visuales (Three.js, Swiper, ScrollTrigger) 
  // se inicien perfectamente en cada vista como si fuera la web original.
  nuxtApp.hook('page:finish', () => {
    if (window.jQuery) {
      setTimeout(() => {
        window.jQuery(document).trigger('ready');
        window.jQuery(window).trigger('load');
      }, 100);
    }
  });
});