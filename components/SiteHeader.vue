<template>
  <header>
    <!-- Original theme IDs/classes kept only on the absolute outer wrapper for native sticky JS compatibility -->
    <div id="header-sticky" class="tp-header-area pre-header tp-header-blur header-transparent sticky-white-bg">
      
      <!-- Fully isolated and rebuilt component structure -->
      <div class="iecs-header-wrapper">
        
        <!-- Top Contact Bar (Desktop Only) -->
        <div class="iecs-topbar d-none d-lg-block">
          <div class="iecs-container">
            <div class="iecs-topbar-inner">
              <div class="iecs-topbar-socials">
                <ul>
                  <li><a href="https://www.facebook.com/profile.php?id=61574164795795" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a></li>
                  <li><a href="https://www.instagram.com/iecsi_edis/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a></li>
                  <li><a href="https://www.tiktok.com/@iecs.iedis" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a></li>
                  <li><a href="https://mx.linkedin.com/company/iecs-iedis" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a></li>
                </ul>
              </div>
              <div class="iecs-topbar-contacts">
                <ul>
                  <li>
                    <i class="fa-brands fa-whatsapp"></i>
                    <span>Metepec: <a href="https://wa.me/message/KBRAQHE4ITIRD1" target="_blank" rel="noopener">722 109 5789</a></span>
                  </li>
                  <li>
                    <i class="fa-brands fa-whatsapp"></i>
                    <span>Toluca / Calimaya / Ocoyoacac: <a href="https://wa.me/message/PI6TZB36CIWYD1" target="_blank" rel="noopener">722 572 5729</a></span>
                  </li>
                  <li>
                    <i class="fa-light fa-paper-plane"></i>
                    <a href="mailto:mercadotecnia@casitaiedis.edu.mx">mercadotecnia@casitaiedis.edu.mx</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Navigation Bar -->
        <div class="iecs-mainbar">
          <div class="iecs-container">
            <div ref="mainbarInnerRef" class="iecs-mainbar-inner">
              
              <!-- Zone 1: Strict Logo Boundary -->
              <div ref="logoZoneRef" class="iecs-logo-zone">
                <NuxtLink to="/" class="iecs-logo-link">
                  <img src="/assets/img/IECS-IEDIS IMAGES/IMAGOTIPOS-HORIZONTAL-IECS-IEDIS-GRADIENT.webp" alt="Imagotipo IECS-IEDIS">
                </NuxtLink>
              </div>

              <!-- Zone 2: Adaptive primary navigation -->
              <nav
                class="iecs-nav-zone"
                :class="`is-${navDensity}`"
                aria-label="Navegación principal"
              >
                <ul ref="navListRef" class="iecs-nav-list">
                  <li
                    v-for="item in visibleNavItems"
                    :key="item.id"
                    class="iecs-nav-item"
                    :class="{ 'has-dropdown': item.children?.length }"
                  >
                    <button v-if="item.children?.length" type="button" class="iecs-nav-link iecs-nav-trigger">
                      <span>{{ item.label }}</span>
                      <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.7 4.93333L0.2 1.6C-0.294427 0.940764 0.175955 0 1 0H6C6.82405 0 7.29443 0.940764 6.8 1.6L4.3 4.93333C3.9 5.46667 3.1 5.46667 2.7 4.93333Z" fill="currentColor"/></svg>
                    </button>
                    <NuxtLink v-else :to="item.to" class="iecs-nav-link">{{ item.label }}</NuxtLink>

                    <ul v-if="item.children?.length" class="iecs-submenu">
                      <li v-for="child in item.children" :key="child.to">
                        <NuxtLink :to="child.to" :style="child.color ? { color: child.color } : undefined">{{ child.label }}</NuxtLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>

              <!-- Zone 3: Strict Utility Boundary -->
              <div ref="utilsZoneRef" class="iecs-utils-zone">
                <button class="iecs-icon-btn search-btn" @click.prevent="isSearchOpen = true" aria-label="Buscar">
                  <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.76923 1.23077C3.71042 1.23077 1.23077 3.71042 1.23077 6.76923C1.23077 9.82804 3.71042 12.3077 6.76923 12.3077C8.29881 12.3077 9.68258 11.6885 10.6855 10.6855C11.6885 9.68258 12.3077 8.29881 12.3077 6.76923C12.3077 3.71042 9.82804 1.23077 6.76923 1.23077ZM0 6.76923C0 3.03069 3.03069 0 6.76923 0C10.5078 0 13.5385 3.03069 13.5385 6.76923C13.5385 8.41668 12.9493 9.92743 11.9712 11.1009L15.8198 14.9495C16.0601 15.1898 16.0601 15.5794 15.8198 15.8198C15.5794 16.0601 15.1898 16.0601 14.9495 15.8198L11.1009 11.9712C9.92743 12.9493 8.41668 13.5385 6.76923 13.5385C3.03069 13.5385 0 10.5078 0 6.76923Z" fill="currentColor"/></svg>
                </button>
                
                <NuxtLink to="/ubicaciones" class="iecs-info-cta d-none d-sm-inline-flex align-items-center tp-btn-md tp-bg-theme-1 tp-left-right p-relative hover-text-white text-uppercase tp-text-grey-5 lh-1 fs-14 fw-800 tp-ff-dm">
                  <span class="td-text d-inline-block mr-5">Solicitar + info</span>
                  <span class="tp-arrow-angle">
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="#F3F1F2" stroke-width="1.5" stroke-linecap="round"/><path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="#F3F1F2" stroke-width="1.5" stroke-linecap="round"/></svg>
                  </span>
                </NuxtLink>
                
                <a href="https://admin.casitaiedis.edu.mx/login.php" class="iecs-husky-pass d-none d-lg-inline-flex align-items-center" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/img/IECS-IEDIS IMAGES/ID-HUSKY-PASS-HORIZONTAL.webp" alt="Husky Pass">
                </a>
                
                <!-- Universal Desktop/Mobile Hamburger Toggle -->
                <button class="iecs-hamburger" @click.prevent="isOffcanvasOpen = !isOffcanvasOpen" :aria-expanded="isOffcanvasOpen ? 'true' : 'false'" aria-label="Alternar menú">
                  <div class="iecs-hamburger-box" :class="{ 'is-active': isOffcanvasOpen }">
                    <span></span><span></span><span></span>
                  </div>
                </button>
              </div>

            </div>
          </div>
        </div>

        <div class="colores-identidad" style="height: 0.7em; z-index: 2; width: 100%;"></div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const isOffcanvasOpen = useState('isOffcanvasOpen', () => false)
