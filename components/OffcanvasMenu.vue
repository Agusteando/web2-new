<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="iecs-offcanvas-root" :class="{ 'is-open': isOpen }" :aria-hidden="!isOpen">
        <!-- Overlay -->
        <div class="iecs-offcanvas-overlay" @click="closeMenu"></div>

        <!-- Sidebar Panel -->
        <div class="iecs-offcanvas-panel" role="dialog" aria-modal="true" aria-label="Menú principal">
          <div class="iecs-offcanvas-inner">
            
            <!-- Header: Logo + Close -->
            <div class="iecs-offcanvas-header mb-40">
              <div class="iecs-offcanvas-logo">
                <NuxtLink to="/" @click="closeMenu">
                  <img src="/assets/img/IECS-IEDIS IMAGES/IMAGOTIPOS-HORIZONTAL-IECS-IEDIS-GRADIENT.webp" alt="IECS-IEDIS Logo">
                </NuxtLink>
              </div>
              <button class="iecs-offcanvas-close" @click="closeMenu" aria-label="Cerrar menú">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <!-- Desktop Content Header -->
            <div class="iecs-offcanvas-desktop-title d-none d-xl-block mb-30">
              <h3>Nuestros niveles<br>educativos:</h3>
            </div>

            <!-- Mobile Navigation (Accordion) -->
            <nav class="iecs-offcanvas-mobile-nav d-xl-none mb-40">
              <ul>
                <div class="iecs-mobile-husky-pass text-left mb-30">
                  <a href="https://admin.casitaiedis.edu.mx/login.php" target="_blank" rel="noopener noreferrer" class="d-inline-block">
                    <img src="/assets/img/IECS-IEDIS IMAGES/ID-HUSKY-PASS-HORIZONTAL.webp" alt="Husky Pass" style="width: 140px; height: auto; object-fit: contain;">
                  </a>
                </div>
                
                <li class="has-dropdown" :class="{ 'active': activeNav === 'descubre' }">
                  <a href="#" @click.prevent="toggleNav('descubre')">
                    Descubre
                    <span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </a>
                  <ul class="iecs-submenu" :style="{ display: activeNav === 'descubre' ? 'block' : 'none' }">
                    <li><NuxtLink to="/acerca-de-institutos" @click="closeMenu">Acerca de los institutos</NuxtLink></li>
                    <li><NuxtLink to="/campus" @click="closeMenu">Nuestros campus</NuxtLink></li>
                    <li><NuxtLink to="/escuela-padres" @click="closeMenu">Escuela para padres</NuxtLink></li>
                    <li><NuxtLink to="/convenios" @click="closeMenu">Convenios IECS-IEDIS</NuxtLink></li>
                    <li><NuxtLink to="/voluntarios" @click="closeMenu">Voluntarios IECS-IEDIS</NuxtLink></li>
                  </ul>
                </li>
                
                <li class="has-dropdown" :class="{ 'active': activeNav === 'niveles' }">
                  <a href="#" @click.prevent="toggleNav('niveles')">
                    Niveles
                    <span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </a>
                  <ul class="iecs-submenu" :style="{ display: activeNav === 'niveles' ? 'block' : 'none' }">
                    <li><NuxtLink to="/daycare" @click="closeMenu" style="color: #8EC152;">Desarrollo Infantil</NuxtLink></li>
                    <li><NuxtLink to="/preschool" @click="closeMenu" style="color: #E83F4B;">Preescolar</NuxtLink></li>
                    <li><NuxtLink to="/elementary-school" @click="closeMenu" style="color: #FCBF2C;">Primaria</NuxtLink></li>
                    <li><NuxtLink to="/middle-school" @click="closeMenu" style="color: #66A8D8;">Secundaria</NuxtLink></li>
                  </ul>
                </li>
                
                <li><NuxtLink to="/talleres-inteligentes" @click="closeMenu">Talleres Inteligentes</NuxtLink></li>
                <li><NuxtLink to="/vida-husky" @click="closeMenu">Vida Husky</NuxtLink></li>
              </ul>
            </nav>

            <!-- Desktop Gallery Grid -->
            <div class="iecs-offcanvas-gallery d-none d-xl-block mb-50">
              <div class="gallery-grid">
                <NuxtLink to="/daycare" @click="closeMenu" class="gallery-item">
                  <img src="/assets/img/IECS-IEDIS IMAGES/THUMB-DAYCARE-HAMBUERGER.webp" alt="Daycare / Guardería / Desarrollo Infantil">
                </NuxtLink>
                <NuxtLink to="/preschool" @click="closeMenu" class="gallery-item">
                  <img src="/assets/img/IECS-IEDIS IMAGES/THUMB-PREESCOLAR-HAMBUERGER.webp" alt="Preescolar / Preschool">
                </NuxtLink>
                <NuxtLink to="/elementary-school" @click="closeMenu" class="gallery-item">
                  <img src="/assets/img/IECS-IEDIS IMAGES/THUMB-PRIMARIA-HAMBUERGER.webp" alt="Primaria / Elementary School">
                </NuxtLink>
                <NuxtLink to="/middle-school" @click="closeMenu" class="gallery-item">
                  <img src="/assets/img/IECS-IEDIS IMAGES/THUMB-SECUNDARIA-HAMBUERGER.webp" alt="Secundaria / Middle School">
                </NuxtLink>
              </div>
            </div>

            <!-- Contact Information -->
            <div class="iecs-offcanvas-contact mb-40">
              <h3 class="iecs-offcanvas-contact-title">CAMPUS TOLUCA / OCOYOACAC / CALIMAYA</h3>
              <ul>
                <li><a href="tel:7225725729">722 572 5729</a></li>
                <li><a href="https://wa.me/message/PI6TZB36CIWYD1" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i> Chat Whatsapp</a></li>
                <li><a href="mailto:mercadotecnia@casitaiedis.edu.mx">mercadotecnia@casitaiedis.edu.mx</a></li>
              </ul>
            </div>

            <div class="iecs-offcanvas-contact mb-50">
              <h3 class="iecs-offcanvas-contact-title">CAMPUS METEPEC</h3>
              <ul>
                <li><a href="tel:7221095789">722 109 5789</a></li>
                <li><a href="https://wa.me/message/KBRAQHE4ITIRD1" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp"></i> Chat Whatsapp</a></li>
                <li><a href="mailto:coord.mkt.met@casitaiedis.edu.mx">coord.mkt.met@casitaiedis.edu.mx</a></li>
              </ul>
            </div>

            <!-- Social Media -->
            <div class="iecs-offcanvas-social mb-30">
              <h3 class="iecs-offcanvas-social-title">FOLLOW US</h3>
              <ul>
                <li><a href="https://www.facebook.com/profile.php?id=61574164795795" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook"></i></a></li>
                <li><a href="https://www.instagram.com/iecsi_edis/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a></li>
                <li><a href="https://www.tiktok.com/@iecs.iedis" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-tiktok"></i></a></li>
                <li><a href="https://mx.linkedin.com/company/iecs-iedis" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin"></i></a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from '#app'

