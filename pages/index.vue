<template>
  <main>
    <!-- ISOLATED HERO SECTION REBUILD -->
    <div class="iecs-hero-section" style="background-image: url('/assets/img/hero/md/bg.jpg');">
       <div class="iecs-hero-container">
          
          <!-- LEFT COLUMN: STRICT TEXT COMPOSITION -->
          <div class="iecs-hero-left">
             <span class="iecs-hero-tag">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                   <circle cx="12" cy="12" r="9"></circle>
                   <circle cx="12" cy="12" r="4" fill="currentColor"></circle>
                </svg>
                Colegios IECS - IEDIS
             </span>
             
             <h1 class="iecs-hero-title">
                <div class="iecs-hero-title-row">
                   <span>Crecer con valores,</span>
                   <img src="/assets/img/IECS-IEDIS IMAGES/hero-shape.webp" alt="" class="iecs-hero-shape">
                </div>
                <div class="iecs-hero-title-row">aprender con sentido.</div>
             </h1>
             
             <p class="iecs-hero-desc">
                Cultivamos una educación integral con calidez,<br class="d-none d-xl-block">
                respeto y propósito.
             </p>
             
             <div class="iecs-hero-actions">
                <NuxtLink to="/ubicaciones" class="iecs-hero-btn-primary">
                   Agenda tu visita
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                   </svg>
                </NuxtLink>
                
                <a href="https://youtu.be/cwX1iPY2kJE" target="_blank" class="iecs-hero-btn-video popup-video">
                   <span class="iecs-hero-play-icon">
                      <svg width="14" height="16" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                     </svg>
                   </span>
                   <span class="iecs-hero-video-text">Descubre nuestros espacios</span>
                </a>
             </div>

             <img class="iecs-hero-ambassadors" src="/assets/img/IECS-IEDIS IMAGES/104X104-AMBASSADORS.svg" alt="">
          </div>

          <!-- RIGHT COLUMN: VERTICAL CARD CLUSTER -->
          <div class="iecs-hero-right">
             <div class="iecs-hero-accordion">
                <div 
                  class="iecs-accordion-item" 
                  :class="{ 'is-active': activeCard === 1 }" 
                  @mouseover="activeCard = 1"
                  @focusin="activeCard = 1"
                >
                   <NuxtLink to="/daycare" class="iecs-accordion-link">
                      <div class="iecs-accordion-bg">
                         <img src="/assets/img/IECS-IEDIS IMAGES/504x644-sunny.webp" alt="Guardería / Daycare">
                      </div>
                      <div class="iecs-accordion-overlay">
                         <h4 class="iecs-accordion-title">Guardería<br>Daycare</h4>
                      </div>
                   </NuxtLink>
                </div>
                
                <div 
                  class="iecs-accordion-item" 
                  :class="{ 'is-active': activeCard === 2 }" 
                  @mouseover="activeCard = 2"
                  @focusin="activeCard = 2"
                >
                   <NuxtLink to="/preschool" class="iecs-accordion-link">
                      <div class="iecs-accordion-bg">
                         <img src="/assets/img/IECS-IEDIS IMAGES/504x644-joy.webp" alt="Preescolar / Preschool">
                      </div>
                      <div class="iecs-accordion-overlay">
                         <h4 class="iecs-accordion-title">Preescolar<br>Preschool</h4>
                      </div>
                   </NuxtLink>
                </div>
                
                <div 
                  class="iecs-accordion-item" 
                  :class="{ 'is-active': activeCard === 3 }" 
                  @mouseover="activeCard = 3"
                  @focusin="activeCard = 3"
                >
                   <NuxtLink to="/elementary-school" class="iecs-accordion-link">
                      <div class="iecs-accordion-bg">
                         <img src="/assets/img/IECS-IEDIS IMAGES/504x644-brave.webp" alt="Primaria / Elementary School">
                      </div>
                      <div class="iecs-accordion-overlay">
                         <h4 class="iecs-accordion-title">Primaria<br>Elementary School</h4>
                      </div>
                   </NuxtLink>
                </div>
                
                <div 
                  class="iecs-accordion-item" 
                  :class="{ 'is-active': activeCard === 4 }" 
                  @mouseover="activeCard = 4"
                  @focusin="activeCard = 4"
                >
                   <NuxtLink to="/middle-school" class="iecs-accordion-link">
                      <div class="iecs-accordion-bg">
                         <img src="/assets/img/IECS-IEDIS IMAGES/504x644-hope.webp" alt="Secundaria / Middle School">
                      </div>
                      <div class="iecs-accordion-overlay">
                         <h4 class="iecs-accordion-title">Secundaria<br>Middle School</h4>
                      </div>
                   </NuxtLink>
                </div>
             </div>
          </div>
          
       </div>
    </div>
    
    <AdSenseStrip />

    <!-- tp-feature-area-start -->
    <div class="tp-feature-area pt-50 pb-80">
       <div class="container-fluid container-1824">
          <div class="row">
             <div class="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
                <div class="tp-feature-md-item tpshake-wrap d-flex mb-30 tp_fade_anim" data-delay=".3" data-duration="1" data-fade-from="bottom" data-ease="bounce" data-bg-color="#E8F4D9">
                   <div class="tp-feature-md-icon mr-30">
                      <img class="tpshake" src="/assets/img/IECS-IEDIS IMAGES/40x42-icon-sunny.webp" alt="">
                      <ion-icon name="paper-plane-outline"></ion-icon>
                   </div>
                   <div class="tp-feature-md-content">
                      <img data-width="350" class="tpshake mb-20" src="/assets/img/IECS-IEDIS IMAGES/ID-HORIZONTAL-GUARDERIA.webp" alt="">
                      <h4 class="tp-ff-familjen fw-600 fs-24 lh-140-per ls-m-4 tp-text-common-black-5">¡ Creciendo con amor desde el primer día !</h4>
                      <p class="tp-ff-dm fs-18 lh-160-per ls-m-3 tp-text-common-black-6 opacity-8 mb-20">Sunny nos recuerda que cada pequeño gesto importa. En nuestra guardería, cuidamos, guiamos y despertamos la curiosidad desde los 43 días de nacidos.</p>
                      <NuxtLink to="/daycare" class="tp-feature-md-btn tp-btn-md hover-text-white d-inline-block tp-text-common-black-5 lh-1 fs-16 fw-700 tp-ff-dm">
                         <span>Read More</span>
                         <svg class="ml-5" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L14 1M14 1H3.88889M14 1V10.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                         </svg>
                      </NuxtLink>
                   </div>
                </div>
             </div>
             <div class="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
                <div class="tp-feature-md-item tpshake-wrap d-flex mb-30 tp_fade_anim" data-delay=".5" data-duration="1" data-fade-from="bottom" data-ease="bounce" data-bg-color="#F4D9D9">
                   <div class="tp-feature-md-icon mr-30">
                      <img class="tpshake" src="/assets/img/IECS-IEDIS IMAGES/40x42-icon-joy.webp" alt="">
                      <ion-icon name="color-palette-outline"></ion-icon>
                   </div>
                   <div class="tp-feature-md-content">
                      <img data-width="250" class="tpshake mb-20" src="/assets/img/IECS-IEDIS IMAGES/ID-HORIZONTAL-PREESCOLAR.webp" alt="">
                      <h4 class="tp-ff-familjen fw-600 fs-24 lh-140-per ls-m-4 tp-text-common-black-5">¡ Aprender es un juego !</h4>
                      <p class="tp-ff-dm fs-18 lh-160-per ls-m-3 tp-text-common-black-6 opacity-8 mb-20">Joy juega, ríe y aprende rodeada de historias, colores y valores. En Preescolar sembramos la base de un aprendizaje feliz y significativo.</p>
                      <NuxtLink to="/preschool" class="tp-feature-md-btn tp-btn-md hover-text-white d-inline-block tp-text-common-black-5 lh-1 fs-16 fw-700 tp-ff-dm">
                         <span>Read More</span>
                         <svg class="ml-5" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L14 1M14 1H3.88889M14 1V10.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                         </svg>
                      </NuxtLink>
                   </div>
                </div>
             </div>
             <div class="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
                <div class="tp-feature-md-item tpshake-wrap d-flex mb-30 tp_fade_anim" data-delay=".7" data-duration="1" data-fade-from="bottom" data-ease="bounce" data-bg-color="#F4EFD9">
                   <div class="tp-feature-md-icon mr-30">
                      <img class="tpshake" src="/assets/img/IECS-IEDIS IMAGES/40x42-icon-brave.webp" alt="">
                      <ion-icon name="telescope-outline"></ion-icon>
                   </div>
                   <div class="tp-feature-md-content">
                      <img data-width="300" class="tpshake mb-20" src="/assets/img/IECS-IEDIS IMAGES/ID-HORIZONTAL-PRIMARIA.webp" alt="">
                      <h4 class="tp-ff-familjen fw-600 fs-24 lh-140-per ls-m-4 tp-text-common-black-5">¡ Desafios, una oportunidad para crear !</h4>
                      <p class="tp-ff-dm fs-18 lh-160-per ls-m-3 tp-text-common-black-6 opacity-8 mb-20">Brave enfrenta desafíos con empatía y decisión. En Primaria formamos pensadores, makers y niños conscientes de su entorno.</p>
                      <NuxtLink to="/elementary-school" class="tp-feature-md-btn tp-btn-md hover-text-white d-inline-block tp-text-common-black-5 lh-1 fs-16 fw-700 tp-ff-dm">
                         <span>Read More</span>
                         <svg class="ml-5" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L14 1M14 1H3.88889M14 1V10.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                         </svg>
                      </NuxtLink>
                   </div>
                </div>
             </div>
             <div class="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
                <div class="tp-feature-md-item tpshake-wrap d-flex mb-30 tp_fade_anim" data-delay=".9" data-duration="1" data-fade-from="bottom" data-ease="bounce" data-bg-color="#D9E9F4">
                   <div class="tp-feature-md-icon mr-30">
                      <img class="tpshake" src="/assets/img/IECS-IEDIS IMAGES/40x42-icon-hope.webp" alt="">
                      <ion-icon name="finger-print-outline"></ion-icon>
                   </div>
                   <div class="tp-feature-md-content">
                      <img data-width="250" class="tpshake mb-20" src="/assets/img/IECS-IEDIS IMAGES/ID-HORIZONTAL-SECUNDARIA.webp" alt="">
                      <h4 class="tp-ff-familjen fw-600 fs-24 lh-140-per ls-m-4 tp-text-common-black-5">¡ Valores,que dejan huella !</h4>
                      <p class="tp-ff-dm fs-18 lh-160-per ls-m-3 tp-text-common-black-6 opacity-8 mb-20">Hope camina con respeto y propósito. En Secundaria cultivamos pensamiento crítico, liderazgo y un proyecto de vida sólido.</p>
                      <NuxtLink to="/middle-school" class="tp-feature-md-btn tp-btn-md hover-text-white d-inline-block tp-text-common-black-5 lh-1 fs-16 fw-700 tp-ff-dm">
                         <span>Read More</span>
                         <svg class="ml-5" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13L14 1M14 1H3.88889M14 1V10.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                         </svg>
                      </NuxtLink>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    
    <!-- tp-about-area-start -->
    <div class="tp-about-area p-relative z-index-1 pb-160 tp-item-anime-area-md">
       <div class="tp-about-md-shape d-none d-lg-block">
          <img class="has_fade_anim" data-fade-from="left" data-duration="2" data-delay="0.3" data-fade-offset="80" data-ease="bounce" src="/assets/img/IECS-IEDIS IMAGES/530x671-hands.webp" alt="">
       </div>
       <div class="tp-about-md-shape-2">
          <img class="has_fade_anim" data-fade-from="right" data-duration="2" data-delay="0.3" data-fade-offset="80" data-ease="bounce" src="/assets/img/IECS-IEDIS IMAGES/137x246-highlight.webp" alt="">
       </div>
       <h2 class="tp-about-md-bigtext fw-600 tp-ff-familjen ls-m-4 tp-item-anime-md marque d-none d-lg-block">Calidez</h2>
       <div class="container">
          <div class="col-lg-12">
             <div class="tp-about-md-title-wrap mb-65">
                <h4 class="text-anim tp-about-md-title tp-ff-familjen fw-600 ls-m-4 tp-text-common-black-5 lh-1">Acerca de los Institutos</h4>
             </div>
          </div>
          <div class="offset-lg-3 col-lg-9">
             <div class="tp-about-md-content ml-90 mr-85">
                <div class="tp_fade_anim" data-delay=".3">
                   <p class="tp-ff-dm fs-18 lh-150-per ls-m-3 tp-text-grey-7 mb-30 font-montserrat-regular">Durante más de 30 años, los Institutos IECS - IEDIS han adaptado la educación a los estilos de aprendizaje, las habilidades y los intereses de los educandos,<span class="fw-500 tp-text-common-black-5"> al tiempo que busca ampliar las perspectivas de los estudiantes</span> para la vida en un entorno global, de una forma integral.</p>
                </div>
                <div class="tp-about-md-expreance">
                   <div class="row">
                      <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-5">
                         <div class="tp-about-md-expreance-count tp_fade_anim" data-delay=".7">
                            <span>
                               <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle opacity="0.05" cx="100" cy="100" r="100" fill="#0752C5" />
                               </svg>
                            </span>
                            <h2 class="tp-ff-familjen ls-m-4 tp-text-common-black-5"><span data-purecounter-duration="1" data-purecounter-end="33" class="purecounter">0</span></h2>
                         </div>
                      </div>
                      <div class="col-xxl-5 col-xl-6 col-lg-6 col-md-6">
                         <div class="tp-about-md-expreance-content tp_fade_anim" data-delay=".9">
                            <h4 class="tp-ff-familjen fs-32 lh-110-per ls-m-4 tp-text-common-black-5 mb-20">Años de experiencia<br> educativa.</h4>
                            <p class="tp-ff-dm fs-18 lh-160-per ls-m-3 tp-text-grey-7 mb-30">Nuestra historia es el reflejo de un compromiso constante por brindar una educación integral que deja huella.</p>
                            <NuxtLink to="/acerca-de-institutos" class="tp-btn-md tp-bg-theme-1 tp-left-right p-relative hover-text-white d-inline-block tp-text-grey-5 lh-1 fs-16 fw-700 tp-ff-dm">
                               <span class="mr10 td-text d-inline-block mr-5">Conoce más +</span>
                               <span class="tp-arrow-angle">
                                  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="#F3F1F2" stroke-width="1.5" stroke-linecap="round" />
                                     <path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="#F3F1F2" stroke-width="1.5" stroke-linecap="round" />
                                  </svg>
                               </span>
                            </NuxtLink>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <div class="col-12 order-3">
            <div class="tp-brand-wrap tp-hero-ai-brand pt-125">
               <div class="swiper tp-brand-slide-active">
                  <div class="swiper-wrapper slide-transtion">
                     <div class="swiper-slide"><div class="tp-brand-item"><a href="#"><img src="/assets/img/IECS-IEDIS IMAGES/CAMBRIDGE-SPONSOR-450X446.webp" alt=""></a></div></div>
                     <div class="swiper-slide"><div class="tp-brand-item"><a href="#"><img src="/assets/img/IECS-IEDIS IMAGES/APPLE-SPONSOR-450X446.webp" alt=""></a></div></div>
                     <div class="swiper-slide"><div class="tp-brand-item"><a href="#"><img src="/assets/img/IECS-IEDIS IMAGES/UNOI-SPONSOR-450X446.webp" alt=""></a></div></div>
                     <div class="swiper-slide"><div class="tp-brand-item"><a href="#"><img src="/assets/img/IECS-IEDIS IMAGES/TALLERES-SPONSOR-450X446.webp" alt=""></a></div></div>
                     <div class="swiper-slide"><div class="tp-brand-item"><a href="#"><img src="/assets/img/IECS-IEDIS IMAGES/HUSKIES-SPONSOR-450X446.webp" alt=""></a></div></div>
                     <div class="swiper-slide"><div class="tp-brand-item"><a href="#"><img src="/assets/img/IECS-IEDIS IMAGES/INOVATIQ-SPONSOR-450X446.webp" alt=""></a></div></div>
                     <div class="swiper-slide"><div class="tp-brand-item"><a href="#"><img src="/assets/img/IECS-IEDIS IMAGES/ORDEREAT-SPONSOR-450X446.webp" alt=""></a></div></div>
                     <div class="swiper-slide"><div class="tp-brand-item"><a href="#"><img src="/assets/img/IECS-IEDIS IMAGES/HABILMIND-SPONSOR-450X446.webp" alt=""></a></div></div>
                     <div class="swiper-slide"><div class="tp-brand-item"><a href="#"><img src="/assets/img/IECS-IEDIS IMAGES/DISCOVERY-SPONSOR-450X446.webp" alt=""></a></div></div>
                  </div>
               </div>
            </div>
          </div>
       </div>
    </div>
    
    <!-- tp-service-area-start -->
    <div class="tp-service-area pb-110">
       <div class="container-fluid container-1824">
          <div class="row">
             <div class="col-xl-4 col-lg-6 col-md-8">
                <div class="tp-service-md-title-wrap mb-40">
                   <span class="tp-text-revel-anim fix tp-section-md-subtitle tp-ff-dm fw-600 fs-16 ls-m-3 tp-text-common-black d-inline-block">Un colegio que acompaña su día, y el tuyo también. </span>
                   <h2 class="tp-text-revel-anim fix tp-section-md-title tp-ff-familjen fs-62 lh-1 ls-m-3 tp-text-common-black-5 mb-20">Educación, cuidado y bienestar en un mismo lugar.</h2>
                   <p class="tp-ff-dm fs-20 lh-150-per ls-m-3 tp-text-common-black-6 opacity-8 mb-50">En IECS–IEDIS entendemos que cada familia es distinta. Nuestros servicios integrados facilitan tu rutina y promueven su desarrollo integral, sin que tengas que preocuparte por la logística.</p>
                </div>
             </div>
             <div class="col-xl-8">
                <div class="tp-service-md-item-wrap ml-50">
                   <div class="row gx-30">
                      <div class="col-lg-6 col-md-6 tp_fade_anim" data-delay=".3" data-fade-from="bottom">
                         <div class="tp-service-md-item tp-bg-common-white tpshake-wrap mb-50">
                            <span class="tp-service-md-icon tpshake d-inline-block mb-45 icon-bus">
                               <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-plus"><path d="M12 6v6l3.644 1.822"/><path d="M16 19h6"/><path d="M19 16v6"/><path d="M21.92 13.267a10 10 0 1 0-8.653 8.653"/></svg>
                            </span>
                            <h3 class="tp-service-md-title tp-ff-familjen fw-500 fs-42 ls-m-4 tp-text-common-black-5 mb-15"><a href="#" class="underline-black">Tiempo Extendido</a></h3>
                            <p class="tp-service-md-text tp-ff-dm fs-18 lh-160-per ls-m-3 tp-text-common-black-6 opacity-8 mb-35">Nuestro horario extendido ofrece acompañamiento, apoyo en tareas y actividades recreativas en un entorno seguro y afectivo, para que tus hijos sigan aprendiendo mientras tú trabajas con tranquilidad.</p>
                         </div>
                      </div>
                      <div class="col-lg-6 col-md-6 tp_fade_anim" data-delay=".5" data-fade-from="bottom">
                         <div class="tp-service-md-item tpshake-wrap tp-bg-common-white mb-50">
                            <span class="tp-service-md-icon tpshake d-inline-block mb-45">
                               <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
                            </span>
                            <h3 class="tp-service-md-title tp-ff-familjen fw-500 fs-42 ls-m-4 tp-text-common-black-5 mb-15"><a href="#" class="underline-black">Comedor Escolar</a></h3>
                            <p class="tp-service-md-text tp-ff-dm fs-18 lh-160-per ls-m-3 tp-text-common-black-6 opacity-8 mb-35">Contamos con un menú diseñado por nutriólogos y preparado con los más altos estándares de higiene. Promovemos hábitos saludables y momentos de convivencia que fortalecen la comunidad IECS–IEDIS.</p>
                         </div>
                      </div>
                      <div class="col-lg-6 col-md-6 tp_fade_anim" data-delay=".7" data-fade-from="bottom">
                         <div class="tp-service-md-item tpshake-wrap tp-bg-common-white mb-50">
                            <span class="tp-service-md-icon tpshake d-inline-block mb-45">
                               <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-medal"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/></svg>
                            </span>
                            <h3 class="tp-service-md-title tp-ff-familjen fw-500 fs-42 ls-m-4 tp-text-common-black-5 mb-15"><a href="#" class="underline-black">Talleres Inteligentes</a></h3>
                            <p class="tp-service-md-text tp-ff-dm fs-18 lh-160-per ls-m-3 tp-text-common-black-6 opacity-8 mb-35">Después de clase, los alumnos exploran su curiosidad en talleres artísticos, deportivos y tecnológicos que estimulan la imaginación y el trabajo en equipo.</p>
                         </div>
                      </div>
                      <div class="col-lg-6 col-md-6 tp_fade_anim" data-delay=".9" data-fade-from="bottom">
                         <div class="tp-service-md-item tpshake-wrap tp-bg-common-white mb-50">
                            <span class="tp-service-md-icon tpshake d-inline-block mb-45">
                               <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bus"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>
                            </span>
                            <h3 class="tp-service-md-title tp-ff-familjen fw-500 fs-42 ls-m-4 tp-text-common-black-5 mb-15"><a href="#" class="underline-black">Transporte Escolar</a></h3>
                            <p class="tp-service-md-text tp-ff-dm fs-18 lh-160-per ls-m-3 tp-text-common-black-6 opacity-8 mb-35">Nuestro servicio de transporte conecta los distintos campus con puntualidad y confianza. Supervisado por personal capacitado y con protocolos de seguridad, aseguramos que cada niño llegue feliz y seguro a su destino.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    
    <!-- tp-portfolio-area-start -->
    <div class="tp-portfolio-area tp-portfolio-md-border fix">
       <div class="container-fluid p-0">
          <div class="tp-portfolio-md-wrapper">
             <div class="tp-portfolio-md-inner-wrap">
                <div class="tp-portfolio-md-item">
                   <div class="tp-portfolio-md-thumb not-hide-cursor mb-40" data-cursor="View<br>Demo">
                      <NuxtLink class="cursor-hide" to="/escuela-padres"><img src="/assets/img/IECS-IEDIS IMAGES/836x720-escuela-padres.webp" alt=""></NuxtLink>
                   </div>
                   <div class="tp-portfolio-md-content">
                      <span class="tp-portfolio-md-tag tp-round-36 tp-ff-dm fw-600 ls-m-2 tp-text-common-black-5 mb-10 d-inline-block">-</span>
                      <h4 class="tp-portfolio-md-title tp-ff-familjen fs-32 lh-130-per tp-text-common-black-5"><NuxtLink to="/escuela-padres" class="underline-black">Escuela para Padres</NuxtLink></h4>
                   </div>
                </div>
                <div class="tp-portfolio-md-item">
                   <div class="tp-portfolio-md-thumb not-hide-cursor mb-40" data-cursor="View<br>Demo">
                      <NuxtLink class="cursor-hide" to="/talleres-inteligentes"><img src="/assets/img/IECS-IEDIS IMAGES/836x720-talleresinteligentes.webp" alt=""></NuxtLink>
                   </div>
                   <div class="tp-portfolio-md-content">
                      <span class="tp-portfolio-md-tag tp-round-36 tp-ff-dm fw-600 ls-m-2 tp-text-common-black-5 mb-10 d-inline-block">-</span>
                      <h4 class="tp-portfolio-md-title tp-ff-familjen fs-32 lh-130-per tp-text-common-black-5"><NuxtLink to="/talleres-inteligentes" class="underline-black">Talleres Inteligentes</NuxtLink></h4>
                   </div>
                </div>
                <div class="tp-portfolio-md-item">
                   <div class="tp-portfolio-md-thumb not-hide-cursor mb-40" data-cursor="View<br>Demo">
                      <a class="cursor-hide" href="#"><img src="/assets/img/IECS-IEDIS IMAGES/836x720-eventos.webp" alt=""></a>
                   </div>
                   <div class="tp-portfolio-md-content">
                      <span class="tp-portfolio-md-tag tp-round-36 tp-ff-dm fw-600 ls-m-2 tp-text-common-black-5 mb-10 d-inline-block">-</span>
                      <h4 class="tp-portfolio-md-title tp-ff-familjen fs-32 lh-130-per tp-text-common-black-5"><a href="#" class="underline-black">Eventos IECS - IEDIS</a></h4>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    
    <!-- tp-faq-area-start -->
    <div class="tp-faq-area pt-145 pb-70">
       <div class="container">
          <div class="row">
             <div class="col-lg-6 mb-30">
                <div class="tp-faq-md-title-wrap mb-30">
                   <span class="tp-text-revel-anim fix tp-section-md-subtitle tp-ff-dm fw-600 fs-16 ls-m-3 tp-text-common-black d-inline-block mb-10">¿Tienes dudas? Aquí está todo lo que quieres saber.</span>
                   <h2 class="tp-text-revel-anim fix tp-section-md-title tp-ff-familjen fs-62 lh-1 ls-m-3 tp-text-common-black-5 mb-20">Guía rápida para nuevos padres IECS - IEDIS</h2>
                </div>
                <div class="tp-faq-wrap tp-faq-cst-tab-content tp-faq-md-tab-content mb-40">
                   <div class="accordion mb-60" id="general_faqaccordion">
                      <div class="accordion-item tp_fade_anim" data-delay=".4">
                         <h2 class="accordion-header p-relative" id="order_one">
                            <button class="tp-faq-btn" type="button" data-bs-toggle="collapse" data-bs-target="#order__collapse_one" aria-expanded="true" aria-controls="order__collapse_one">
                               ¿Cuál es el proceso para inscribir a mi hijo en IECS–IEDIS?
                               <span class="accordion-btn"></span>
                            </button>
                         </h2>
                         <div id="order__collapse_one" class="accordion-collapse collapse show" aria-labelledby="order_one" data-bs-parent="#general_faqaccordion">
                            <div class="accordion-body tp-faq-details-para">
                               <p>Branding is the process of creating a unique identity for your business, <b>including visuals, messaging, and positioning.</b> It helps build trust, recognition.</p>
                            </div>
                         </div>
                      </div>
                      <div class="accordion-item tp_fade_anim" data-delay=".4">
                         <h2 class="accordion-header p-relative" id="order_two">
                            <button class="collapsed tp-faq-btn" type="button" data-bs-toggle="collapse" data-bs-target="#order__collapse_two" aria-expanded="false" aria-controls="order__collapse_two">
                               ¿El programa es bilingüe o bicultural?
                               <span class="accordion-btn"></span>
                            </button>
                         </h2>
                         <div id="order__collapse_two" class="accordion-collapse collapse" aria-labelledby="order_two" data-bs-parent="#general_faqaccordion">
                            <div class="accordion-body tp-faq-details-para">
                               <p>Branding is the process of creating a unique identity for your business, <b>including visuals, messaging, and positioning.</b> It helps build trust, recognition.</p>
                            </div>
                         </div>
                      </div>
                      <div class="accordion-item tp_fade_anim" data-delay=".4">
                         <h2 class="accordion-header p-relative" id="order_three">
                            <button class="collapsed tp-faq-btn" type="button" data-bs-toggle="collapse" data-bs-target="#order__collapse_three" aria-expanded="false" aria-controls="order__collapse_three">
                              ¿En qué ubicaciones se encuentran los campus?
                               <span class="accordion-btn"></span>
                            </button>
                         </h2>
                         <div id="order__collapse_three" class="accordion-collapse collapse" aria-labelledby="order_three" data-bs-parent="#general_faqaccordion">
                            <div class="accordion-body tp-faq-details-para">
                               <p>Branding is the process of creating a unique identity for your business, <b>including visuals, messaging, and positioning.</b> It helps build trust, recognition.</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             <div class="col-lg-6">
                <div class="tp-faq-md-thumb text-lg-end p-relative mb-30">
                   <atropos-component>
                      <div class="app-stack-thumb-box p-relative text-end rounded-circle">
                         <div class="my-atropos">
                            <div class="atropos">
                               <div class="atropos-scale">
                                  <div class="atropos-rotate">
                                     <div class="atropos-inner">
                                        <img data-atropos-offset="-4.5" src="/assets/img/IECS-IEDIS IMAGES/581x680-husky-callcenter.webp" alt="">
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </atropos-component>
                   <img class="tp-faq-md-shape upslide" src="/assets/img/faq/md/shape.png" alt="">
                </div>
             </div>
          </div>
       </div>
    </div>
    
    <!-- tp-text-slider-area-start -->
    <div class="tp-text-md-slider-area pb-95">
       <div class="swiper-container tp-text-md-slider-active">
          <div class="swiper-wrapper slide-transtion">
             <div class="swiper-slide">
                <div class="tp-text-md-top-text">
                   <h2 class="tp-text-md-title tp-ff-familjen ls-m-3 tp-text-common-black-5 mb-0"> Compartiendo contigo la formación integral de tus hijos. </h2>
                </div>
             </div>
             <div class="swiper-slide">
                <div class="tp-text-md-top-text">
                   <h2 class="tp-text-md-title tp-ff-familjen ls-m-3 tp-text-common-black-5 mb-0"> Compartiendo contigo la formación integral de tus hijos. </h2>
                </div>
             </div>
             <div class="swiper-slide">
                <div class="tp-text-md-top-text">
                   <h2 class="tp-text-md-title tp-ff-familjen ls-m-3 tp-text-common-black-5 mb-0"> Compartiendo contigo la formación integral de tus hijos. </h2>
                </div>
             </div>
          </div>
       </div>
    </div>
    
    <!-- tp-video-area-start -->
    <div class="tp-video-area tp-video-md-spacing scale-up-img p-relative">
       <img class="tp-video-md-bg img-cover scale-up" data-speed=".8" src="/assets/img/IECS-IEDIS IMAGES/1920x860-video-cover.webp" alt="">
       <div class="tp-video-main tp-video-md-wrap">
          <a class="tp-video-md-btn popup-video video-animetion" href="https://www.youtube.com/watch?v=cwX1iPY2kJE">
             <span>
                <svg width="34" height="38" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M31.5 14.6699C34.8333 16.5944 34.8333 21.4056 31.5 23.3301L7.5 37.1865C4.16667 39.111 1.90427e-06 36.7054 2.07252e-06 32.8564L3.28388e-06 5.14359C3.45213e-06 1.29459 4.16667 -1.11104 7.5 0.813466L31.5 14.6699Z" fill="#F3F1F2" />
                </svg>
             </span>
          </a>
       </div>
    </div>

    <!-- funfact area start -->
    <div class="tp-funfact-area">
       <div class="tp-funfact-panel-wrap">
          <div class="tp-funfact-panel">
             <div class="tp-funfact-green-wrap bg-position tp-text-bounce-trigger p-relative" data-background="/assets/img/funfact/bg.jpg">
                <div class="container">
                   <div class="row">
                      <div class="col-lg-6 col-md-6">
                         <div class="tp-funfact-img-wrap">
                            <div class="row gx-20">
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay=".3">
                                     <img src="/assets/img/IECS-IEDIS IMAGES/funfact-1.webp" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay=".5">
                                     <img src="/assets/img/IECS-IEDIS IMAGES/funfact-2.webp" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay=".7">
                                     <img src="/assets/img/IECS-IEDIS IMAGES/funfact-3.webp" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay=".9">
                                     <img src="/assets/img/funfact/funfact-placeholder-2.png" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1">
                                     <img src="/assets/img/IECS-IEDIS IMAGES/funfact-5.webp" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.1">
                                     <img src="/assets/img/funfact/funfact-placeholder-2.png" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.2">
                                     <img src="/assets/img/IECS-IEDIS IMAGES/funfact-8.webp" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.3">
                                     <img src="/assets/img/IECS-IEDIS IMAGES/funfact-4.webp " alt="">
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                      <div class="col-lg-6 col-md-6">
                         <div class="tp-funfact-content-wrap ml-85">
                            <div class="tp-funfact-content tp_fade_anim" data-fade-from="right" data-delay="1.3">
                               <span class="tp-funfact-subtitle d-inline-block tp-ff-dm fw-600 fs-16 tp-text-common-black-5">Toluca, Metepec, Ocoyoacac y Calimaya unidos por una comunidad que crece y aprende con sentido.</span>
                               <h4 class="tp-funfact-title tp-ff-familjen fs-92 fs-xl-70 fs-lg-60 ls-m-4 tp-text-common-black-5">6 campus,  <br> una misma familia</h4>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div class="tp-funfact-img-wrap-2 p-relative">
                      <div class="row">
                         <div class="col-lg-6 col-md-6">
                            <div class="row">
                               <div class="col-lg-6">
                                  <div class="row gx-20">
                                     <div class="col-lg-6 col-sm-4 col-6">
                                        <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.4">
                                           <img src="/assets/img/funfact/funfact-placeholder.png" alt="">
                                        </div>
                                     </div>
                                     <div class="col-lg-6 col-sm-4 col-6">
                                        <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.5">
                                           <img src="/assets/img/IECS-IEDIS IMAGES/funfact-4.webp" alt="">
                                        </div>
                                     </div>
                                     <div class="col-lg-6 col-sm-4 col-6">
                                        <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.6">
                                           <img src="/assets/img/IECS-IEDIS IMAGES/funfact-6.webp" alt="">
                                        </div>
                                     </div>
                                     <div class="col-lg-6 col-sm-4 col-6">
                                        <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.7">
                                           <img src="/assets/img/funfact/funfact-placeholder-2.png" alt="">
                                        </div>
                                     </div>
                                  </div>
                               </div>
                               <div class="col-lg-6">
                                  <div class="tp-funfact-big-img mb-20 tp-text-bounce" data-delay=".7">
                                     <img src="/assets/img/IECS-IEDIS IMAGES/funfact-6.png" alt="">
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <div class="tp-funfact-panel">
             <div class="tp-funfact-green-wrap pink-style bg-position tp-text-bounce-trigger" data-background="/assets/img/funfact/bg-2.png">
                <div class="container">
                   <div class="row">
                      <div class="col-lg-6 col-md-6">
                         <div class="tp-funfact-img-wrap">
                            <div class="row gx-20">
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay=".3">
                                     <img src="/assets/img/IECS-IEDIS IMAGES/funfact-a.webp" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay=".5">
                                    <img src="/assets/img/IECS-IEDIS IMAGES/funfact-b.webp" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay=".7">
                                     <img src="/assets/img/IECS-IEDIS IMAGES/funfact-c.webp" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay=".9">
                                     <img src="/assets/img/funfact/funfact-placeholder-3.png" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1">
                                     <img src="/assets/img/funfact/funfact-placeholder-3.png" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.1">
                                     <img src="/assets/img/IECS-IEDIS IMAGES/funfact-d.webp" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.2">
                                     <img src="/assets/img/funfact/funfact-placeholder-3.png" alt="">
                                  </div>
                               </div>
                               <div class="col-lg-3 col-sm-4 col-6">
                                  <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.3">
                                     <img src="/assets/img/funfact/funfact-placeholder-2.png" alt="">
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                      <div class="col-lg-6 col-md-6">
                         <div class="tp-funfact-content-wrap ml-85">
                            <div class="tp-funfact-content tp_fade_anim" data-fade-from="right" data-delay="1.3">
                               <span class="tp-funfact-subtitle d-inline-block tp-ff-dm fw-600 fs-16 tp-text-common-white">Proyectos solidarios y campañas que enseñan a nuestros alumnos a impactar positivamente en su comunidad.</span>
                               <h4 class="tp-funfact-title tp-ff-familjen fs-92 fs-xl-70 fs-lg-60 ls-m-4 tp-text-common-white">Formación con <br> responsabilidad social.</h4>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div class="tp-funfact-img-wrap-2 p-relative">
                      <div class="row">
                         <div class="col-lg-6 col-md-6">
                            <div class="row">
                               <div class="col-lg-6">
                                  <div class="row gx-20">
                                     <div class="col-lg-6 col-sm-4 col-6">
                                        <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.4">
                                           <img src="/assets/img/funfact/funfact-placeholder.png" alt="">
                                        </div>
                                     </div>
                                     <div class="col-lg-6 col-sm-4 col-6">
                                        <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.5">
                                           <img src="/assets/img/IECS-IEDIS IMAGES/funfact-f.webp" alt="">
                                        </div>
                                     </div>
                                     <div class="col-lg-6 col-sm-4 col-6">
                                        <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.6">
                                           <img src="/assets/img/funfact/funfact-placeholder-3.png" alt="">
                                        </div>
                                     </div>
                                     <div class="col-lg-6 col-sm-4 col-6">
                                        <div class="tp-funfact-img mb-20 tp_fade_anim" data-delay="1.7">
                                           <img src="/assets/img/IECS-IEDIS IMAGES/funfact-g.webp" alt="">
                                        </div>
                                     </div>
                                  </div>
                               </div>
                               <div class="col-lg-6">
                                  <div class="tp-funfact-big-img mb-20 tp-text-bounce" data-delay=".7">
                                     <img src="/assets/img/IECS-IEDIS IMAGES/funfact-7.webp" alt="">
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <div class="tp-funfact-panel">
             <div class="tp-funfact-green-wrap yellow-style bg-position tp-text-bounce-trigger h-100" data-background="/assets/img/funfact/bg-2.jpg">
                <div class="container-fluid container-1646">
                   <div class="row">
                      <div class="col-12">
                         <div class="tp-funfact-content-wrap p-relative z-index-1">
                            <img class="tp-funfact-yellow-shape tp_fade_anim d-none d-md-block" data-delay="1.6" src="/assets/img/IECS-IEDIS IMAGES/funfact-A1.webp" alt="">
                            <img class="tp-funfact-yellow-shape-2 tp_fade_anim d-none d-md-block" data-delay="1.7" src="/assets/img/IECS-IEDIS IMAGES/funfact-A2.webp" alt="">
                            <img class="tp-funfact-yellow-shape-3 tp_fade_anim d-none d-md-block" data-delay="1.8" src="/assets/img/IECS-IEDIS IMAGES/funfact-A3.webp" alt="">
                            <img class="tp-funfact-yellow-shape-4 tp_fade_anim d-none d-md-block" data-delay="1.9" src="/assets/img/IECS-IEDIS IMAGES/funfact-A4.webp" alt="">
                            <div class="tp-funfact-number text-center">
                               <h3 class="tp-ff-familjen fs-60 fs-xl-50 lh-1 ls-m-4 tp-text-common-black-5 mb-0 tp_fade_anim" data-delay=".3">Una comunidad que <br> crece contigo.</h3>
                               <span class="tp_fade_anim fs-20" data-delay=".5"><em>#</em>IECS-IEDIS</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    
    <!-- tp-blog-area-start -->
    <div class="tp-blog-area pt-155 section-m-spacing pb-130">
       <div class="container-fluid container-1824">
          <div class="row align-items-end mb-20">
             <div class="col-lg-8">
               <div class="tp-testimonial-ai-title-wrap mb-30">
                   <span class="tp-text-revel-anim fix tp-section-md-subtitle tp-ff-dm fw-600 fs-16 ls-m-3 tp-text-common-black d-inline-block mb-10">Acompáñanos a revivir los momentos que hacen especial cada jornada en IECS–IEDIS.</span>
                   <h2 class="tp-text-revel-anim fix tp-section-md-title tp-ff-familjen fs-62 lh-1 ls-m-3 tp-text-common-black-5 mb-20">Nuestro día a día <br> en acción.</h2>
                </div>
             </div>
             <div class="col-lg-4">
                <div class="tp-blog-md-btn mb-40 text-lg-end tp_fade_anim" data-delay=".4" data-fade-from="bottom" data-ease="bounce">
                   <a href="#" class="tp-btn-md tp-bg-theme-1 tp-left-right p-relative hover-text-white d-inline-block tp-text-grey-5 lh-1 fs-16 fw-700 tp-ff-dm">
                      <span class="td-text d-inline-block mr-5">Ver todas las noticias</span>
                      <span class="tp-arrow-angle">
                         <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                         </svg>
                      </span>
                   </a>
                </div>
             </div>
          </div>
          <div class="row">
             <div v-for="(n, i) in (noticias || [])" :key="n.id" class="col-xl-4 col-lg-6 col-md-6 tp_fade_anim" data-delay=".4" :data-fade-from="['left', 'bottom', 'right'][i] || 'bottom'" data-ease="bounce">
                <div class="tp-blog-ai-item tp-blog-md-item tp--hover-item tp-round-24 mb-30">
                   <NuxtLink :to="`/noticias/${n.id}`" class="tp-round-24 w-100 fix p-relative d-inline-block">
                      <div class="tp-blog-ai-thumb w-100 tp--hover-img tp-round-24" data-displacement="assets/img/imghover/stripe-mul.png" data-intensity="0.2" data-speedin="1" data-speedout="1">
                         <img class="tp-round-24 w-100" :src="resolveImage(n.imagen, i)" alt="">
                      </div>
                   </NuxtLink>
                   <div class="tp-blog-ai-content tp-blog-md-content text-center">
                      <div class="tp-blog-md-dates">
                         <span class="tp-ff-dm mb-5 fw-500 fs-16 tp-text-common-black-5 d-inline-block">
                            <svg class="mr-5" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M0 12.0683C0.000926244 12.8416 0.308512 13.5829 0.855289 14.1297C1.40207 14.6765 2.14339 14.984 2.91665 14.985H11.0833C11.8565 14.984 12.5978 14.6765 13.1446 14.1297C13.6914 13.5829 13.999 12.8416 13.9999 12.0683V6.81836H0V12.0683ZM9.9166 9.44334C10.0897 9.44334 10.2588 9.49466 10.4027 9.5908C10.5466 9.68695 10.6588 9.82361 10.725 9.98349C10.7912 10.1434 10.8085 10.3193 10.7748 10.489C10.741 10.6588 10.6577 10.8147 10.5353 10.937C10.4129 11.0594 10.257 11.1428 10.0873 11.1765C9.91757 11.2103 9.74164 11.193 9.58175 11.1267C9.42187 11.0605 9.28521 10.9483 9.18907 10.8045C9.09292 10.6606 9.0416 10.4914 9.0416 10.3183C9.0416 10.0863 9.13379 9.86371 9.29788 9.69962C9.46198 9.53553 9.68454 9.44334 9.9166 9.44334ZM6.99995 9.44334C7.17301 9.44334 7.34218 9.49466 7.48607 9.5908C7.62996 9.68695 7.74211 9.82361 7.80834 9.98349C7.87457 10.1434 7.89189 10.3193 7.85813 10.489C7.82437 10.6588 7.74104 10.8147 7.61867 10.937C7.4963 11.0594 7.34039 11.1428 7.17065 11.1765C7.00092 11.2103 6.82499 11.193 6.66511 11.1267C6.50522 11.0605 6.36857 10.9483 6.27242 10.8045C6.17627 10.6606 6.12496 10.4914 6.12496 10.3183C6.12496 10.0863 6.21714 9.86371 6.38124 9.69962C6.54533 9.53553 6.76789 9.44334 6.99995 9.44334ZM4.0833 9.44334C4.25636 9.44334 4.42553 9.49466 4.56943 9.5908C4.71332 9.68695 4.82547 9.82361 4.89169 9.98349C4.95792 10.1434 4.97525 10.3193 4.94149 10.489C4.90772 10.6588 4.82439 10.8147 4.70202 10.937C4.57965 11.0594 4.42374 11.1428 4.25401 11.1765C4.08428 11.2103 3.90834 11.193 3.74846 11.1267C3.58857 11.0605 3.45192 10.9483 3.35577 10.8045C3.25963 10.6606 3.20831 10.4914 3.20831 10.3183C3.20831 10.0863 3.3005 9.86371 3.46459 9.69962C3.62868 9.53553 3.85124 9.44334 4.0833 9.44334Z" fill="currentColor" />
                               <path d="M11.0833 2.15201H10.4999V1.56868C10.4999 1.41397 10.4385 1.2656 10.3291 1.1562C10.2197 1.04681 10.0713 0.985352 9.9166 0.985352C9.76189 0.985352 9.61352 1.04681 9.50412 1.1562C9.39473 1.2656 9.33327 1.41397 9.33327 1.56868V2.15201H4.66663V1.56868C4.66663 1.41397 4.60518 1.2656 4.49578 1.1562C4.38639 1.04681 4.23801 0.985352 4.0833 0.985352C3.9286 0.985352 3.78022 1.04681 3.67083 1.1562C3.56143 1.2656 3.49998 1.41397 3.49998 1.56868V2.15201H2.91665C2.14339 2.15294 1.40207 2.46052 0.855289 3.0073C0.308512 3.55407 0.000926244 4.29539 0 5.06865V5.65198H13.9999V5.06865C13.999 4.29539 13.6914 3.55407 13.1446 3.0073C12.5978 2.46052 11.8565 2.15294 11.0833 2.15201Z" fill="currentColor" />
                            </svg>
                            {{ formatDate(n.fecha) }}
                         </span>
                      </div>
                      <h4 class="tp-blog-md-title tp-ff-familjen fs-42 lh-1 ls-m-4 tp-text-common-black-5 mb-25"><NuxtLink :to="`/noticias/${n.id}`" class="underline-white">{{ n.titulo }}</NuxtLink></h4>
                      <NuxtLink :to="`/noticias/${n.id}`" class="tp-left-right p-relative hover-text-black d-inline-block text-uppercase tp-text-common-black-5 lh-1 fs-16 fw-700 tp-ff-dm">
                         <span class="td-text d-inline-block mr-5">Descubre más</span>
                         <span class="tp-arrow-angle">
                            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                               <path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                         </span>
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
import { ref } from 'vue'

