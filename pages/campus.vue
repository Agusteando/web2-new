<template>
  <main>
    <!-- HERO SECTION -->
    <div class="tp-service-hero-area tp-service-hero-spacing p-relative z-index-1">
       <div class="container pt-100 pb-60">
          <div class="row align-items-center">
             <div class="col-lg-8 tp_fade_anim" data-delay=".2">
                <span class="tp-ff-dm fw-500 fs-18 ls-m-4 tp-text-theme-1 mb-15 d-inline-block text-uppercase" style="color: #618B2F;">Nuestras instalaciones</span>
                <h1 class="tp-ff-familjen fs-70 fs-lg-60 fs-xs-40 tp-text-common-black-5 mb-20 lh-1">Nuestros Campus</h1>
                <p class="tp-ff-dm fs-20 lh-160-per tp-text-grey-7 mb-40 max-w-800">
                   Descubre nuestros 6 planteles ubicados estratégicamente en el Estado de México. Cada campus está diseñado con instalaciones de vanguardia, espacios recreativos seguros y un entorno que inspira el aprendizaje continuo.
                </p>
                <div class="d-flex flex-wrap gap-3">
                   <NuxtLink to="/ubicaciones" class="tp-btn-md tp-bg-theme-1 tp-left-right p-relative hover-text-white d-inline-flex align-items-center tp-text-grey-5 lh-1 fs-16 fw-700 tp-ff-dm rounded-pill">
                      <span class="mr10 td-text d-inline-block mr-5">Ver Directorio y Mapas</span>
                      <i class="fa-regular fa-map-location-dot"></i>
                   </NuxtLink>
                </div>
             </div>
             <div class="col-lg-4 d-none d-lg-block tp_fade_anim" data-delay=".4">
                <div class="p-relative text-center">
                   <div style="width: 250px; height: 250px; border-radius: 50%; background: #f0f7e8; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: -1;"></div>
                   <img src="/assets/img/IECS-IEDIS IMAGES/40x42-icon-brave.webp" alt="Campus" style="width: 120px; animation: float 3s ease-in-out infinite;">
                </div>
             </div>
          </div>
       </div>
    </div>

    <!-- CAMPUS GRID -->
    <div class="tp-portfolio-area pb-100 tp-bg-common-white-2 pt-80">
       <div class="container">
          <div class="row">
             <div v-for="(campus, index) in campuses" :key="index" class="col-lg-6 mb-40 tp_fade_anim" :data-delay="0.1 * (index % 2)">
                <div class="tp-blog-ai-item tp-blog-md-item tp-bg-common-white tp-round-24 h-100" style="box-shadow: 0 10px 30px rgba(0,0,0,0.04); transition: transform 0.3s ease;">
                   <NuxtLink to="/ubicaciones" class="tp-round-top-24 w-100 fix p-relative d-block overflow-hidden" style="border-radius: 24px 24px 0 0;">
                      <img decoding="async" loading="lazy" class="w-100 tp-zoom-img" :src="campus.img" :alt="campus.title" style="aspect-ratio: 16/10; object-fit: cover; transition: transform 0.5s ease;">
                      <div class="position-absolute top-0 end-0 m-3 d-flex flex-column align-items-end gap-2">
                         <span v-for="(tag, i) in campus.tags" :key="i" class="badge rounded-pill shadow-sm" :style="{ backgroundColor: campus.color, color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: '600', padding: '6px 12px' }">
                            {{ tag }}
                         </span>
                      </div>
                   </NuxtLink>
                   <div class="tp-blog-ai-content p-4 p-lg-5">
                      <div class="d-flex align-items-center mb-20">
                         <i class="fa-solid fa-location-dot mr-10" :style="{ color: campus.color, fontSize: '20px' }"></i>
                         <span class="tp-ff-dm fw-600 fs-14 text-uppercase tp-text-grey-7 tracking-wide">{{ campus.location }}</span>
                      </div>
                      <h4 class="tp-ff-familjen fs-36 lh-1 ls-m-2 tp-text-common-black-5 mb-15">
                         <NuxtLink to="/ubicaciones" class="underline-black" :style="{ color: campus.color }">{{ campus.title }}</NuxtLink>
                      </h4>
                      <p class="tp-ff-dm fs-16 lh-160-per tp-text-grey-7 mb-30">{{ campus.desc }}</p>
                      <NuxtLink to="/ubicaciones" class="d-inline-flex align-items-center text-uppercase tp-text-common-black-5 lh-1 fs-14 fw-700 tp-ff-dm" style="transition: opacity 0.2s; opacity: 0.8;">
                         <span class="mr-10">Ver ubicación y contacto</span>
                         <i class="fa-regular fa-arrow-right"></i>
                      </NuxtLink>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>

    <!-- SUMMARY SECTION -->
    <div class="tp-funfact-area pt-80 pb-80">
       <div class="container">
          <div class="row justify-content-center">
             <div class="col-lg-10">
                <div class="p-5 tp-round-24 text-center position-relative overflow-hidden" style="background: linear-gradient(135deg, #007F92 0%, #005a68 100%); color: white;">
                   <!-- Decorative background shapes -->
                   <svg class="position-absolute opacity-10" style="top: -20%; right: -10%; width: 300px;" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#FFFFFF" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.1,-46.2C90.4,-33.3,95.9,-17.6,96.3,-1.7C96.7,14.2,92.1,30.3,82.6,43.2C73.1,56.1,58.7,65.8,43.3,73.1C27.9,80.4,11.5,85.3,-4.2,88C-19.9,90.7,-34.9,91.2,-48.6,85.6C-62.3,80,-74.7,68.3,-82.9,54.1C-91.1,39.9,-95.1,23.2,-95.7,6.8C-96.3,-9.6,-93.5,-25.7,-85.4,-39.6C-77.3,-53.5,-63.9,-65.2,-49.4,-71.9C-34.9,-78.6,-19.4,-80.3,-3.1,-75.4C13.2,-70.5,26.4,-59,44.7,-76.4Z" transform="translate(100 100)"/></svg>
                   
                   <div class="position-relative z-index-1">
                      <h3 class="tp-ff-familjen fs-42 mb-20 text-white">4 Municipios, 1 misma calidad educativa</h3>
                      <p class="fs-18 lh-160-per font-montserrat-regular text-white opacity-8 mb-40 max-w-800 mx-auto">
                         Sin importar el campus que elijas, en IECS-IEDIS garantizamos el mismo modelo pedagógico, los mismos valores y la misma infraestructura de excelencia diseñada para el bienestar de tus hijos.
                      </p>
                      <NuxtLink to="/acerca-de-institutos" class="tp-btn-md bg-white text-dark d-inline-block lh-1 fs-16 fw-700 tp-ff-dm rounded-pill px-5 py-3 shadow-sm hover-lift">
                         Conoce nuestro Modelo Educativo
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
    location: 'San Mateo Oxtotitlán, Toluca',
    desc: 'Un espacio cálido y seguro diseñado exclusivamente para los primeros años de formación integral, con áreas verdes y aulas interactivas.',
    tags: ['Guardería', 'Preescolar'],
    img: '/assets/img/IECS-IEDIS IMAGES/FACHADA-IECS-TOL-320x242.webp',
    color: '#618B2F'
  },
  {
    title: 'IEDIS Campus Toluca',
    location: 'Col. Niños Héroes, Toluca',
    desc: 'Instalaciones equipadas con tecnología de punta, laboratorios de ciencias y áreas deportivas para un nivel académico superior.',
    tags: ['Primaria', 'Secundaria'],
    img: '/assets/img/IECS-IEDIS IMAGES/FACHADA-IEDIS-TOL-320x242.webp',
    color: '#007F92'
  },
  {
    title: 'IECS Campus Metepec',
    location: 'San José La Pila, Metepec',
    desc: 'Ubicado estratégicamente para atender a las familias de Metepec con amor, seguridad y un robusto programa de atención bilingüe.',
    tags: ['Guardería', 'Preescolar'],
    img: '/assets/img/IECS-IEDIS IMAGES/FACHADA-IECS-MET-320x242.webp',
    color: '#618B2F'
  },
  {
    title: 'IEDIS Campus Metepec',
    location: 'San Mateo, Metepec',
    desc: 'El entorno perfecto para que adolescentes y niños desarrollen su liderazgo, exploren el arte y consoliden su conocimiento.',
    tags: ['Primaria', 'Secundaria'],
    img: '/assets/img/IECS-IEDIS IMAGES/FACHADA-IEDIS-MET-320x242.webp',
    color: '#007F92'
  },
  {
    title: 'IECS Campus Ocoyoacac',
    location: 'Santa María, Ocoyoacac',
    desc: 'Centro de desarrollo infantil respaldado por el esquema IMSS, ofreciendo estimulación temprana con los más altos estándares.',
    tags: ['Guardería (IMSS)'],
    img: '/assets/img/IECS-IEDIS IMAGES/FACHADA-IECS-OCO-320x242.webp',
    color: '#618B2F'
  },
  {
    title: 'IEDIS Desarrollo Calimaya',
    location: 'San Andrés Ocotlán, Calimaya',
    desc: 'Nuestras modernas instalaciones diseñadas específicamente para extender la excelencia en el cuidado infantil hacia la zona de Calimaya.',
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

<style scoped>
.tp-zoom-img:hover {
  transform: scale(1.05);
}
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
</style>