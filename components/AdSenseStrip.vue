<template>
  <section v-if="shouldRender" class="tp-ad-strip-area" :class="placementClass" aria-label="Publicidad">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-11 col-md-12">
          <p class="ad-label">Publicidad</p>

          <div class="tp-ad-strip-slot w-100" :class="{ 'is-dev-preview': isDevPreview }">
            <div v-if="isDevPreview" class="ad-preview-box">
              <span class="ad-preview-badge">Modo de prueba</span>
              <div class="ad-preview-info">
                <strong>Espacio publicitario reservado</strong>
                <span>AdSense Slot: <code>5188349041</code></span>
              </div>
            </div>

            <ins
              v-else
              ref="adElement"
              class="adsbygoogle"
              style="display:block"
              data-ad-client="ca-pub-1644096973273978"
              data-ad-slot="5188349041"
              data-ad-format="horizontal"
              data-full-width-responsive="true"
              data-tag-for-age-treatment="0"
            ></ins>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  placement?: 'home' | 'news-index' | 'blog-index' | 'article-footer'
}>(), {
  placement: 'article-footer',
})

const ADSENSE_SCRIPT_ID = 'iecs-adsense-script'
const ADSENSE_CLIENT = 'ca-pub-1644096973273978'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const shouldRender = ref(false)
const isDevPreview = ref(false)
const adElement = ref<HTMLElement | null>(null)

const placementClass = computed(() => `ad-placement-${props.placement}`)
const isAllowedRoute = computed(() => route.path === '/' || route.path === '/noticias' || route.path.startsWith('/noticias/') || route.path === '/blog-iecs-iedis' || route.path.startsWith('/blog-iecs-iedis/'))

const initializePrivacyApi = () => {
  const win = window as any
  win.googlefc = win.googlefc || {}
  win.googlefc.callbackQueue = win.googlefc.callbackQueue || []

  win.googlefc.callbackQueue.push({
    CONSENT_API_READY: () => {
      if (sessionStorage.getItem('iecs-open-google-privacy') === 'true') {
        sessionStorage.removeItem('iecs-open-google-privacy')
        win.googlefc.showRevocationMessage?.()
      }
    },
  })
}

const loadAdsenseScript = () => new Promise<void>((resolve, reject) => {
  const existing = document.getElementById(ADSENSE_SCRIPT_ID) as HTMLScriptElement | null
  if (existing) {
    if (existing.dataset.loaded === 'true') resolve()
    else {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('AdSense script failed to load')), { once: true })
    }
    return
  }

  const script = document.createElement('script')
  script.id = ADSENSE_SCRIPT_ID
  script.async = true
  script.crossOrigin = 'anonymous'
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`
  script.addEventListener('load', () => {
    script.dataset.loaded = 'true'
    resolve()
  }, { once: true })
  script.addEventListener('error', () => reject(new Error('AdSense script failed to load')), { once: true })
  document.head.appendChild(script)
})

onMounted(async () => {
  isDevPreview.value = import.meta.dev || ['localhost', '127.0.0.1'].includes(window.location.hostname)

  const isSuppressed = document.cookie.includes('ads_suppressed=true')
  let globalEnabled = runtimeConfig.public.adsEnabled !== false

  if (runtimeConfig.public.enableDynamicAdConfig) {
    try {
      const config = await $fetch<{ global_ads_enabled?: boolean }>('/api/ads/config')
      globalEnabled = config?.global_ads_enabled ?? globalEnabled
    } catch {
      globalEnabled = runtimeConfig.public.adsEnabled !== false
    }
  }

  if (!globalEnabled || isSuppressed || !isAllowedRoute.value) return

  shouldRender.value = true
  await nextTick()

  if (isDevPreview.value) return

  initializePrivacyApi()

  try {
    await loadAdsenseScript()
    if (!adElement.value?.dataset.adsbygoogleStatus) {
      const win = window as any
      ;(win.adsbygoogle = win.adsbygoogle || []).push({})
    }
  } catch (error) {
    console.error('[AdSense] Initialization failed:', error)
  }
})
</script>

<style scoped>
.tp-ad-strip-area {
  padding: 64px 0;
}

.ad-placement-home {
  padding-top: 48px;
  padding-bottom: 48px;
}

.ad-placement-article-footer {
  max-width: 940px;
  margin: 24px auto 0;
}

.ad-label {
  margin: 0 0 10px;
  color: #64748b;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
}

.tp-ad-strip-slot {
  min-height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  border: 1px solid #d8e0e5;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  contain: layout;
}

@media (min-width: 768px) {
  .tp-ad-strip-slot {
    min-height: 140px;
  }
}

.adsbygoogle {
  z-index: 1;
  width: 100%;
  min-height: 100%;
  display: block;
}

.is-dev-preview {
  background-color: #f1f5f9;
  background-image: repeating-linear-gradient(
    45deg,
    #e2e8f0 0,
    #e2e8f0 2px,
    transparent 2px,
    transparent 12px
  );
  border: 2px dashed #94a3b8;
}

.ad-preview-box {
  background: #fff;
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 2;
  text-align: center;
}

.ad-preview-badge {
  background: #334155;
  color: #fff;
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

@media (max-width: 767px) {
  .tp-ad-strip-area {
    padding: 48px 0;
  }
}
</style>