const isSearchOpen = useState('isSearchOpen', () => false)
const navItems = useSiteNavigation()

const mainbarInnerRef = ref(null)
const logoZoneRef = ref(null)
const utilsZoneRef = ref(null)
const navListRef = ref(null)

const densityForCount = (count) => {
  if (count >= 8) return 'tight'
  if (count >= 6) return 'compact'
  return 'comfortable'
}

const visibleNavCount = ref(navItems.length)
const visibleNavItems = computed(() => navItems.slice(0, visibleNavCount.value))
const navDensity = ref(densityForCount(navItems.length))
let resizeObserver = null
let measureFrame = 0

const measureNavigation = async () => {
  if (!import.meta.client) return

  const inner = mainbarInnerRef.value
  const logo = logoZoneRef.value
  const utils = utilsZoneRef.value
  const list = navListRef.value

  if (!inner || !logo || !utils || !list) return

  if (window.innerWidth < 1200) {
    visibleNavCount.value = navItems.length
    navDensity.value = densityForCount(navItems.length)
    return
  }

  const densityOrder = ['comfortable', 'compact', 'tight']
  const availableWidth = Math.max(0, inner.clientWidth - logo.offsetWidth - utils.offsetWidth - 40)

  for (let count = navItems.length; count >= 1; count -= 1) {
    visibleNavCount.value = count
    await nextTick()

    const minimumDensityIndex = densityOrder.indexOf(densityForCount(count))

    for (let index = minimumDensityIndex; index < densityOrder.length; index += 1) {
      navDensity.value = densityOrder[index]
      await nextTick()

      if (list.scrollWidth <= availableWidth) return
    }
  }

  visibleNavCount.value = 1
  navDensity.value = 'tight'
}

