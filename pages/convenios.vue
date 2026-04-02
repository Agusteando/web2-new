<template>
  <main>
    <!-- HERO SECTION -->
    <div class="tp-service-hero-area tp-service-hero-spacing p-relative z-index-1 tp-bg-common-white-2">
       <div class="container pt-100 pb-80 text-center">
          <span class="tp-ff-dm fw-500 fs-18 ls-m-4 tp-text-theme-1 mb-15 d-inline-block text-uppercase" style="color: #007F92;">Estándares Internacionales</span>
          <h1 class="tp-ff-familjen fs-70 fs-lg-60 fs-xs-40 tp-text-common-black-5 mb-20 lh-1">Convenios y Alianzas</h1>
          <p class="tp-ff-dm fs-20 lh-160-per tp-text-grey-7 mx-auto" style="max-width: 800px;">
             En los Institutos IECS-IEDIS respaldamos la calidad de nuestra educación colaborando con instituciones, evaluadoras y plataformas tecnológicas líderes a nivel mundial.
          </p>
       </div>
    </div>

    <!-- ALIANZAS GRID -->
    <div class="tp-service-area pt-100 pb-100">
       <div class="container">
          <div class="row align-items-stretch">
             <div v-for="(alianza, index) in alianzas" :key="index" class="col-lg-6 mb-40 tp_fade_anim" :data-delay="0.2 + (index * 0.1)">
                <div class="tp-service-md-item tp-bg-common-white h-100 d-flex flex-column p-5 tp-round-24" style="box-shadow: 0 10px 40px rgba(0,0,0,0.04); border: 1px solid #f3f4f6; transition: transform 0.3s ease;">
                   <div class="d-flex flex-column flex-sm-row gap-4 align-items-start align-items-sm-center mb-30">
                      <!-- Logo Container with elegant border -->
                      <div class="flex-shrink-0 bg-white tp-round-20 d-flex align-items-center justify-content-center p-3" style="width: 140px; height: 140px; border: 1px solid #e5e7eb; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                         <img :src="alianza.logo" :alt="alianza.title" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                      </div>
                      <div>
                         <span class="badge bg-light text-dark mb-2" style="font-family: 'Montserrat', sans-serif; font-weight: 600;">{{ alianza.category }}</span>
                         <h3 class="tp-ff-familjen fs-32 tp-text-common-black-5 mb-0 lh-1">{{ alianza.title }}</h3>
                      </div>
                   </div>
                   <div class="mt-auto">
                      <p class="tp-ff-dm fs-16 lh-160-per tp-text-grey-7 mb-0">{{ alianza.desc }}</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>

    <!-- FOOTER STATEMENT -->
    <div class="container pb-100">
       <div class="row justify-content-center">
          <div class="col-lg-10 tp_fade_anim" data-delay=".6">
             <div class="tp-bg-common-white-2 p-5 tp-round-24 text-center d-flex flex-column align-items-center position-relative overflow-hidden">
                <div style="width: 300px; height: 300px; border-radius: 50%; background: #e0f2f5; position: absolute; top: -100px; right: -100px; z-index: 0;"></div>
                <div class="position-relative z-index-1">
                   <div class="mb-20" style="color: #007F92; font-size: 40px;">
                      <i class="fa-regular fa-globe"></i>
                   </div>
                   <h3 class="tp-ff-familjen fs-36 mb-20 tp-text-common-black-5">Un ecosistema diseñado para el futuro</h3>
                   <p class="fs-18 font-montserrat-regular tp-text-grey-7 mb-0 max-w-800">
                      Nuestras certificaciones y alianzas no son simples insignias; son metodologías vivas que se integran diariamente en las aulas de nuestros campus para garantizar que nuestros alumnos estén preparados para un entorno global, competitivo y en constante evolución.
                   </p>
                </div>
             </div>
          </div>
       </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const alianzas = ref([
  {
    title: 'Apple Education',
    category: 'Tecnología',
    desc: 'Integración tecnológica vanguardista. Nuestros ecosistemas de aprendizaje utilizan herramientas y dispositivos Apple para fomentar la creatividad, la programación y el desarrollo de habilidades digitales nativas en nuestros estudiantes.',
    logo: '/assets/img/IECS-IEDIS IMAGES/APPLE-SPONSOR-450X446.webp'
  },
  {
    title: 'Sistema UNOi',
    category: 'Metodología',
    desc: 'Nuestro modelo educativo integra el ecosistema UNOi, ofreciendo un entorno bilingüe y constructivista que transforma el aula en un espacio interactivo, orientado a resolver problemas relevantes local y globalmente.',
    logo: '/assets/img/IECS-IEDIS IMAGES/UNOI-SPONSOR-450X446.webp'
  },
  {
    title: 'Cambridge Assessment',
    category: 'Certificación de Idiomas',
    desc: 'Somos un centro de preparación oficial. Nuestros alumnos certifican su dominio del idioma inglés con la validación internacional de la Universidad de Cambridge, abriendo puertas a su futuro académico y profesional.',
    logo: '/assets/img/IECS-IEDIS IMAGES/CAMBRIDGE-SPONSOR-450X446.webp'
  },
  {
    title: 'Habilmind',
    category: 'Evaluación Psicoeducativa',
    desc: 'Plataforma líder en medición del aprendizaje. Realizamos diagnósticos continuos para personalizar la educación, detectar fortalezas y apoyar las áreas de mejora emocional y cognitiva de cada estudiante de manera precisa.',
    logo: '/assets/img/IECS-IEDIS IMAGES/HABILMIND-SPONSOR-450X446.webp'
  }
]);

useHead({
  title: 'Convenios y Alianzas | Colegios IECS-IEDIS',
  meta: [{ name: 'description', content: 'Conoce nuestras alianzas estratégicas con Apple Education, Sistema UNOi, Cambridge y Habilmind.' }]
});
</script>

<style scoped>
.tp-service-md-item:hover {
  transform: translateY(-5px);
  border-color: #007F92 !important;
}
</style>