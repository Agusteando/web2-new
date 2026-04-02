<template>
  <main>
    <!-- HERO SECTION -->
    <div class="tp-service-hero-area tp-service-hero-spacing p-relative z-index-1" style="background-image: url('/assets/img/IECS-IEDIS IMAGES/836x720-talleresinteligentes.webp'); background-size: cover; background-position: center; min-height: 75vh; display: flex; align-items: center;">
       <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.85) 100%); z-index: -1;"></div>
       <div class="container py-5 text-center">
          <div class="tp_fade_anim" data-delay=".2">
             <img src="/assets/img/IECS-IEDIS IMAGES/TALLERES-SPONSOR-450X446.webp" alt="Talleres Inteligentes" style="max-width: 250px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));" class="mb-30">
          </div>
          <h1 class="tp-ff-familjen fs-70 fs-lg-60 fs-xs-40 tp-text-common-black-5 mb-20 lh-1 tp_fade_anim" data-delay=".4">Diversión + Aprendizaje</h1>
          <p class="tp-ff-dm fs-20 lh-160-per tp-text-grey-7 mx-auto mb-40 tp_fade_anim" data-delay=".6" style="max-width: 800px;">
             La filosofía de proporcionar una educación integral a nuestros alumnos la aplicamos en todos los aspectos. En horario vespertino, ofrecemos un portafolio de disciplinas académicas, artísticas y deportivas para potenciar sus pasiones.
          </p>
          <div class="tp-breadcrumb-list justify-content-center tp_fade_anim" data-delay=".8">
             <ul>
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li><span></span></li>
                <li>Talleres Inteligentes</li>
             </ul>
          </div>
       </div>
    </div>

    <!-- TALLERES CATEGORIES -->
    <div class="tp-service-area pb-100 pt-80 tp-bg-common-white-2">
       <div class="container">
          <!-- Deportes -->
          <div class="mb-70">
             <div class="d-flex align-items-center gap-3 mb-40 tp_fade_anim" data-delay=".2">
                <div style="width: 50px; height: 50px; background: #E83F4B; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">
                   <i class="fa-regular fa-futbol"></i>
                </div>
                <h3 class="fs-40 tp-ff-familjen tp-text-common-black-5 mb-0">Deportes y Resistencia</h3>
             </div>
             <div class="row">
                <div v-for="t in talleresDeportes" :key="t.name" class="col-lg-3 col-md-4 col-sm-6 mb-30 tp_fade_anim" data-delay=".3">
                   <div class="tp-service-md-item tp-bg-common-white text-center h-100 d-flex flex-column justify-content-center align-items-center hover-lift" style="padding: 35px 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
                      <div class="mb-20" style="color: #E83F4B; font-size: 40px; opacity: 0.9;"><i :class="t.icon"></i></div>
                      <h4 class="tp-ff-familjen fs-22 tp-text-common-black-5 mb-0">{{ t.name }}</h4>
                   </div>
                </div>
             </div>
          </div>

          <!-- Arte y Danza -->
          <div class="mb-70">
             <div class="d-flex align-items-center gap-3 mb-40 tp_fade_anim" data-delay=".2">
                <div style="width: 50px; height: 50px; background: #618B2F; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">
                   <i class="fa-regular fa-masks-theater"></i>
                </div>
                <h3 class="fs-40 tp-ff-familjen tp-text-common-black-5 mb-0">Arte, Danza y Expresión</h3>
             </div>
             <div class="row">
                <div v-for="t in talleresArte" :key="t.name" class="col-lg-3 col-md-4 col-sm-6 mb-30 tp_fade_anim" data-delay=".3">
                   <div class="tp-service-md-item tp-bg-common-white text-center h-100 d-flex flex-column justify-content-center align-items-center hover-lift" style="padding: 35px 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
                      <div class="mb-20" style="color: #618B2F; font-size: 40px; opacity: 0.9;"><i :class="t.icon"></i></div>
                      <h4 class="tp-ff-familjen fs-22 tp-text-common-black-5 mb-0">{{ t.name }}</h4>
                   </div>
                </div>
             </div>
          </div>

          <!-- Música y Lógica -->
          <div class="mb-40">
             <div class="d-flex align-items-center gap-3 mb-40 tp_fade_anim" data-delay=".2">
                <div style="width: 50px; height: 50px; background: #FCBF2C; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">
                   <i class="fa-regular fa-music"></i>
                </div>
                <h3 class="fs-40 tp-ff-familjen tp-text-common-black-5 mb-0">Música y Estrategia</h3>
             </div>
             <div class="row">
                <div v-for="t in talleresLogica" :key="t.name" class="col-lg-3 col-md-4 col-sm-6 mb-30 tp_fade_anim" data-delay=".3">
                   <div class="tp-service-md-item tp-bg-common-white text-center h-100 d-flex flex-column justify-content-center align-items-center hover-lift" style="padding: 35px 20px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
                      <div class="mb-20" style="color: #FCBF2C; font-size: 40px; opacity: 0.9;"><i :class="t.icon"></i></div>
                      <h4 class="tp-ff-familjen fs-22 tp-text-common-black-5 mb-0">{{ t.name }}</h4>
                   </div>
                </div>
             </div>
          </div>

          <!-- BANNER CTA -->
          <div class="row mt-80 justify-content-center tp_fade_anim" data-delay=".5">
             <div class="col-lg-10">
                <div class="p-5 p-lg-5 text-center position-relative overflow-hidden" style="background: linear-gradient(135deg, #D97706 0%, #b46305 100%); border-radius: 24px; color: white; box-shadow: 0 15px 35px rgba(217, 119, 6, 0.25);">
                   <!-- Decoraciones SVG -->
                   <svg class="position-absolute opacity-10" style="bottom: -20px; left: -20px; width: 200px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m14.31 8 5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4-5.74 9.94"></path></svg>
                   
                   <div class="position-relative z-index-1">
                      <h3 class="tp-ff-familjen fs-42 mb-20 text-white">¡Todo gran esfuerzo es reconocido!</h3>
                      <p class="fs-18 mb-40 font-montserrat-regular text-white opacity-9 max-w-800 mx-auto">
                         Al finalizar el ciclo escolar, organizamos presentaciones en vivo y entregamos reconocimientos de participación. Si tu hijo ya concluyó un ciclo, ponte en contacto.
                      </p>
                      <NuxtLink to="/ubicaciones" class="tp-btn-md bg-white text-dark d-inline-block lh-1 fs-16 fw-700 tp-ff-dm rounded-pill px-5 py-3 shadow-sm hover-lift-white">
                         Contactar Coordinación
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

