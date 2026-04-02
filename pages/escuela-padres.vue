<template>
  <main>
    <div class="tp-service-hero-area tp-service-hero-spacing p-relative z-index-1" style="background-image: url('/assets/img/IECS-IEDIS IMAGES/836x720-escuela-padres.webp'); background-size: cover; background-position: center;">
       <!-- Overlay to ensure text readability -->
       <div style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%); z-index: -1;"></div>
       <div class="container pt-100 pb-100 text-center">
          <h1 class="tp-ff-familjen fs-70 mb-20" style="color: #618B2F;">Escuela para Padres</h1>
          <div class="tp-breadcrumb-list justify-content-center">
             <ul>
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li><span></span></li>
                <li>Descubre</li>
                <li><span></span></li>
                <li>Escuela para padres</li>
             </ul>
          </div>
       </div>
    </div>

    <div class="container pt-100 pb-100">
       <div class="row align-items-center justify-content-center">
          <div class="col-lg-10">
             <div class="text-center mb-50 tp_fade_anim" data-delay=".3">
                <img src="/assets/img/IECS-IEDIS IMAGES/funfact-2.webp" alt="Escuela para Padres" style="max-width: 200px; border-radius: 20px;" class="mb-40 shadow-sm">
                
                <h2 class="fs-40 fw-600 tp-ff-familjen tp-text-common-black-5 mb-30">Acompañamiento integral para la familia</h2>
                
                <p class="fs-20 lh-160-per tp-text-grey-7 mb-30 text-start">
                   En los Institutos IECS-IEDIS contamos con el programa <strong>Escuela para Padres</strong>, que tiene como objetivo proporcionar a las familias información, orientación, formación y asesoramiento para su importante tarea de guiar, y lograr así, un mayor desarrollo armónico de la personalidad de sus hijos.
                </p>
                <p class="fs-20 lh-160-per tp-text-grey-7 text-start">
                   Funge como una herramienta fundamental que permite <strong>reforzar la relación entre padres de familia, colegio y maestros</strong> en pro de la formación de nuestros alumnos. Es un espacio abierto, empático y de aprendizaje para que <strong>los padres no se sientan desorientados</strong> al afrontar los retos de la educación actual y las diferentes etapas del desarrollo.
                </p>
             </div>
             
             <div class="text-center mt-60 tp_fade_anim" data-delay=".5">
                <div class="tp-bg-common-white-2 p-5" style="border-radius: 24px; border-left: 6px solid #D97706;">
                   <h3 class="tp-ff-familjen fs-28 mb-15">¿Te interesa participar?</h3>
                   <p class="fs-18 tp-text-grey-7 mb-30">Mantente al tanto de nuestros comunicados internos y canales oficiales para conocer las fechas de nuestras próximas sesiones, conferencias magistrales y talleres formativos.</p>
                   <NuxtLink to="/ubicaciones" class="tp-btn-md tp-bg-theme-1 hover-text-white d-inline-block tp-text-common-white lh-1 fs-16 fw-700 tp-ff-dm rounded-pill">
                      Contactar a Dirección
                   </NuxtLink>
                </div>
             </div>
          </div>
       </div>
    </div>
  </main>
</template>

<script setup>
useHead({
  title: 'Escuela para Padres | Colegios IECS-IEDIS',
  meta: [{ name: 'description', content: 'Un espacio de orientación y formación para reforzar la relación entre padres, colegio y alumnos.' }]
});
</script>