<template>
  <main>
    <div class="tp-service-hero-area tp-service-hero-spacing p-relative z-index-1" style="background-image: url('/assets/img/IECS-IEDIS IMAGES/836x720-talleresinteligentes.webp'); background-size: cover; background-position: center;">
       <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%); z-index: -1;"></div>
       <div class="container pt-100 pb-80 text-center">
          <img src="/assets/img/IECS-IEDIS IMAGES/TALLERES-SPONSOR-450X446.webp" alt="Talleres Inteligentes" style="max-width: 250px;" class="mb-30">
          <h1 class="tp-ff-familjen fs-70 tp-text-common-black-5 mb-20">Diversión + Aprendizaje</h1>
          <p class="tp-ff-dm fs-20 tp-text-grey-7 mx-auto mb-40" style="max-width: 800px;">
             La filosofía de proporcionar una educación integral a nuestros alumnos la aplicamos en todos los aspectos académicos, artísticos y deportivos mediante nuestra oferta de actividades vespertinas.
          </p>
       </div>
    </div>

    <div class="tp-service-area pb-100 pt-60 tp-bg-common-white-2">
       <div class="container">
          <div class="row mb-50 justify-content-center text-center tp_fade_anim" data-delay=".2">
             <div class="col-lg-10">
                <h2 class="fs-40 fw-600 tp-ff-familjen tp-text-common-black-5 mb-20">Descubre nuestra oferta por disciplina</h2>
             </div>
          </div>
          <div class="row">
             <div v-for="(taller, index) in talleres" :key="index" class="col-lg-3 col-md-4 col-sm-6 mb-30 tp_fade_anim" :data-delay="0.1 * (index % 4)">
                <div class="tp-service-md-item tp-bg-common-white text-center h-100" style="padding: 30px 20px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); transition: transform 0.3s ease;">
                   <div class="mb-20" style="color: #618B2F; font-size: 40px;">
                      <i :class="taller.icon"></i>
                   </div>
                   <h4 class="tp-ff-familjen fs-24 tp-text-common-black-5 mb-10">{{ taller.name }}</h4>
                   <span class="badge bg-light text-dark fw-500" style="font-family: 'Montserrat', sans-serif;">{{ taller.cat }}</span>
                </div>
             </div>
          </div>

          <div class="row mt-60 justify-content-center tp_fade_anim" data-delay=".5">
             <div class="col-lg-8">
                <div class="p-5 text-center" style="background: linear-gradient(90deg, #D97706 0%, #F59E0B 100%); border-radius: 24px; color: white; box-shadow: 0 10px 30px rgba(217, 119, 6, 0.3);">
                   <h3 class="tp-ff-familjen fs-36 mb-20 text-white">¡Todo gran esfuerzo es reconocido!</h3>
                   <p class="fs-18 mb-30 font-montserrat-regular text-white opacity-8">Si tu hijo ya concluyó un ciclo de Talleres Inteligentes, puedes descargar su reconocimiento de participación.</p>
                   <NuxtLink to="/ubicaciones" class="tp-btn-md bg-white text-dark d-inline-block lh-1 fs-16 fw-700 tp-ff-dm rounded-pill px-4">
                      Contactar Coordinación
                   </NuxtLink>
                </div>
             </div>
          </div>
       </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const talleres = ref([
  { name: 'Fútbol Soccer', cat: 'Deportes', icon: 'fa-regular fa-futbol' },
  { name: 'Básquetbol', cat: 'Deportes', icon: 'fa-regular fa-basketball-ball' },
  { name: 'Tae Kwon Do', cat: 'Deportes', icon: 'fa-regular fa-user-ninja' },
  { name: 'Tenis', cat: 'Deportes', icon: 'fa-regular fa-tennis-ball' },
  { name: 'Tocho Bandera', cat: 'Deportes', icon: 'fa-regular fa-football-ball' },
  { name: 'Gimnasia', cat: 'Deportes', icon: 'fa-regular fa-child' },
  { name: 'Jazz', cat: 'Danza', icon: 'fa-regular fa-shoe-prints' },
  { name: 'Ballet', cat: 'Danza', icon: 'fa-regular fa-star' },
  { name: 'Danza Árabe', cat: 'Danza', icon: 'fa-regular fa-gem' },
  { name: 'Teatro Musical', cat: 'Arte', icon: 'fa-regular fa-theater-masks' },
  { name: 'Teclado Inicial', cat: 'Música', icon: 'fa-regular fa-piano' },
  { name: 'Ensamble Musical', cat: 'Música', icon: 'fa-regular fa-guitar' },
  { name: 'Be an Artist', cat: 'Arte', icon: 'fa-regular fa-palette' },
  { name: 'Ajedrez', cat: 'Estrategia', icon: 'fa-regular fa-chess-knight' }
]);

useHead({
  title: 'Talleres Inteligentes | Colegios IECS-IEDIS',
  meta: [{ name: 'description', content: 'Actividades vespertinas culturales, artísticas y deportivas para nuestros alumnos.' }]
});
</script>