const talleresDeportes = ref([
  { name: 'Fútbol Soccer', icon: 'fa-regular fa-futbol' },
  { name: 'Básquetbol', icon: 'fa-regular fa-basketball-ball' },
  { name: 'Tae Kwon Do', icon: 'fa-regular fa-user-ninja' },
  { name: 'Tenis', icon: 'fa-regular fa-tennis-ball' },
  { name: 'Tocho Bandera', icon: 'fa-regular fa-football-ball' },
  { name: 'Gimnasia', icon: 'fa-regular fa-child' }
]);

const talleresArte = ref([
  { name: 'Jazz', icon: 'fa-regular fa-shoe-prints' },
  { name: 'Ballet', icon: 'fa-regular fa-star' },
  { name: 'Danza Árabe', icon: 'fa-regular fa-gem' },
  { name: 'Teatro Musical', icon: 'fa-regular fa-theater-masks' },
  { name: 'Be an Artist', icon: 'fa-regular fa-palette' }
]);

const talleresLogica = ref([
  { name: 'Teclado Inicial', icon: 'fa-regular fa-piano' },
  { name: 'Ensamble Musical', icon: 'fa-regular fa-guitar' },
  { name: 'Ajedrez', icon: 'fa-regular fa-chess-knight' }
]);

useHead({
  title: 'Talleres Inteligentes | Colegios IECS-IEDIS',
  meta: [{ name: 'description', content: 'Actividades vespertinas culturales, artísticas y deportivas para nuestros alumnos.' }]
});
</script>

<style scoped>
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.06) !important;
}
.hover-lift-white {
  transition: transform 0.3s ease, background-color 0.3s ease;
}
.hover-lift-white:hover {
  transform: translateY(-3px);
  background-color: #f3f4f6 !important;
}
</style>