const activeCard = ref(4)

const { data: noticias } = await useFetch('/api/noticias', { query: { limit: 3 } })

const fallbacks = [
  "/assets/img/IECS-IEDIS IMAGES/ex-news-578x433.webp",
  "/assets/img/IECS-IEDIS IMAGES/ex-news2-578x433.webp",
  "/assets/img/IECS-IEDIS IMAGES/ex-news3-578x433.webp",
]

const formatDate = (d) => {
  if (!d) return ''
  try { return new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(new Date(d)) } 
  catch { return d }
}

const resolveImage = (img, index) => {
  if (!img) return fallbacks[index] || fallbacks[0]
  return /^https?:\/\//i.test(img) ? img : (img.startsWith('/') ? img : `/${img}`)
}
</script>

<style scoped>
/* ==========================================================
   ISOLATED HERO ARCHITECTURE
   Pixel-faithful reproduction matching exact reference.
   Self-contained, namespaced, and resilient responsive grid.
   ========================================================== */

.iecs-hero-section {
  position: relative;
  /* Extra top padding ensures it securely clears the sticky transparent header */
  padding: 190px 0 120px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* Graceful fallback replicating the soft cyan glow if image is unavailable */
  background-color: #f4fbfc; 
  background-image: radial-gradient(circle at 0% 0%, #e0f2fe 0%, #ffffff 50%);
  overflow: hidden;
}

.iecs-hero-container {
  max-width: 1760px; /* Accommodates exact visual rhythm */
  margin: 0 auto;
  padding: 0 15px;
  display: grid;
  /* True two-column layout - left stack gets slightly more room */
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 50px;
  align-items: center;
}

/* --- Left Stack (Text & CTA) --- */
.iecs-hero-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding-right: 20px;
}

