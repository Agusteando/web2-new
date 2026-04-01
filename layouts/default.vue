<template>
  <div>
    <!-- Preloader manejado nativamente por main.js -->
    <div class="loader-wrap">
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

    <!-- Back to Top manejado nativamente por backtop.js -->
    <div class="scrollToTop scrollToTop-4">
      <div class="arrowUp">
         <i class="fa-light fa-arrow-up"></i>
      </div>
      <div class="water">
         <svg viewBox="0 0 560 20" class="water_wave water_wave_back">
            <use xlink:href="#wave"></use>
         </svg>
         <svg viewBox="0 0 560 20" class="water_wave water_wave_front">
            <use xlink:href="#wave"></use>
         </svg>
         <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 560 20" style="display: none;">
            <symbol id="wave">
               <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z" fill="#"></path>
               <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z" fill="#"></path>
               <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z" fill="#"></path>
               <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z" fill="#"></path>
            </symbol>
         </svg>
      </div>
    </div>

    <SearchForm />
    <OffcanvasMenu />
    
    <SiteHeader />
    
    <div id="smooth-wrapper">
      <!-- 
        Standard GSAP/ScrollSmoother smooth-content div.
        Only inner pages receive top padding to prevent content from hiding behind the sticky header.
        Home page is strictly excluded, ensuring the transparent hero layout functions perfectly
        and preserving the intended vertical scroll boundaries.
      -->
      <div id="smooth-content" :class="{ 'inner-page-offset': route.path !== '/' }">
        <slot />
        <SiteFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from '#app'
const route = useRoute()
</script>

<style>
/* 
  Ensures inner pages securely clear the absolute header height without modifying 
  global HTML/body rules, preventing arbitrary horizontal scroll generation. 
*/
.inner-page-offset {
  padding-top: 135px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

@media (max-width: 1199px) {
  .inner-page-offset {
    padding-top: 80px;
  }
}
</style>