const isOpen = useState('isOffcanvasOpen', () => false)
const route = useRoute()
const activeNav = ref(null)

const toggleNav = (menu) => {
  activeNav.value = activeNav.value === menu ? null : menu
}

const closeMenu = () => {
  isOpen.value = false
  setTimeout(() => { activeNav.value = null }, 300) // Reset accordion after transition
}

// Ensure the menu auto-closes smoothly when navigating to a new route
watch(() => route.path, () => {
  closeMenu()
})

// Close on escape key
const handleKeydown = (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeMenu()
  }
}

// Lock body scroll when open to prevent background scrolling
watch(isOpen, (newVal) => {
  if (import.meta.client) {
    if (newVal) {
      document.body.style.setProperty('overflow', 'hidden', 'important')
    } else {
      document.body.style.removeProperty('overflow')
    }
  }
})

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.removeProperty('overflow')
  }
})
</script>

<style scoped>
/* 
  =============================================================
  ISOLATED OFFCANVAS ARCHITECTURE
  Precisely matched typography, assets, and spacing based on 
  the provided design screenshot.
  =============================================================
*/

.iecs-offcanvas-root {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  pointer-events: none; /* Allows clicks to pass through when closed */
}

.iecs-offcanvas-root.is-open {
  pointer-events: auto;
}

