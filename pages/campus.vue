<template>
  <main>
    <div class="tp-service-hero-area tp-service-hero-spacing p-relative z-index-1">
       <div class="container pt-80 pb-40">
          <div class="row align-items-center">
             <div class="col-lg-8">
                <h1 class="tp-ff-familjen fs-70 tp-text-common-black-5 mb-20">Nuestros Campus</h1>
                <p class="tp-ff-dm fs-20 tp-text-grey-7 mb-40">Descubre nuestros 6 planteles ubicados estratégicamente en el Estado de México. Cada campus está diseñado con instalaciones de vanguardia, espacios recreativos seguros y un entorno que inspira el aprendizaje continuo.</p>
                <NuxtLink to="/ubicaciones" class="tp-btn-md tp-bg-theme-1 tp-left-right p-relative hover-text-white d-inline-block tp-text-grey-5 lh-1 fs-16 fw-700 tp-ff-dm">
                   <span class="mr10 td-text d-inline-block mr-5">Ver Directorio y Mapas</span>
                </NuxtLink>
             </div>
          </div>
       </div>
    </div>

    <div class="tp-portfolio-area pb-100">
       <div class="container">
          <div class="row">
             <div v-for="(campus, index) in campuses" :key="index" class="col-lg-6 mb-40 tp_fade_anim" :data-delay="0.2 + (index * 0.1)">
                <div class="tp-blog-ai-item tp-blog-md-item tp--hover-item tp-round-24 h-100">
                   <NuxtLink to="/ubicaciones" class="tp-round-24 w-100 fix p-relative d-inline-block">
                      <div class="tp-blog-ai-thumb w-100 tp--hover-img tp-round-24" data-displacement="assets/img/imghover/stripe-mul.png" data-intensity="0.2" data-speedin="1" data-speedout="1">
                         <img class="tp-round-24 w-100" :src="campus.img" :alt="campus.title" style="aspect-ratio: 4/3; object-fit: cover;">
                      </div>
                   </NuxtLink>
                   <div class="tp-blog-ai-content tp-blog-md-content" style="padding: 30px;">
                      <div class="mb-15">
                         <span v-for="(tag, i) in campus.tags" :key="i" class="badge rounded-pill bg-light text-dark mr-10 mb-10" style="font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 600; padding: 8px 15px; border: 1px solid #e5e7eb;">{{ tag }}</span>
                      </div>
                      <h4 class="tp-blog-md-title tp-ff-familjen fs-32 lh-1 ls-m-2 tp-text-common-black-5 mb-15">
                         <NuxtLink to="/ubicaciones" class="underline-black" :style="{ color: campus.color }">{{ campus.title }}</NuxtLink>
                      </h4>
                      <p class="tp-ff-dm fs-16 lh-150-per tp-text-grey-7 mb-25">{{ campus.desc }}</p>
                      <NuxtLink to="/ubicaciones" class="tp-left-right p-relative hover-text-black d-inline-block text-uppercase tp-text-common-black-5 lh-1 fs-14 fw-700 tp-ff-dm">
                         <span class="td-text d-inline-block mr-5">Ver ubicación</span>
                         <span class="tp-arrow-angle"><svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /><path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg></span>
                      </NuxtLink>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const campuses = ref([
  {
    title: 'IECS Campus Toluca',
    desc: 'Un espacio cálido y seguro diseñado exclusivamente para los primeros años de formación integral.',
    tags: ['Guardería', 'Preescolar'],
    img: '/assets/img/IECS-IEDIS IMAGES/FACHADA-IECS-TOL-320x242.webp',
    color: '#618B2F'
  },
  {
    title: 'IEDIS Campus Toluca',
    desc: 'Instalaciones equipadas con tecnología, laboratorios y áreas deportivas para un nivel académico superior.',
    tags: ['Primaria', 'Secundaria'],
    img: '/assets/img/IECS-IEDIS IMAGES/FACHADA-IEDIS-TOL-320x242.webp',
    color: '#007F92'
  },
  {
    title: 'IECS Campus Metepec',
    desc: 'Ubicado estratégicamente para atender a las familias de Metepec con amor, seguridad y atención bilingüe.',
    tags: ['Guardería', 'Preescolar'],
    img: '/assets/img/IECS-IEDIS IMAGES/FACHADA-IECS-MET-320x242.webp',
    color: '#618B2F'
  },
  {
    title: 'IEDIS Campus Metepec',
    desc: 'El entorno perfecto para que adolescentes y niños desarrollen su liderazgo, arte y conocimiento.',
    tags: ['Primaria', 'Secundaria'],
    img: '/assets/img/IECS-IEDIS IMAGES/FACHADA-IEDIS-MET-320x242.webp',
    color: '#007F92'
  },
  {
    title: 'IECS Campus Ocoyoacac',
    desc: 'Centro de desarrollo infantil respaldado por el esquema IMSS con los más altos estándares.',
    tags: ['Guardería (IMSS)'],
    img: '/assets/img/IECS-IEDIS IMAGES/FACHADA-IECS-OCO-320x242.webp',
    color: '#618B2F'
  },
  {
    title: 'IEDIS Desarrollo Calimaya',
    desc: 'Nuestras nuevas instalaciones diseñadas para extender la excelencia educativa hacia la zona de Calimaya.',
    tags: ['Guardería (IMSS)'],
    img: '/assets/img/IECS-IEDIS IMAGES/FACHADA-IEDIS-CALI-320x242.webp',
    color: '#007F92'
  }
]);

useHead({
  title: 'Nuestros Campus | Colegios IECS-IEDIS',
  meta: [{ name: 'description', content: 'Conoce los 6 campus de los Institutos IECS-IEDIS en Toluca, Metepec, Ocoyoacac y Calimaya.' }]
});
</script>