.iecs-hero-tag {
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #54595E;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.3px;
}

.iecs-hero-title {
  font-family: 'Fredoka', sans-serif;
  /* Precise font sizing to match line breaks and width on desktop */
  font-size: clamp(42px, 5.2vw, 88px); 
  line-height: 1.15;
  color: #54595E; /* Precise dark slate from reference */
  margin: 0 0 35px 0;
  font-weight: 700;
  letter-spacing: -1.5px;
  display: flex;
  flex-direction: column; /* Forces exact line structure */
  gap: 6px;
}

.iecs-hero-title-row {
  display: flex;
  align-items: center;
}

.iecs-hero-shape {
  height: 1.3em;
  width: auto;
  margin-left: 20px;
  flex-shrink: 0;
}

.iecs-hero-desc {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(18px, 1.8vw, 24px);
  line-height: 1.4;
  color: #6b7280; /* Lighter slate grey from reference */
  margin: 0 0 50px 0;
  font-weight: 300;
  letter-spacing: -0.2px;
}

/* --- CTA Row --- */
.iecs-hero-actions {
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

.iecs-hero-btn-primary {
  background-color: #d97706; /* Precise match to the reference orange */
  color: #ffffff;
  padding: 16px 36px;
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 18px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.iecs-hero-btn-primary:hover {
  background-color: #b46305;
  transform: translateY(-2px);
  color: #ffffff;
}

.iecs-hero-btn-video {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  color: #6b7280;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 18px;
  transition: color 0.3s ease;
}

.iecs-hero-btn-video:hover {
  color: #54595E;
}

.iecs-hero-play-icon {
  width: 56px;
  height: 56px;
  background-color: #54595E; /* Slate grey matching text */
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 4px; /* Optical centering for the play triangle */
  transition: background-color 0.3s ease;
}

.iecs-hero-btn-video:hover .iecs-hero-play-icon {
  background-color: #d97706;
}

.iecs-hero-video-text {
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* --- Floating Shape (Ambassadors) --- */
.iecs-hero-ambassadors {
  position: absolute;
  bottom: -60px;
  right: 15%;
  width: 104px;
  height: 104px;
  animation: iecs-spin 15s linear infinite;
  z-index: 1;
}

@keyframes iecs-spin {
  100% { transform: rotate(360deg); }
}

/* --- Right Stack (Accordion Cluster) --- */
.iecs-hero-right {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.iecs-hero-accordion {
  display: flex;
  gap: 20px;
  height: clamp(500px, 70vh, 660px); /* Matches text block height proportionally */
  width: 100%;
}

.iecs-accordion-item {
  flex: 1; /* Inactive panels default to equal narrow slices */
  border-radius: 40px; /* Heavy pill masking */
  overflow: hidden;
  position: relative;
  transition: flex 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: pointer;
  background-color: #f3f4f6;
  transform: translateZ(0); /* Prevents hardware-acceleration clipping bugs in Safari */
}

/* The active panel expands to claim ~55% of available width based on flex-grow */
.iecs-accordion-item.is-active {
  flex: 3.5; 
}

.iecs-accordion-link {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}

.iecs-accordion-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
}

.iecs-accordion-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.8s ease;
}

.iecs-accordion-item:hover .iecs-accordion-bg img {
  transform: scale(1.05);
}

.iecs-accordion-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0) 65%);
  display: flex;
  align-items: flex-end;
  padding: 40px 35px;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none; /* Mouse events pass safely to the underlying link */
}

