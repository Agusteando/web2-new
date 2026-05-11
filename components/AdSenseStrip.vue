<template>
  <section v-if="decision.adsRendered" class="tp-ad-strip-area pt-60 pb-60">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-11 col-md-12">
          
          <!-- Safe boundary preventing layout shift (Zero CLS) -->
          <div class="tp-ad-strip-slot w-100" :class="{ 'is-dev-preview': isDevPreview }">
            
            <!-- Local Debug / Preview Mode -->
            <div v-if="isDevPreview" class="ad-preview-box">
              <span class="ad-preview-badge">Modo de Prueba</span>
              <div class="ad-preview-info">
                <strong>Espacio Publicitario Reservado</strong>
                <span>AdSense Slot: <code>ca-pub-1644096973273978</code></span>
              </div>
            </div>

            <!-- Production AdSense Script -->
            <ins v-else
                 class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-1644096973273978"
                 data-ad-slot="5188349041"
                 data-ad-format="horizontal"
                 data-full-width-responsive="true"></ins>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Obtenemos la configuración global estática en build-time.
// Esto permite que el componente inyecte la variable pre-generada y no realice ninguna llamada de red (0 invocaciones edge).
const { data: config } = await useAsyncData('ad-config', () => $fetch('/api/ads/config'))

const decision = ref({ adsRendered: false })
const isDevPreview = ref(false)

onMounted(() => {
  // Verifiable placement test: Force preview on localhost/127.0.0.1
  isDevPreview.value = import.meta.dev || ['localhost', '127.0.0.1'].includes(window.location.hostname)

  // La evaluación de las cookies se realiza estrictamente en el cliente
  const cookies = document.cookie || ''
  const isSuppressed = cookies.includes('ads_suppressed=true')
  const globalEnabled = config.value?.global_ads_enabled ?? true

  if (globalEnabled && !isSuppressed) {
    decision.value.adsRendered = true
    
    if (!isDevPreview.value) {
      setTimeout(() => {
        try {
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (e) {
          console.error('[AdSense] Initialization failed:', e)
        }
      }, 100)
    }
  }
})
</script>

<style scoped>
/* 
  =============================================================
  UX/SEO OPTIMIZATION: Zero Cumulative Layout Shift (CLS)
  Reserves exact physical space before Google's script injects 
  the ad iframe. 'contain: layout' prevents sibling reflows.
  =============================================================
*/
.tp-ad-strip-slot {
  min-height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  contain: layout; /* Isolates the ad rendering layout */
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .tp-ad-strip-slot {
    min-height: 140px; /* Safe average height for desktop horizontal strips */
  }
}

/* Elevate the injected ad above the background */
.adsbygoogle {
  z-index: 1;
  width: 100%;
  min-height: 100%;
  display: block;
}

/* 
  =============================================================
  LOCAL PREVIEW MODE (Dev only)
  Visible placeholder showing exactly where the ad goes
  =============================================================
*/
.is-dev-preview {
  background-color: #f1f5f9;
  background-image: repeating-linear-gradient(
    45deg,
    #e2e8f0 0px,
    #e2e8f0 2px,
    transparent 2px,
    transparent 12px
  );
  border: 2px dashed #94a3b8;
}

.ad-preview-box {
  background: #ffffff;
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 2;
  text-align: center;
}

.ad-preview-badge {
  background: #3b82f6;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 20px;
}

.ad-preview-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ad-preview-info strong {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #1e293b;
}

.ad-preview-info span {
  font-family: monospace;
  font-size: 0.85rem;
  color: #64748b;
}
</style>