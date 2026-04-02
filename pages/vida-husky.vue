<template>
  <main>
    <div class="tp-service-hero-area tp-service-hero-spacing p-relative z-index-1" style="background-color: #f8fafc;">
       <div class="container pt-100 pb-80">
          <div class="row align-items-center">
             <div class="col-lg-6">
                <h1 class="tp-ff-familjen fs-70 tp-text-common-black-5 mb-20">Vida Husky</h1>
                <p class="tp-ff-dm fs-20 tp-text-grey-7 mb-40">
                   Nuestro husky simboliza la fuerza interior y la inteligencia. El hambre de conocimiento que te lleva a viajar y explorar más allá de lo que conoces. Encontrar la felicidad incluso en los entornos más duros, y aceptar los retos con resiliencia.
                </p>
             </div>
             <div class="col-lg-6 d-flex justify-content-center">
                <img src="/assets/img/IECS-IEDIS IMAGES/104X104-AMBASSADORS.webp" alt="Husky Mascot" style="max-width: 280px; animation: iecs-spin 15s linear infinite;">
             </div>
          </div>
       </div>
       <div class="tp-breadcrumb-wrap">
          <div class="container">
             <div class="row">
                <div class="col-12">
                   <div class="tp-breadcrumb-list">
                      <ul>
                         <li><NuxtLink to="/">Home</NuxtLink></li>
                         <li><span></span></li>
                         <li>Vida Husky</li>
                      </ul>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>

    <!-- Gallery Section -->
    <div class="tp-portfolio-area pt-100 pb-100">
       <div class="container">
          <div class="row justify-content-center text-center mb-60 tp_fade_anim" data-delay=".2">
             <div class="col-lg-8">
                <h2 class="fs-50 fw-600 tp-ff-familjen tp-text-common-black-5">Orgullosamente de nuestra manada</h2>
                <p class="tp-ff-dm fs-18 tp-text-grey-7">Tal y como hace el husky, buscamos estar al servicio de los demás y tomar un papel de liderazgo. Así vivimos el día a día en IECS-IEDIS.</p>
             </div>
          </div>
          
          <div class="row">
             <div class="col-lg-4 col-md-6 mb-30 tp_fade_anim" data-delay=".3">
                <div class="tp-round-24 fix h-100">
                   <img class="w-100 h-100" src="/assets/img/IECS-IEDIS IMAGES/504x644-sunny.webp" alt="Vida Husky" style="object-fit: cover;">
                </div>
             </div>
             <div class="col-lg-4 col-md-6 mb-30 tp_fade_anim" data-delay=".4">
                <div class="tp-round-24 fix h-100">
                   <img class="w-100 h-100" src="/assets/img/IECS-IEDIS IMAGES/504x644-joy.webp" alt="Vida Husky" style="object-fit: cover;">
                </div>
             </div>
             <div class="col-lg-4 col-md-6 mb-30 tp_fade_anim" data-delay=".5">
                <div class="tp-round-24 fix h-100">
                   <img class="w-100 h-100" src="/assets/img/IECS-IEDIS IMAGES/504x644-brave.webp" alt="Vida Husky" style="object-fit: cover;">
                </div>
             </div>
             <div class="col-lg-6 col-md-6 mb-30 tp_fade_anim" data-delay=".6">
                <div class="tp-round-24 fix h-100">
                   <img class="w-100 h-100" src="/assets/img/IECS-IEDIS IMAGES/DAYCARE-SPACE3-950X949.webp" alt="Vida Husky" style="object-fit: cover;">
                </div>
             </div>
             <div class="col-lg-6 col-md-12 mb-30 tp_fade_anim" data-delay=".7">
                <div class="tp-round-24 fix h-100">
                   <img class="w-100 h-100" src="/assets/img/IECS-IEDIS IMAGES/PRESCHOOL-SPACE4-950X949.webp" alt="Vida Husky" style="object-fit: cover;">
                </div>
             </div>
          </div>
       </div>
    </div>
  </main>
</template>

<script setup>
useHead({
  title: 'Vida Husky | Colegios IECS-IEDIS',
  meta: [{ name: 'description', content: 'Descubre lo que significa ser parte de la manada Husky en IECS-IEDIS.' }]
});
</script>

<style scoped>
@keyframes iecs-spin {
  100% { transform: rotate(360deg); }
}
</style>