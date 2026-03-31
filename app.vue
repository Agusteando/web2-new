<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* CSS Reset y Fallbacks para mantener componentes visibles sin usar scripts inmantentibles GSAP/jQuery */
.tp_fade_anim, .tp-text-revel-anim, .has_fade_anim, .tp-text-bounce {
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;
}

.opened {
  visibility: visible !important;
  opacity: 1 !important;
}

/* Offcanvas */
.tp-offcanvas-area {
  transition: all 0.3s ease;
  transform: translateX(100%);
  z-index: 9999;
}
.tp-offcanvas-area.opened {
  transform: translateX(0);
}
.body-overlay {
  transition: all 0.3s ease;
  visibility: hidden;
  opacity: 0;
  z-index: 9998;
}
.body-overlay.opened {
  visibility: visible;
  opacity: 1;
}

/* Search form */
.tp-search-form-toggle {
  transition: all 0.3s ease;
  top: -100%;
}
.tp-search-form-toggle.opened {
  top: 0;
}
.tp-search-body-overlay {
  transition: all 0.3s ease;
  visibility: hidden;
  opacity: 0;
}
.tp-search-body-overlay.opened {
  visibility: visible;
  opacity: 1;
}

/* Header */
.header-sticky {
  position: fixed !important;
  top: 0; left: 0; width: 100%;
  z-index: 999;
  background: white !important;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  animation: slideDown 0.5s ease-in-out forwards;
}
@keyframes slideDown {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}

/* Preloader */
.loader-wrap {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 99999;
  background: white;
  transition: opacity 0.5s ease;
}
.loader-wrap.fade-out {
  opacity: 0;
  pointer-events: none;
}

/* Scroll To Top */
.scrollToTop {
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
}
.scrollToTop.active-progress {
  opacity: 1;
  visibility: visible;
}
</style>