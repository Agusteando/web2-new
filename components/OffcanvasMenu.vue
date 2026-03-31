<template>
  <div>
    <div :class="['tp-offcanvas-area', { 'opened': isOpen }]">
       <div class="tp-offcanvas">
          <div class="d-flex align-items-center justify-content-between">
             <div class="tp-offcanvas-logo mb-20 mt-10">
                <NuxtLink to="/">
                   <img data-width="250" src="/assets/img/IECS-IEDIS IMAGES/IMAGOTIPOS-HORIZONTAL-IECS-IEDIS-GRADIENT.webp" alt="logo">
                </NuxtLink>
             </div>
             <div class="tp-offcanvas-close-btn">
                <button class="close-btn" @click="isOpen = false">
                   <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.19141 9.80762L27.5762 28.1924" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M9.19141 28.1924L27.5762 9.80761" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                   </svg>
                </button>
             </div>
          </div>
          <div class="tp-offcanvas-content d-none d-xl-block">
             <h3 class="tp-offcanvas-title">Nuestros niveles educativos:</h3>
          </div>
          <div class="tp-offcanvas-gallery d-none d-xl-block">
             <div class="row gx-2">
                <div class="col-md-3 col-3">
                   <div class="tp-offcanvas-gallery-img fix">
                      <NuxtLink class="popup-image" to="/daycare"><img src="/assets/img/IECS-IEDIS IMAGES/THUMB-DAYCARE-HAMBUERGER.webp" alt="Daycare"></NuxtLink>
                   </div>
                </div>
                <div class="col-md-3 col-3">
                   <div class="tp-offcanvas-gallery-img fix">
                      <NuxtLink class="popup-image" to="/preschool"><img src="/assets/img/IECS-IEDIS IMAGES/THUMB-PREESCOLAR-HAMBUERGER.webp" alt="Preescolar"></NuxtLink>
                   </div>
                </div>
                <div class="col-md-3 col-3">
                   <div class="tp-offcanvas-gallery-img fix">
                      <NuxtLink class="popup-image" to="/elementary-school"><img src="/assets/img/IECS-IEDIS IMAGES/THUMB-PRIMARIA-HAMBUERGER.webp" alt="Primaria"></NuxtLink>
                   </div>
                </div>
                <div class="col-md-3 col-3">
                   <div class="tp-offcanvas-gallery-img fix">
                      <NuxtLink class="popup-image" to="/middle-school"><img src="/assets/img/IECS-IEDIS IMAGES/THUMB-SECUNDARIA-HAMBUERGER.webp" alt="Secundaria"></NuxtLink>
                   </div>
                </div>
             </div>
          </div>
          <div class="tp-offcanvas-contact">
             <h3 class="tp-offcanvas-title sm" style="color: #D56F00;">Campus Toluca / Ocoyoacac / Calimaya</h3>
             <ul>
                <li><a href="tel:722 572 5729">722 572 5729</a><br><a href="https://wa.me/message/PI6TZB36CIWYD1"><i class="fa-brands fa-whatsapp"></i> Chat Whatsapp</a></li>
                <li><a href="mailto:mercadotecnia@casitaiedis.edu.mx">mercadotecnia@casitaiedis.edu.mx</a></li>
             </ul>
          </div>
          <div class="tp-offcanvas-contact">
             <h3 class="tp-offcanvas-title sm" style="color: #D56F00;">Campus Metepec</h3>
             <ul>
                <li><a href="tel:722 109 5789">722 109 5789</a><br><a href="https://wa.me/message/KBRAQHE4ITIRD1"><i class="fa-brands fa-whatsapp"></i> Chat Whatsapp</a></li>
                <li><a href="mailto:coord.mkt.met@casitaiedis.edu.mx ">coord.mkt.met@casitaiedis.edu.mx </a></li>
             </ul>
          </div>
          <div class="tp-offcanvas-social">
             <h3 class="tp-offcanvas-title sm">Follow Us</h3>
             <ul>
                <li><a href="https://www.facebook.com/profile.php?id=61574164795795"><i class="fa-brands fa-facebook"></i></a></li>
                <li><a href="https://www.instagram.com/iecsi_edis/"><i class="fa-brands fa-instagram"></i></a></li>
                <li><a href="https://www.tiktok.com/@iecs.iedis"><i class="fa-brands fa-tiktok"></i></a></li>
                <li><a href="https://mx.linkedin.com/company/iecs-iedis"><i class="fa-brands fa-linkedin"></i></a></li>
             </ul>
          </div>
       </div>
    </div>
    <div :class="['body-overlay', { 'opened': isOpen }]" @click="isOpen = false"></div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from '#app'

const isOpen = useState('isOffcanvasOpen', () => false)
const route = useRoute()

// Ensure the menu auto-closes smoothly when navigating to a new route via links inside the drawer
watch(() => route.path, () => {
  isOpen.value = false
})
</script>