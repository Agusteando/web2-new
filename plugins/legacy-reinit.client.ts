export default defineNuxtPlugin((nuxtApp) => {
  // Cuando navegamos entre rutas en una SPA, los scripts jQuery/GSAP del DOM anterior pierden sus referencias.
  // Este plugin fuerza una recarga segura para garantizar que los efectos visuales (Three.js, Swiper, ScrollTrigger) 
  // se inicien perfectamente en cada vista como si fuera la web original.
  nuxtApp.hook('page:finish', () => {
    if (import.meta.client) {
      // Fast-track release of any stuck body locks (e.g., from offcanvas/mobile menus closing during navigation)
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overflow');

      const runReinit = () => {
        // Force viewport recalculation for plugins listening to window changes
        window.dispatchEvent(new Event('resize'));

        // Force GSAP ScrollTrigger to recalculate wrapper heights after Vue swaps out the DOM
        if ((window as any).ScrollTrigger && typeof (window as any).ScrollTrigger.refresh === 'function') {
          (window as any).ScrollTrigger.refresh();
        }

        // Re-trigger legacy jQuery events for external scripts (Swiper, Magnific, Isotope)
        if ((window as any).jQuery) {
          (window as any).jQuery(document).trigger('ready');
          (window as any).jQuery(window).trigger('load');
        }
      };

      // Execute immediately after DOM insertion
      setTimeout(runReinit, 50);

      // Staggered fail-safes: Handle async data, slow component hydration, and delayed network paints
      // that might alter the height of the #smooth-wrapper after the initial render.
      [250, 750, 1500, 3000].forEach((delay) => {
        setTimeout(() => {
          if ((window as any).ScrollTrigger) {
            (window as any).ScrollTrigger.refresh();
          }
        }, delay);
      });
    }
  });
});