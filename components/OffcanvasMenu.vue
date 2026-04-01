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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <!-- Mobile Husky Pass CTA -->
            <div class="iecs-offcanvas-husky mb-40">
              <a href="https://admin.casitaiedis.edu.mx/login.php" target="_blank" rel="noopener noreferrer" class="d-inline-block">
                <img src="/assets/img/IECS-IEDIS IMAGES/ID-HUSKY-PASS-HORIZONTAL.webp" alt="Husky Pass" style="width: 140px; height: auto; object-fit: contain;">
              </a>
            </div>

            <!-- Primary Navigation Links -->
            <nav class="iecs-offcanvas-nav mb-50">
              <ul>
                <li><NuxtLink to="/acerca-de-institutos" @click="closeMenu">Acerca de los institutos</NuxtLink></li>
                <li><NuxtLink to="/campus" @click="closeMenu">Nuestros campus</NuxtLink></li>
                <li><NuxtLink to="/escuela-padres" @click="closeMenu">Escuela para padres</NuxtLink></li>
                <li class="nav-divider"></li>
                <li><NuxtLink to="/daycare" @click="closeMenu" style="color: #8EC152;">Desarrollo Infantil</NuxtLink></li>
                <li><NuxtLink to="/preschool" @click="closeMenu" style="color: #E83F4B;">Preescolar</NuxtLink></li>
                <li><NuxtLink to="/elementary-school" @click="closeMenu" style="color: #FCBF2C;">Primaria</NuxtLink></li>
                <li><NuxtLink to="/middle-school" @click="closeMenu" style="color: #66A8D8;">Secundaria</NuxtLink></li>
                <li class="nav-divider"></li>
                <li><NuxtLink to="/talleres-inteligentes" @click="closeMenu">Talleres Inteligentes</NuxtLink></li>
                <li><NuxtLink to="/vida-husky" @click="closeMenu">Vida Husky</NuxtLink></li>
              </ul>
            </nav>

            <!-- Contact Information -->
            <div class="iecs-offcanvas-contact mb-30">
              <h3 class="iecs-offcanvas-title" style="color: #D56F00;">Campus Toluca / Ocoyoacac / Calimaya</h3>
              <ul>
                <li><a href="tel:7225725729">722 572 5729</a></li>
                <li><a href="https://wa.me/message/PI6TZB36CIWYD1"><i class="fa-brands fa-whatsapp"></i> Chat Whatsapp</a></li>
                <li><a href="mailto:mercadotecnia@casitaiedis.edu.mx">mercadotecnia@casitaiedis.edu.mx</a></li>
              </ul>
            </div>

            <div class="iecs-offcanvas-contact mb-40">
              <h3 class="iecs-offcanvas-title" style="color: #D56F00;">Campus Metepec</h3>
              <ul>
                <li><a href="tel:7221095789">722 109 5789</a></li>
                <li><a href="https://wa.me/message/KBRAQHE4ITIRD1"><i class="fa-brands fa-whatsapp"></i> Chat Whatsapp</a></li>
                <li><a href="mailto:coord.mkt.met@casitaiedis.edu.mx">coord.mkt.met@casitaiedis.edu.mx</a></li>
              </ul>
            </div>

            <!-- Social Media -->
            <div class="iecs-offcanvas-social">
              <h3 class="iecs-offcanvas-title">Síguenos</h3>
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
import { watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from '#app'

const isOpen = useState('isOffcanvasOpen', () => false)
const route = useRoute()

const closeMenu = () => {
  isOpen.value = false
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
  Self-owned state, layering, visibility, and transitions 
  completely decoupled from fragile theme selectors.
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
  width: 400px;
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
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* Header & Controls */
.iecs-offcanvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.iecs-offcanvas-logo img {
  max-width: 180px;
  height: auto;
}

.iecs-offcanvas-close {
  background: #f3f4f6;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #141414;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.iecs-offcanvas-close:hover {
  background: #e5e7eb;
  color: #e83f4b;
  transform: rotate(90deg);
}

/* Navigation List */
.iecs-offcanvas-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.iecs-offcanvas-nav li.nav-divider {
  height: 1px;
  background-color: #f0f0f0;
  margin: 10px 0;
}

.iecs-offcanvas-nav a {
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #141414;
  text-decoration: none;
  transition: color 0.2s;
  display: block;
}

.iecs-offcanvas-nav a:hover {
  color: #618B2F;
}

/* Typography & Contact */
.iecs-offcanvas-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.iecs-offcanvas-contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.iecs-offcanvas-contact a {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  color: #555555;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: color 0.2s;
  font-weight: 500;
}

.iecs-offcanvas-contact a:hover {
  color: #618B2F;
}

.iecs-offcanvas-contact i {
  font-size: 18px;
  color: #618B2F;
}

/* Social Icons */
.iecs-offcanvas-social ul {
  display: flex;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.iecs-offcanvas-social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f3f4f6;
  color: #141414;
  font-size: 18px;
  transition: all 0.2s ease;
  text-decoration: none;
}

.iecs-offcanvas-social a:hover {
  background: #618B2F;
  color: #fff;
  transform: translateY(-4px);
}
</style>