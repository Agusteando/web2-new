<template>
  <section v-if="decision?.adsRendered" class="tp-ad-strip-area pt-60 pb-60">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-11 col-md-12">
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
    } catch (e) {}
  }
})
</script>