<template>
  <div>
    <div :class="['tp-search-body-overlay', { 'opened': isOpen }]" @click="isOpen = false"></div>
    <div :class="['tp-search-form-toggle', { 'opened': isOpen }]">
       <div class="container">
          <div class="row mb-70">
             <div class="col-lg-12">
                <div class="tp-search-top d-flex justify-content-between align-items-center">
                   <div class="cm-search-logo">
                      <NuxtLink to="/"><img data-width="150" src="/assets/img/IECS-IEDIS IMAGES/IMAGOTIPO-IECS-IEDIS-23-24.webp" alt="logo"></NuxtLink>
                   </div>
                   <button class="tp-search-close" @click="isOpen = false">
                      <i class="fa-light fa-xmark"></i>
                   </button>
                </div>
             </div>
          </div>
          <div class="row justify-content-center">
             <div class="col-lg-12">
                <div class="tp-search-form">
                   <form action="#">
                      <div class="tp-search-form-input">
                         <input type="text" placeholder="¿Buscas algo en especifico?" required>
                         <span class="tp-search-focus-border"></span>
                         <button class="tp-search-form-icon" type="submit">
                            <i class="fa-sharp fa-regular fa-magnifying-glass"></i>
                         </button>
                      </div>
                   </form>
                </div>
             </div>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup>
const isOpen = useState('isSearchOpen', () => false)
</script>