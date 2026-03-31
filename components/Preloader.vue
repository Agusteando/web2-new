<template>
  <div v-if="show" class="loader-wrap" :class="{'fade-out': !loading}">
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
       <defs>
          <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#618B2F" />
          <stop offset="100%" stop-color="#007F92" />
          </linearGradient>
       </defs>
       <path id="svg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z" fill="url(#loader-gradient)"></path>
    </svg>
    <div class="loader-wrap-heading">
       <div class="load-text font-montserrat-bold-italic">
          <span>I</span><span>E</span><span>C</span><span>S</span><span>-</span>
          <span>I</span><span>E</span><span>D</span><span>I</span><span>S</span>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const loading = ref(true)
const show = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
    setTimeout(() => { show.value = false }, 500)
  }, 500)
})
</script>