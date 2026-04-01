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
                  <li><a href="https://www.facebook.com/profile.php?id=61574164795795" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook"></i></a></li>
                  <li><a href="https://www.instagram.com/iecsi_edis/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a></li>
                  <li><a href="https://www.tiktok.com/@iecs.iedis" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-tiktok"></i></a></li>
                  <li><a href="https://mx.linkedin.com/company/iecs-iedis" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin"></i></a></li>
                </ul>
              </div>
              <div class="iecs-topbar-contacts">
                <ul>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3 14C11.9111 14 10.5389 13.6972 9.18333 13.0917C7.82778 12.4861 6.59444 11.6278 5.48333 10.5167C4.37222 9.40556 3.51389 8.17222 2.90833 6.81667C2.30278 5.46111 2 4.08889 2 2.7C2 2.5 2.06667 2.33333 2.2 2.2C2.33333 2.06667 2.5 2 2.7 2H5.4C5.55556 2 5.69444 2.05278 5.81667 2.15833C5.93889 2.26389 6.01111 2.38889 6.03333 2.53333L6.46667 4.86667C6.48889 5.04444 6.48333 5.19444 6.45 5.31667C6.41667 5.43889 6.35556 5.54444 6.26667 5.63333L4.65 7.26667C4.87222 7.67778 5.13611 8.075 5.44167 8.45833C5.74722 8.84167 6.08333 9.21111 6.45 9.56667C6.79444 9.91111 7.15556 10.2306 7.53333 10.525C7.91111 10.8194 8.31111 11.0889 8.73333 11.3333L10.3 9.76667C10.4 9.66667 10.5306 9.59167 10.6917 9.54167C10.8528 9.49167 11.0111 9.47778 11.1667 9.5L13.4667 9.96667C13.6222 10.0111 13.75 10.0917 13.85 10.2083C13.95 10.325 14 10.4556 14 10.6V13.3C14 13.5 13.9333 13.6667 13.8 13.8C13.6667 13.9333 13.5 14 13.3 14ZM4.01667 6L5.11667 4.9L4.83333 3.33333H3.35C3.40556 3.78889 3.48333 4.23889 3.58333 4.68333C3.68333 5.12778 3.82778 5.56667 4.01667 6ZM9.98333 11.9667C10.4167 12.1556 10.8583 12.3056 11.3083 12.4167C11.7583 12.5278 12.2111 12.6 12.6667 12.6333V11.1667L11.1 10.85L9.98333 11.9667Z" fill="currentColor"/></svg>
                    Metepec: <a href="tel:7221095789">722 109 5789</a>
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3 14C11.9111 14 10.5389 13.6972 9.18333 13.0917C7.82778 12.4861 6.59444 11.6278 5.48333 10.5167C4.37222 9.40556 3.51389 8.17222 2.90833 6.81667C2.30278 5.46111 2 4.08889 2 2.7C2 2.5 2.06667 2.33333 2.2 2.2C2.33333 2.06667 2.5 2 2.7 2H5.4C5.55556 2 5.69444 2.05278 5.81667 2.15833C5.93889 2.26389 6.01111 2.38889 6.03333 2.53333L6.46667 4.86667C6.48889 5.04444 6.48333 5.19444 6.45 5.31667C6.41667 5.43889 6.35556 5.54444 6.26667 5.63333L4.65 7.26667C4.87222 7.67778 5.13611 8.075 5.44167 8.45833C5.74722 8.84167 6.08333 9.21111 6.45 9.56667C6.79444 9.91111 7.15556 10.2306 7.53333 10.525C7.91111 10.8194 8.31111 11.0889 8.73333 11.3333L10.3 9.76667C10.4 9.66667 10.5306 9.59167 10.6917 9.54167C10.8528 9.49167 11.0111 9.47778 11.1667 9.5L13.4667 9.96667C13.6222 10.0111 13.75 10.0917 13.85 10.2083C13.95 10.325 14 10.4556 14 10.6V13.3C14 13.5 13.9333 13.6667 13.8 13.8C13.6667 13.9333 13.5 14 13.3 14ZM4.01667 6L5.11667 4.9L4.83333 3.33333H3.35C3.40556 3.78889 3.48333 4.23889 3.58333 4.68333C3.68333 5.12778 3.82778 5.56667 4.01667 6ZM9.98333 11.9667C10.4167 12.1556 10.8583 12.3056 11.3083 12.4167C11.7583 12.5278 12.2111 12.6 12.6667 12.6333V11.1667L11.1 10.85L9.98333 11.9667Z" fill="currentColor"/></svg>
                    Toluca / Calimaya / Ocoyoacac: <a href="tel:7225725729">722 572 5729</a>
                  </li>
                  <li>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.71249 6.71613L1 4.44814C4.42407 2.73796 8.14419 1.57183 12 1C11.3711 4.50526 10.0885 7.88719 8.2076 11L5.71249 6.71613ZM5.71249 6.71613L8.75778 3.94758" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
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
                
                <!-- Mobile/Tablet Toggle -->
                <button class="iecs-hamburger d-xl-none" @click.prevent="isOffcanvasOpen = true" aria-label="Abrir menú">
                  <span></span><span></span><span></span>
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 10px 0;
  color: var(--tp-common-black-6, #444);
}

.iecs-topbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.iecs-topbar-socials ul,
.iecs-topbar-contacts ul {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.iecs-topbar-socials a {
  color: inherit;
  transition: opacity 0.2s;
}

.iecs-topbar-socials a:hover {
  opacity: 0.7;
}

.iecs-topbar-contacts li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.iecs-topbar-contacts a {
  color: inherit;
}

.iecs-topbar-contacts svg {
  color: var(--tp-theme-1, #618B2F);
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

/* Hamburger scoped purely to this wrapper */
.iecs-hamburger {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 5px;
  cursor: pointer;
}

.iecs-hamburger span {
  display: block;
  width: 28px;
  height: 2px;
  background-color: var(--tp-common-black-5, #141414);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.iecs-hamburger:hover span {
  background-color: var(--tp-theme-1, #618B2F);
}
</style>