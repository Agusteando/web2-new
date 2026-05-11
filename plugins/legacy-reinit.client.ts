export default defineNuxtPlugin((nuxtApp) => {
  // Track initial load to prevent double-execution of scripts already handled by nuxt.config.ts
  let isInitialLoad = true;

  nuxtApp.hook('page:finish', () => {
    if (!import.meta.client) return;

    // 1. Global Viewport Reset
    // Fast-track release of any stuck body locks (e.g., from offcanvas/mobile menus closing during navigation)
    document.body.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('overflow');

    if (isInitialLoad) {
      isInitialLoad = false;
      return; 
    }

    // 2. GSAP Deep Teardown & Memory Management
    // STRUCTURAL FIX: Eliminates scroll lag by clearing cached scroll positions and destroying 
    // orphaned ScrollTrigger instances that attempt to calculate dimensions on unmounted DOM.
    if ((window as any).ScrollTrigger) {
      (window as any).ScrollTrigger.clearScrollMemory();
      (window as any).ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    }
    
    if ((window as any).ScrollSmoother) {
      const smoother = (window as any).ScrollSmoother.get();
      if (smoother) smoother.kill();
    }

    // 3. Script Lifecycle Re-injection
    // Force the browser to re-evaluate the vanilla JS theme scripts.
    // This perfectly restores broken homepage effects (Swiper, HoverEffects, GSAP timelines) 
    // by making the external scripts bind to the freshly mounted Vue DOM components.
    const scriptsToReload = [
      '/assets/js/legacy-reinit.bundle.js'
    ];

    scriptsToReload.forEach(src => {
      // Clean up the old script tag
      const oldScript = document.querySelector(`script[src="${src}"]`);
      if (oldScript) {
        oldScript.remove();
      }

      // Injecting a new script tag forces execution (browser resolves instantly from disk cache)
      const newScript = document.createElement('script');
      newScript.src = src;
      newScript.defer = true;
      document.body.appendChild(newScript);
    });

    // 4. Legacy Event Triggers & Layout Recalculation
    // Ensures components relying strictly on jQuery document/window lifecycle are awakened
    setTimeout(() => {
      if ((window as any).jQuery) {
        (window as any).jQuery(document).trigger('ready');
        (window as any).jQuery(window).trigger('load');
      }
      
      // Force viewport recalculation to align sticky headers and parallax depths
      window.dispatchEvent(new Event('resize'));
      
      // Final ScrollTrigger refresh after the DOM and new scripts have completely settled.
      // This is crucial for ensuring fade animations calculate their trigger points correctly.
      if ((window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.refresh();
      }
    }, 300);
  });
});