/* Background Overlay */
.iecs-offcanvas-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
  backdrop-filter: blur(3px);
}

.iecs-offcanvas-root.is-open .iecs-offcanvas-overlay {
  opacity: 1;
  visibility: visible;
}

/* Sidebar Drawer */
.iecs-offcanvas-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 480px;
  max-width: 100vw;
  height: 100%;
  background-color: #ffffff;
  transform: translateX(100%);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);
}

.iecs-offcanvas-root.is-open .iecs-offcanvas-panel {
  transform: translateX(0);
}

.iecs-offcanvas-inner {
  padding: 50px 45px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

@media (max-width: 575px) {
  .iecs-offcanvas-inner {
    padding: 30px 25px;
  }
}

/* Header & Controls */
.iecs-offcanvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.iecs-offcanvas-logo img {
  max-width: 220px;
  height: auto;
}

/* Precise Close Button */
.iecs-offcanvas-close {
  background: transparent;
  border: none;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #141414;
  transition: transform 0.3s ease, color 0.2s ease;
  flex-shrink: 0;
}

.iecs-offcanvas-close:hover {
  color: #e83f4b;
  transform: rotate(90deg);
}

/* Desktop Title matching Fredoka / heavy geometry */
.iecs-offcanvas-desktop-title h3 {
  font-family: 'Fredoka', 'Montserrat', sans-serif;
  font-size: 42px;
  font-weight: 700;
  color: #4b5563; /* Slate grey matching screenshot */
  line-height: 1.1;
  letter-spacing: -1px;
  margin: 0;
}

/* Desktop Gallery Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.gallery-item {
  display: block;
  overflow: hidden;
  position: relative;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
  transition: transform 0.4s ease;
  display: block;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

/* Contact Information matching screenshot */
.iecs-offcanvas-contact-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #D56F00;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: -0.5px;
}

.iecs-offcanvas-contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.iecs-offcanvas-contact a {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #4b5563;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s;
  line-height: 1.4;
}

.iecs-offcanvas-contact a:hover {
  color: #D56F00;
}

.iecs-offcanvas-contact i {
  font-size: 16px;
  color: #4b5563; /* Outline icon color matches text in screenshot */
}

/* Social Media matching screenshot */
.iecs-offcanvas-social-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #4b5563;
  text-transform: uppercase;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
}

.iecs-offcanvas-social ul {
  display: flex;
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.iecs-offcanvas-social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  font-size: 18px;
  transition: all 0.3s ease;
  text-decoration: none;
  background: transparent;
}

.iecs-offcanvas-social a:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
  color: #141414;
  transform: translateY(-3px);
}

/* Mobile Nav Accordion */
.iecs-offcanvas-mobile-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.iecs-offcanvas-mobile-nav > ul > li {
  border-bottom: 1px solid #f0f0f0;
}

.iecs-offcanvas-mobile-nav > ul > li:last-child {
  border-bottom: none;
}

.iecs-offcanvas-mobile-nav > ul > li > a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #141414;
  text-decoration: none;
  transition: color 0.2s;
}

.iecs-offcanvas-mobile-nav > ul > li > a span svg {
  transition: transform 0.3s ease;
}

.iecs-offcanvas-mobile-nav > ul > li.active > a {
  color: #618B2F;
}

.iecs-offcanvas-mobile-nav > ul > li.active > a span svg {
  transform: rotate(180deg);
}

.iecs-submenu {
  padding-bottom: 16px;
  padding-left: 15px;
}

.iecs-submenu li {
  border: none !important;
}

.iecs-submenu a {
  display: block;
  padding: 8px 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #555;
  text-decoration: none;
  transition: color 0.2s;
}

.iecs-submenu a:hover {
  color: #618B2F;
}
</style>