const scheduleNavigationMeasure = () => {
  if (!import.meta.client) return
  window.cancelAnimationFrame(measureFrame)
  measureFrame = window.requestAnimationFrame(() => {
    void measureNavigation()
  })
}

onMounted(() => {
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(scheduleNavigationMeasure)
    if (mainbarInnerRef.value) resizeObserver.observe(mainbarInnerRef.value)
    if (logoZoneRef.value) resizeObserver.observe(logoZoneRef.value)
    if (utilsZoneRef.value) resizeObserver.observe(utilsZoneRef.value)
  }

  window.addEventListener('resize', scheduleNavigationMeasure, { passive: true })
  scheduleNavigationMeasure()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', scheduleNavigationMeasure)
  window.cancelAnimationFrame(measureFrame)
})
</script>

<style scoped>
/* 
  =============================================================
  ISOLATED HEADER ARCHITECTURE
  Strict flexbox ownership rules to completely eliminate overlap.
  =============================================================
*/

#header-sticky {
  z-index: 999 !important;
}

.iecs-header-wrapper {
  width: 100%;
  position: relative;
  z-index: 999;
}

.iecs-container {
  max-width: 1824px;
  margin: 0 auto;
  padding: 0 15px;
  width: 100%;
}

/* TOP BAR (Desktop Only) */
.iecs-topbar {
  background: linear-gradient(90deg, #618B2F 0%, #007F92 100%);
  padding: 10px 0;
  color: #ffffff;
}

.iecs-topbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.iecs-topbar-socials ul,
.iecs-topbar-contacts ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.iecs-topbar-socials ul {
  gap: 20px;
}

.iecs-topbar-socials a {
  color: #ffffff;
  font-size: 17px;
  display: flex;
  align-items: center;
  transition: opacity 0.2s ease;
}

.iecs-topbar-socials a:hover {
  opacity: 0.8;
}

.iecs-topbar-contacts ul {
  gap: 32px;
}

.iecs-topbar-contacts li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.iecs-topbar-contacts i {
  font-size: 15px;
  display: flex;
  align-items: center;
}

.iecs-topbar-contacts a {
  color: #ffffff;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.iecs-topbar-contacts a:hover {
  opacity: 0.8;
}

/* MAIN BAR */
.iecs-mainbar {
  padding: 15px 0;
}

.iecs-mainbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

/* ZONE 1: LOGO (Absolute boundary) */
.iecs-logo-zone {
  flex: 0 0 auto;
  width: 215px;
  display: flex;
  align-items: center;
}

.iecs-logo-link {
  display: block;
  width: 100%;
}

.iecs-logo-link img {
  width: 100%;
  height: auto;
  display: block;
}

/* ZONE 2: NAVIGATION (Flexible but protected center) */
.iecs-nav-zone {
  flex: 1 1 auto;
  display: none;
  justify-content: center;
  min-width: 0;
  position: relative;
  z-index: 50;
  overflow: visible;
}

@media (min-width: 1200px) {
  .iecs-nav-zone {
    display: flex;
  }
}

.iecs-nav-list {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  max-width: 100%;
  gap: clamp(18px, 1.55vw, 30px);
  transition: gap 0.2s ease;
}

.iecs-nav-zone.is-compact .iecs-nav-list {
  gap: clamp(11px, 1vw, 18px);
}

.iecs-nav-zone.is-tight .iecs-nav-list {
  gap: clamp(7px, 0.65vw, 12px);
}

.iecs-nav-item {
  position: relative;
  display: inline-flex;
}

.iecs-nav-link {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--tp-common-black-5, #141414);
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  padding: 10px 0;
  transition: color 0.3s ease, font-size 0.2s ease, letter-spacing 0.2s ease;
}

.iecs-nav-trigger {
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  margin: 0;
}

.iecs-nav-zone.is-compact .iecs-nav-link {
  font-size: 14px;
  gap: 5px;
  letter-spacing: -0.02em;
}

.iecs-nav-zone.is-tight .iecs-nav-link {
  font-size: 12.5px;
  gap: 4px;
  letter-spacing: -0.035em;
}

.iecs-nav-zone.is-tight .iecs-nav-link svg {
  width: 6px;
  height: 5px;
}

.iecs-nav-link:hover {
  color: var(--tp-theme-1, #618B2F);
}

/* Dropdown isolation */
.iecs-submenu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(15px);
  background: #ffffff;
  min-width: 240px;
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  list-style: none;
  margin: 0;
  opacity: 0;
  visibility: hidden;
  text-align: left;
  transition: all 0.25s ease;
  z-index: 999;
}

.iecs-nav-item:hover .iecs-submenu,
.iecs-nav-item:focus-within .iecs-submenu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.iecs-submenu li {
  margin-bottom: 5px;
}

.iecs-submenu li:last-child {
  margin-bottom: 0;
}

.iecs-submenu a {
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: var(--tp-text-grey-7, #555);
  padding: 8px 0;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.iecs-submenu a:hover {
  color: var(--tp-theme-1, #618B2F);
  transform: translateX(5px);
}

/* ZONE 3: UTILITIES (Absolute boundary) */
.iecs-utils-zone {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(12px, 1.5vw, 24px); /* Perfected flow gap */
  position: relative;
  z-index: 10;
}

.iecs-icon-btn {
  background: none;
  border: none;
  padding: 8px; /* Increased click target */
  cursor: pointer;
  color: var(--tp-common-black-5, #141414);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, transform 0.2s;
  border-radius: 50%;
}

.iecs-icon-btn:hover {
  color: var(--tp-theme-1, #618B2F);
  transform: scale(1.05);
}


.iecs-info-cta {
  padding: 12px 24px;
  border-radius: 30px;
  white-space: nowrap;
}

.iecs-husky-pass img {
  width: 120px;
  height: 35px;
  object-fit: contain;
}

@media (max-width: 1499px) and (min-width: 1200px) {
  .iecs-mainbar-inner {
    gap: 14px;
  }

  .iecs-logo-zone {
    width: 190px;
  }

  .iecs-utils-zone {
    gap: 10px;
  }

  .iecs-info-cta {
    padding-inline: 18px;
  }

  .iecs-husky-pass img {
    width: 106px;
  }
}

@media (max-width: 767px) {
  .iecs-mainbar {
    padding: 10px 0;
  }

  .iecs-mainbar-inner {
    gap: 10px;
  }

  .iecs-logo-zone {
    width: clamp(145px, 43vw, 190px);
  }

  .iecs-utils-zone {
    gap: 6px;
  }

  .iecs-icon-btn {
    padding: 6px;
  }

}

/* 
  Styled Hamburger Toggle Matching Design Spec 
  - Visible on all viewports (Mobile & Desktop)
  - Circular light grey background
  - 3 asymmetric right-aligned lines
*/
.iecs-hamburger {
  background-color: #f3f4f6;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
  padding: 0;
}

.iecs-hamburger:hover {
  background-color: #e5e7eb;
}

.iecs-hamburger-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 5px;
  width: 24px;
}

.iecs-hamburger-box span {
  display: block;
  height: 3px;
  background-color: #222222;
  border-radius: 3px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center right;
}

.iecs-hamburger-box span:nth-child(1) { width: 14px; }
.iecs-hamburger-box span:nth-child(2) { width: 24px; }
.iecs-hamburger-box span:nth-child(3) { width: 14px; }

/* Active/Toggle state -> Transforms into a clean X */
.iecs-hamburger-box.is-active span:nth-child(1) {
  transform: translateY(8px) rotate(-45deg);
  width: 24px;
}
.iecs-hamburger-box.is-active span:nth-child(2) {
  opacity: 0;
}
.iecs-hamburger-box.is-active span:nth-child(3) {
  transform: translateY(-8px) rotate(45deg);
  width: 24px;
}


@media (max-width: 767px) {
  .iecs-hamburger {
    width: 44px;
    height: 44px;
  }
}
</style>