.iecs-accordion-item.is-active .iecs-accordion-overlay {
  opacity: 1;
}

.iecs-accordion-title {
  color: #ffffff;
  font-family: 'Fredoka', sans-serif;
  font-size: 32px;
  line-height: 1.1;
  margin: 0;
  font-weight: 700;
  transform: translateY(20px);
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  letter-spacing: -0.5px;
}

.iecs-accordion-item.is-active .iecs-accordion-title {
  transform: translateY(0);
}

/* --- Responsive Adjustments --- */
@media (min-width: 992px) {
  /* Locks the top line together with the image to perfectly match reference */
  .iecs-hero-title-row:first-child {
    white-space: nowrap;
  }
}

@media (max-width: 1199px) {
  .iecs-hero-section {
    padding: 150px 0 80px;
  }
  .iecs-hero-container {
    grid-template-columns: 1fr;
    gap: 70px;
  }
  .iecs-hero-left {
    padding-right: 0;
  }
  .iecs-hero-ambassadors {
    display: none;
  }
}

@media (max-width: 991px) {
  .iecs-hero-title-row {
    flex-wrap: wrap;
  }
  .iecs-hero-accordion {
    flex-direction: column;
    height: auto;
    gap: 20px;
  }
  .iecs-accordion-item {
    flex: none;
    height: 180px;
    border-radius: 20px;
  }
  .iecs-accordion-item.is-active {
    flex: none;
  }
  .iecs-accordion-overlay {
    opacity: 1; /* Keep text visible at all times on touch interfaces */
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%);
    padding: 20px 25px;
  }
  .iecs-accordion-title {
    transform: translateY(0);
    font-size: 26px;
  }
}

@media (max-width: 767px) {
  .iecs-hero-section {
    padding: 120px 0 60px;
  }
  .iecs-hero-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>