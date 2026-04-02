<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="search-modal">
        <div v-if="isOpen" class="search-root" role="dialog" aria-modal="true" aria-label="Búsqueda del sitio">
          <!-- Backdrop Blur Overlay -->
          <div class="search-backdrop" @click="closeSearch"></div>

          <!-- Main Command Menu Panel -->
          <div class="search-panel">
            
            <!-- Header / Input Area -->
            <div class="search-header">
              <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref="searchInput"
                v-model="query"
                type="text"
                class="search-input"
                placeholder="¿Qué estás buscando?"
                @keydown.esc="closeSearch"
              />
              <!-- Keyboard Shortcut Hint / Clear Button -->
              <div v-if="!query" class="shortcut-hint d-none d-md-flex">
                <kbd>⌘</kbd> <kbd>K</kbd>
              </div>
              <button v-else class="clear-btn" @click="query = ''" aria-label="Limpiar búsqueda">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <!-- Body / Results Area -->
            <div class="search-body" aria-live="polite">
              
              <!-- Empty State: Suggestions -->
              <div v-if="!query" class="search-empty">
                <p class="search-prompt">Explora nuestros niveles educativos, campus y servicios.</p>
                <div class="search-suggestions">
                  <button @click="query = 'Preescolar'" class="suggestion-pill">Preescolar</button>
                  <button @click="query = 'Ubicaciones'" class="suggestion-pill">Ubicaciones</button>
                  <button @click="query = 'Talleres'" class="suggestion-pill">Talleres Inteligentes</button>
                  <button @click="query = 'Padres'" class="suggestion-pill">Escuela para padres</button>
                </div>
              </div>

              <!-- No Results State -->
              <div v-else-if="filteredResults.length === 0" class="search-no-results">
                 <p>No encontramos resultados para "<strong>{{ query }}</strong>"</p>
                 <span>Intenta con términos más generales como "Guardería" o "Campus".</span>
              </div>

              <!-- Active Results -->
              <div v-else class="search-results">
                <NuxtLink
                  v-for="res in filteredResults"
                  :key="res.url"
                  :to="res.url"
                  class="search-result-card"
                  @click="closeSearch"
                >
                  <div class="result-info">
                    <span class="result-category">{{ res.category }}</span>
                    <h4 class="result-title">{{ res.title }}</h4>
                    <p class="result-desc">{{ res.desc }}</p>
                  </div>
                  <div class="result-action">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </NuxtLink>
              </div>

            </div>
          </div>

          <!-- External Close Button -->
          <button class="search-external-close" @click="closeSearch" aria-label="Cerrar">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span class="d-none d-md-block">ESC</span>
          </button>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from '#app'

const isOpen = useState('isSearchOpen', () => false)
const route = useRoute()
const query = ref('')
const searchInput = ref(null)

// Comprehensive index mapping the entire site
const sitePages = [
  { title: 'Guardería (Daycare)', url: '/daycare', desc: 'Desarrollo infantil desde los 43 días de nacidos, con modalidades IMSS, ISSSTE y Particular.', category: 'Niveles Educativos' },
  { title: 'Preescolar', url: '/preschool', desc: 'El lugar donde comienzan los grandes aprendizajes con educación bicultural.', category: 'Niveles Educativos' },
  { title: 'Primaria', url: '/elementary-school', desc: 'Consolidando habilidades, creatividad y pensamiento crítico.', category: 'Niveles Educativos' },
  { title: 'Secundaria', url: '/middle-school', desc: 'Desarrollando liderazgo y autonomía en una etapa clave.', category: 'Niveles Educativos' },
  { title: 'Acerca de los Institutos', url: '/acerca-de-institutos', desc: 'Conoce nuestra historia, misión, visión y valores institucionales.', category: 'Descubre' },
  { title: 'Nuestros Campus', url: '/campus', desc: 'Explora nuestros 6 planteles ubicados en Toluca, Metepec, Ocoyoacac y Calimaya.', category: 'Descubre' },
  { title: 'Ubicaciones y Contacto', url: '/ubicaciones', desc: 'Encuentra tu campus más cercano, mapas interactivos y números de contacto.', category: 'Descubre' },
  { title: 'Escuela para Padres', url: '/escuela-padres', desc: 'Un espacio de acompañamiento y aprendizaje para fortalecer a la familia.', category: 'Descubre' },
  { title: 'Convenios y Alianzas', url: '/convenios', desc: 'Certificaciones y convenios con Apple Education, UNOi, Cambridge y Habilmind.', category: 'Descubre' },
  { title: 'Voluntarios IECS-IEDIS', url: '/voluntarios', desc: 'Programa de solidaridad y acción social para ayudar a quienes más lo necesitan.', category: 'Descubre' },
  { title: 'Talleres Inteligentes', url: '/talleres-inteligentes', desc: 'Actividades artísticas, deportivas y culturales en horario vespertino.', category: 'Descubre' },
  { title: 'Vida Husky', url: '/vida-husky', desc: 'Descubre el espíritu de nuestra manada: resiliencia, liderazgo y exploración.', category: 'Descubre' },
  { title: 'Preguntas Frecuentes', url: '/preguntas-frecuentes', desc: 'Respuestas rápidas a las dudas más comunes sobre inscripciones y metodologías.', category: 'Soporte' }
]

