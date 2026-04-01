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
                    <i class="fa-light fa-phone"></i>
                    <span>Metepec: <a href="tel:7221095789">722 109 5789</a></span>
                  </li>
                  <li>
                    <i class="fa-light fa-phone"></i>
                    <span>Toluca / Calimaya / Ocoyoacac: <a href="tel:7225725729">722 572 5729</a></span>
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
            <div class="iecs-mainbar-inner">
              
              <!-- Zone 1: Strict Logo Boundary -->
              <div class="iecs-logo-zone">
                <NuxtLink to="/" class="iecs-logo-link">
                  <img src="/assets/img/IECS-IEDIS IMAGES/IMAGOTIPOS-HORIZONTAL-IECS-IEDIS-GRADIENT.webp" alt="Imagotipo IECS-IEDIS">
                </NuxtLink>
              </div>

              <!-- Zone 2: Strict Center Navigation Boundary (Desktop Only) -->
              <nav class="iecs-nav-zone d-none d-xl-flex">
                <ul class="iecs-nav-list">
                  <li class="iecs-nav-item has-dropdown">
                    <a href="#" class="iecs-nav-link">Descubre 
                      <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.7 4.93333L0.2 1.6C-0.294427 0.940764 0.175955 0 1 0H6C6.82405 0 7.29443 0.940764 6.8 1.6L4.3 4.93333C3.9 5.46667 3.1 5.46667 2.7 4.93333Z" fill="currentColor"/></svg>
                    </a>
                    <ul class="iecs-submenu">
                      <li><NuxtLink to="/acerca-de-institutos">Acerca de los institutos</NuxtLink></li>
                      <li><NuxtLink to="/campus">Nuestros campus</NuxtLink></li>
                      <li><NuxtLink to="/escuela-padres">Escuela para padres</NuxtLink></li>
                      <li><NuxtLink to="/convenios">Convenios IECS-IEDIS</NuxtLink></li>
                      <li><NuxtLink to="/voluntarios">Voluntarios IECS-IEDIS</NuxtLink></li>
                    </ul>
                  </li>
                  <li class="iecs-nav-item has-dropdown">
                    <a href="#" class="iecs-nav-link">Niveles 
                      <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.7 4.93333L0.2 1.6C-0.294427 0.940764 0.175955 0 1 0H6C6.82405 0 7.29443 0.940764 6.8 1.6L4.3 4.93333C3.9 5.46667 3.1 5.46667 2.7 4.93333Z" fill="currentColor"/></svg>
                    </a>
                    <ul class="iecs-submenu">
                      <li><NuxtLink to="/daycare" style="color: #8EC152;">Desarrollo Infantil</NuxtLink></li>
                      <li><NuxtLink to="/preschool" style="color: #E83F4B;">Preescolar</NuxtLink></li>
                      <li><NuxtLink to="/elementary-school" style="color: #FCBF2C;">Primaria</NuxtLink></li>
                      <li><NuxtLink to="/middle-school" style="color: #66A8D8;">Secundaria</NuxtLink></li>
                    </ul>
                  </li>
                  <li class="iecs-nav-item">
                    <NuxtLink to="/talleres-inteligentes" class="iecs-nav-link">Talleres Inteligentes</NuxtLink>
                  </li>
                  <li class="iecs-nav-item">
                    <NuxtLink to="/vida-husky" class="iecs-nav-link">Vida Husky</NuxtLink>
                  </li>
                </ul>
              </nav>

              <!-- Zone 3: Strict Utility Boundary -->
              <div class="iecs-utils-zone">
                <button class="iecs-icon-btn search-btn" @click.prevent="isSearchOpen = true" aria-label="Buscar">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.76923 1.23077C3.71042 1.23077 1.23077 3.71042 1.23077 6.76923C1.23077 9.82804 3.71042 12.3077 6.76923 12.3077C8.29881 12.3077 9.68258 11.6885 10.6855 10.6855C11.6885 9.68258 12.3077 8.29881 12.3077 6.76923C12.3077 3.71042 9.82804 1.23077 6.76923 1.23077ZM0 6.76923C0 3.03069 3.03069 0 6.76923 0C10.5078 0 13.5385 3.03069 13.5385 6.76923C13.5385 8.41668 12.9493 9.92743 11.9712 11.1009L15.8198 14.9495C16.0601 15.1898 16.0601 15.5794 15.8198 15.8198C15.5794 16.0601 15.1898 16.0601 14.9495 15.8198L11.1009 11.9712C9.92743 12.9493 8.41668 13.5385 6.76923 13.5385C3.03069 13.5385 0 10.5078 0 6.76923Z" fill="currentColor"/></svg>
                </button>
                
                <NuxtLink to="/ubicaciones" class="d-none d-sm-inline-block tp-btn-md tp-bg-theme-1 tp-left-right p-relative hover-text-white text-uppercase tp-text-grey-5 lh-1 fs-15 fw-800 tp-ff-dm" style="padding: 14px 25px;">
                  <span class="td-text d-inline-block mr-5">Solicitar + info</span>
                  <span class="tp-arrow-angle">
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="#F3F1F2" stroke-width="1.5" stroke-linecap="round"/><path d="M1 11L12 1M12 1H3.44444M12 1V8.77778" stroke="#F3F1F2" stroke-width="1.5" stroke-linecap="round"/></svg>
                  </span>
                </NuxtLink>
                
                <a href="https://admin.casitaiedis.edu.mx/login.php" class="d-none d-lg-inline-flex" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/img/IECS-IEDIS IMAGES/ID-HUSKY-PASS-HORIZONTAL.webp" alt="Husky Pass" style="width: 120px; height: 35px; object-fit: contain;">
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
const isOffcanvasOpen = useState('isOffcanvasOpen', () => false)
const isSearchOpen = useState('isSearchOpen', () => false)
</script>

<style scoped>
/* 
  =============================================================
  ISOLATED HEADER ARCHITECTURE
  Strict flexbox ownership rules to completely eliminate overlap.
  =============================================================
*/

.iecs-header-wrapper {
  width: 100%;
  position: relative;
  z-index: 100;
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
  display: flex;
  justify-content: center;
  min-width: 0; /* Prevents flex flex-basis blowout */
}

.iecs-nav-list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(15px, 2vw, 40px);
  list-style: none;
  margin: 0;
  padding: 0;
  white-space: nowrap; /* Ensures Vida Husky and others never wrap/break */
}

.iecs-nav-item {
  position: relative;
  display: inline-flex;
}

.iecs-nav-link {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: var(--tp-common-black-5, #141414);
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  padding: 10px 0;
  transition: color 0.3s ease;
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

.iecs-nav-item:hover .iecs-submenu {
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
  gap: clamp(10px, 1.5vw, 20px);
}

.iecs-icon-btn {
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  color: var(--tp-common-black-5, #141414);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.iecs-icon-btn:hover {
  opacity: 0.6;
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
</style>