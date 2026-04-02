<template>
  <main>
    <div class="tp-service-hero-area tp-service-hero-spacing p-relative z-index-1">
       <div class="container pt-80 pb-40 text-center">
          <h1 class="tp-ff-familjen fs-70 tp-text-common-black-5 mb-20">Convenios y Alianzas</h1>
          <p class="tp-ff-dm fs-20 tp-text-grey-7 mx-auto" style="max-width: 800px;">
             En los Institutos IECS-IEDIS respaldamos la calidad de nuestra educación colaborando con instituciones y plataformas líderes a nivel mundial.
          </p>
       </div>
    </div>

    <div class="tp-service-area pb-100">
       <div class="container">
          <div class="row align-items-stretch">
             <div v-for="(alianza, index) in alianzas" :key="index" class="col-lg-6 mb-40 tp_fade_anim" :data-delay="0.2 + (index * 0.1)">
                <div class="tp-service-md-item tp-bg-common-white h-100 d-flex flex-column align-items-center text-center p-5" style="border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                   <div class="mb-30" style="height: 100px; display: flex; align-items: center; justify-content: center;">
                      <img :src="alianza.logo" :alt="alianza.title" style="max-height: 100%; max-width: 250px; object-fit: contain;">
                   </div>
                   <h3 class="tp-ff-familjen fs-32 tp-text-common-black-5 mb-20">{{ alianza.title }}</h3>
                   <p class="tp-ff-dm fs-16 lh-160-per tp-text-grey-7 mb-0">{{ alianza.desc }}</p>
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
    desc: 'Integración tecnológica vanguardista. Nuestros ecosistemas de aprendizaje utilizan herramientas y dispositivos Apple para fomentar la creatividad, la programación y el desarrollo de habilidades digitales nativas en nuestros estudiantes.',
    logo: '/assets/img/IECS-IEDIS IMAGES/APPLE-SPONSOR-450X446.webp'
  },
  {
    title: 'Sistema UNOi',
    desc: 'Nuestro modelo educativo integra el ecosistema UNOi, ofreciendo un entorno bilingüe y constructivista que transforma el aula en un espacio interactivo, orientado a resolver problemas relevantes local y globalmente.',
    logo: '/assets/img/IECS-IEDIS IMAGES/UNOI-SPONSOR-450X446.webp'
  },
  {
    title: 'Cambridge Assessment English',
    desc: 'Somos un centro de preparación oficial. Nuestros alumnos certifican su dominio del idioma inglés con la validación internacional de la Universidad de Cambridge, abriendo puertas a su futuro académico y profesional.',
    logo: '/assets/img/IECS-IEDIS IMAGES/CAMBRIDGE-SPONSOR-450X446.webp'
  },
  {
    title: 'Habilmind',
    desc: 'Plataforma líder en medición del aprendizaje. Realizamos diagnósticos psicoeducativos continuos para personalizar la educación, detectar fortalezas y apoyar las áreas de mejora emocional y cognitiva de cada estudiante.',
    logo: '/assets/img/IECS-IEDIS IMAGES/HABILMIND-SPONSOR-450X446.webp'
  }
]);

useHead({
  title: 'Convenios y Alianzas | Colegios IECS-IEDIS',
  meta: [{ name: 'description', content: 'Conoce nuestras alianzas estratégicas con Apple Education, Sistema UNOi, Cambridge y Habilmind.' }]
});
</script>