const filteredResults = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return []
  return sitePages.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  )
})

const closeSearch = () => {
  isOpen.value = false
}

// Global hotkey integration for CMD+K / CTRL+K
const handleGlobalKeydown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    isOpen.value = true
  }
  if (e.key === 'Escape' && isOpen.value) {
    closeSearch()
  }
}

// Lifecycle and interaction management
watch(isOpen, async (val) => {
  if (import.meta.client) {
    if (val) {
      query.value = ''
      document.body.style.setProperty('overflow', 'hidden', 'important')
      await nextTick()
      searchInput.value?.focus()
    } else {
      document.body.style.removeProperty('overflow')
    }
  }
})

watch(() => route.path, () => {
  closeSearch()
})

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', handleGlobalKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', handleGlobalKeydown)
    document.body.style.removeProperty('overflow')
  }
})
</script>

<style scoped>
/* 
  =============================================================
  STATE-OF-THE-ART COMMAND MENU (SEARCH)
  Native, fast, blurred background, fully accessible.
  =============================================================
*/

.search-root {
  position: fixed;
  inset: 0;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 12vh;
}

.search-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(248, 250, 252, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.search-panel {
  position: relative;
  width: 100%;
  max-width: 760px;
  margin: 0 20px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(203, 213, 225, 0.4);
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  overflow: hidden;
}

/* Header & Input */
.search-header {
  display: flex;
  align-items: center;
  padding: 24px 30px;
  background: #ffffff;
  border-bottom: 1px solid #f1f5f9;
}

.search-icon {
  color: #007F92;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Fredoka', sans-serif;
  font-size: 1.8rem;
  color: #141414;
  margin-left: 20px;
  width: 100%;
}

.search-input::placeholder {
  color: #cbd5e1;
}

.clear-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  flex-shrink: 0;
  margin-left: 10px;
}

.clear-btn:hover {
  color: #e83f4b;
}

.shortcut-hint {
  display: flex;
  gap: 4px;
  margin-left: 15px;
  align-items: center;
}

.shortcut-hint kbd {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 4px 8px;
  font-family: monospace;
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  box-shadow: 0 2px 0 #e2e8f0;
}

/* Body & Results */
.search-body {
  background: #f8fafc;
  padding: 20px 30px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.search-body::-webkit-scrollbar {
  width: 8px;
}

.search-body::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.search-empty {
  text-align: center;
  padding: 30px 0;
}

.search-prompt {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 25px;
}

.search-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.suggestion-pill {
  background: #ffffff;
  color: #475569;
  border: 1px solid #e2e8f0;
  padding: 10px 20px;
  border-radius: 30px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.02);
}

.suggestion-pill:hover {
  background: #007F92;
  color: #ffffff;
  border-color: #007F92;
  transform: translateY(-2px);
}

.search-no-results {
  text-align: center;
  padding: 40px 0;
}

.search-no-results p {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  color: #1e293b;
  margin-bottom: 5px;
}

.search-no-results span {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #64748b;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-result-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px;
  background: #ffffff;
  border-radius: 16px;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.search-result-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
  transform: translateY(-2px);
}

.result-info {
  display: flex;
  flex-direction: column;
}

.result-category {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #618B2F;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.result-title {
  font-family: 'Fredoka', sans-serif;
  font-size: 1.4rem;
  color: #1e293b;
  margin: 0 0 6px 0;
  line-height: 1.2;
}

.result-desc {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
}

.result-action {
  color: #94a3b8;
  transition: color 0.2s, transform 0.2s;
  padding-left: 15px;
}

.search-result-card:hover .result-action {
  color: #007F92;
  transform: translateX(3px);
}

/* External Floating Close Button */
.search-external-close {
  position: absolute;
  top: 30px;
  right: 40px;
  background: transparent;
  border: none;
  color: #475569;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: color 0.2s ease;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
}

.search-external-close:hover {
  color: #e83f4b;
}

/* Modal Vue Transition */
.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 0.3s ease;
}

.search-modal-enter-active .search-panel,
.search-modal-leave-active .search-panel {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}

.search-modal-enter-from .search-panel,
.search-modal-leave-to .search-panel {
  transform: scale(0.97) translateY(-15px);
  opacity: 0;
}

/* Responsive Overrides */
@media (max-width: 768px) {
  .search-root {
    padding-top: 5vh;
  }
  .search-header {
    padding: 20px;
  }
  .search-input {
    font-size: 1.4rem;
  }
  .search-body {
    padding: 15px;
    max-height: calc(100vh - 120px);
  }
  .search-result-card {
    padding: 15px 20px;
  }
  .search-external-close {
    top: 15px;
    right: 15px;
    background: #ffffff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
}
</style>