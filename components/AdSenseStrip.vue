<template>
  <section v-if="decision?.adsRendered" class="tp-ad-strip-area pt-60 pb-60">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-11 col-md-12">
          <!-- Safe boundary preventing layout shift -->
          <div class="tp-ad-strip-slot w-100">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-1644096973273978"
                 data-ad-slot="5188349041"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

const { data: decision } = await useFetch('/api/ads/decision')

onMounted(() => {
  if (decision.value?.adsRendered) {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('[AdSense] Initialization failed:', e)
    }
  }
})
</script>

<style scoped>
/* 
  =============================================================
  UX/SEO OPTIMIZATION: Zero Cumulative Layout Shift (CLS)
  Reserves exact physical space before Google's script injects 
  the ad iframe, stopping the page from jumping abruptly.
  =============================================================
*/

.tp-ad-strip-slot {
  min-height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc; /* Subtle placeholder background matching theme */
  border: 1px dashed #e2e8f0;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
}

/* Subtle underlying text indicating ad placement (disappears under the ad) */
.tp-ad-strip-slot::before {
  content: 'Espacio publicitario';
  position: absolute;
  color: #cbd5e1;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
  z-index: 0;
  pointer-events: none;
}

/* Elevate the injected ad above the placeholder background */
.adsbygoogle {
  z-index: 1;
  width: 100%;
  min-height: 120px; /* Force minimum height for ad container */
}
</style>