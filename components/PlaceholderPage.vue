<template>
  <main>
    <div class="tp-service-hero-area tp-service-hero-spacing p-relative z-index-1">
       <div class="container pt-100 pb-100 text-center">
          <h1 class="tp-ff-familjen fs-70 tp-text-common-black-5 mb-20">{{ title }}</h1>
          <p class="tp-ff-dm fs-20 tp-text-grey-7">Página en construcción dentro de la nueva arquitectura Vue.</p>
          <NuxtLink to="/" class="tp-btn-md tp-bg-theme-1 tp-left-right p-relative hover-text-white d-inline-block tp-text-grey-5 lh-1 fs-16 fw-700 tp-ff-dm mt-30">
            <span class="mr10 td-text d-inline-block mr-5">Volver al inicio</span>
          </NuxtLink>
       </div>
    </div>
  </main>
</template>

<script setup>
defineProps({ title: String })
</script>