<template>
  <div class="ads-dashboard-wrapper">
    <div class="page-container">
      
      <!-- Minimalist Header -->
      <header class="page-header">
        <div class="header-titles">
          <span class="badge-pill">
            <span class="badge-dot pulse-animation"></span>
            Panel de control
          </span>
          <h1 class="page-title">Monetización</h1>
          <p class="page-subtitle">Gestiona la visibilidad de anuncios de forma global y por audiencias.</p>
        </div>
        
        <!-- Refined Stats Strip -->
        <div class="stats-strip">
          <div class="stat-item">
            <span class="stat-value">{{ stats.totalVisits }}</span>
            <span class="stat-label">Visitas totales</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.totalEligible }}</span>
            <span class="stat-label">Elegibles</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.totalRendered }}</span>
            <span class="stat-label">Anuncios mostrados</span>
          </div>
        </div>
      </header>

      <div class="sections-layout">
        
        <!-- Master Control (Kill Switch) -->
        <section class="dashboard-section">
          <label class="master-control-card" :class="{ 'is-active': config.global_ads_enabled }">
            <div class="master-control-info">
              <h2 class="section-title">Control Maestro</h2>
              <p class="section-desc">Activa o detiene la monetización en todo el sitio web al instante.</p>
            </div>
            <div class="custom-toggle">
              <input type="checkbox" v-model="config.global_ads_enabled" class="hidden-input" />
              <div class="toggle-track">
                <div class="toggle-thumb"></div>
              </div>
            </div>
          </label>
        </section>

        <!-- Audiences (Segments) -->
        <section class="dashboard-section">
          <div class="section-header">
            <h2 class="section-title">Audiencias</h2>
            <p class="section-desc">Selecciona qué grupos de usuarios podrán ver anuncios cuando el control maestro esté activo.</p>
          </div>
          
          <div class="segments-grid">
            <label v-for="seg in segmentDefs" :key="seg.key" class="segment-card" :class="{ 'is-active': config[seg.inputName] }">
              <div class="segment-header">
                <div class="segment-title-group">
                  <span class="segment-name">{{ seg.label }}</span>
                  <span class="segment-desc">{{ seg.description }}</span>
                </div>
                <div class="custom-toggle small-toggle">
                  <input type="checkbox" v-model="config[seg.inputName]" class="hidden-input" />
                  <div class="toggle-track">
                    <div class="toggle-thumb"></div>
                  </div>
                </div>
              </div>
              
              <div class="segment-metrics">
                <div class="s-metric"><span>Visitas</span><strong>{{ getSegmentStat(seg.key, 'visits') }}</strong></div>
                <div class="s-metric"><span>Elegibles</span><strong>{{ getSegmentStat(seg.key, 'eligible') }}</strong></div>
                <div class="s-metric"><span>Mostrados</span><strong>{{ getSegmentStat(seg.key, 'rendered') }}</strong></div>
              </div>
            </label>
          </div>
        </section>

        <!-- Actions Footer -->
        <section class="action-footer">
          <div class="presets-group">
            <span class="presets-label">Acciones rápidas:</span>
            <button class="btn-preset" @click="applyPreset('daycare-only')">Solo Guardería</button>
            <button class="btn-preset" @click="applyPreset('daycare-organic')">Guardería + Orgánico</button>
            <button class="btn-preset" @click="applyPreset('all-segments')">Activar todos</button>
          </div>
          
          <button class="btn-primary" @click="saveChanges" :disabled="isSaving">
            <svg v-if="isSaving" class="spinner" viewBox="0 0 24 24"><circle class="path" cx="12" cy="12" r="10" fill="none" stroke-width="4"></circle></svg>
            <span v-else>Guardar Cambios</span>
          </button>
        </section>

      </div>
    </div>
    
    <div :class="['toast-notification', { 'show': showToast }]">
       <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
       <span>Configuración actualizada correctamente</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const headers = useRequestHeaders(['authorization'])

const { data, refresh } = await useFetch('/api/ads/dashboard', { headers })

const config = ref({
  global_ads_enabled: false,
  ads_for_daycare: false,
  ads_for_organic: false,
  ads_for_premium: false,
  ads_for_internal: false
})

const stats = ref({
  totalVisits: 0,
  totalEligible: 0,
  totalRendered: 0,
  bySegment: []
})

watchEffect(() => {
  if (data.value?.config) {
    config.value = {
      global_ads_enabled: !!data.value.config.global_ads_enabled,
      ads_for_daycare: !!data.value.config.ads_for_daycare,
      ads_for_organic: !!data.value.config.ads_for_organic,
      ads_for_premium: !!data.value.config.ads_for_premium,
      ads_for_internal: !!data.value.config.ads_for_internal
    }
  }
  if (data.value?.stats) {
    stats.value = data.value.stats
  }
})

const segmentDefs = [
  { key: 'daycare', inputName: 'ads_for_daycare', label: 'Guardería', description: 'Padres y madres con cuentas de nivel inicial.' },
  { key: 'organic', inputName: 'ads_for_organic', label: 'Tráfico Orgánico', description: 'Visitantes públicos y prospectos sin cuenta activa.' },
  { key: 'premium', inputName: 'ads_for_premium', label: 'Familias Particulares', description: 'Usuarios matriculados en niveles superiores.' },
  { key: 'internal', inputName: 'ads_for_internal', label: 'Staff Interno', description: 'Personal administrativo (Login Google).' }
]

const getSegmentStat = (key, metric) => {
  const row = stats.value.bySegment?.find(s => s.user_segment === key)
  return row ? row[metric] : 0
}

const applyPreset = (preset) => {
  config.value.global_ads_enabled = true
  config.value.ads_for_daycare = true
  
  if (preset === 'daycare-only') {
    config.value.ads_for_organic = false
    config.value.ads_for_premium = false
    config.value.ads_for_internal = false
  } else if (preset === 'daycare-organic') {
    config.value.ads_for_organic = true
    config.value.ads_for_premium = false
    config.value.ads_for_internal = false
  } else if (preset === 'all-segments') {
    config.value.ads_for_organic = true
    config.value.ads_for_premium = true
    config.value.ads_for_internal = true
  }
}

const isSaving = ref(false)
const showToast = ref(false)

const saveChanges = async () => {
  isSaving.value = true
  try {
    await $fetch('/api/ads/dashboard', {
      method: 'POST',
      body: config.value,
      headers: import.meta.client ? {} : useRequestHeaders(['authorization'])
    })
    showToast.value = true
    setTimeout(() => { showToast.value = false }, 3500)
    await refresh()
  } catch (e) {
    console.error('Error guardando config:', e)
    alert('No se pudo guardar la configuración. Revisa consola.')
  } finally {
    isSaving.value = false
  }
}

useHead({
  title: 'Monetización | IECS-IEDIS',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})
</script>

<style scoped>
/* 
  =============================================================
  ELEVATED BRAND UI
  Soft, light-only, minimal cognitive load. Matches main website
  typography (Fredoka + Montserrat) and color palette.
  =============================================================
*/

@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');

.ads-dashboard-wrapper {
  min-height: 100vh;
  background-color: #f4fbfc; /* Soft brand cyan tint matching hero fallback */
  color: #141414;
  font-family: 'Montserrat', sans-serif;
  padding: 4rem 1.5rem;
  box-sizing: border-box;
}

.page-container {
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* Header & Typography */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  flex-wrap: wrap;
}

.header-titles {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 32rem;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #618B2F; /* Brand Green */
  margin-bottom: 1.25rem;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #618B2F;
}

.pulse-animation {
  box-shadow: 0 0 0 0 rgba(97, 139, 47, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(97, 139, 47, 0.4); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(97, 139, 47, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(97, 139, 47, 0); }
}

.page-title {
  font-family: 'Fredoka', sans-serif;
  font-size: 2.75rem;
  font-weight: 700;
  color: #141414;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.page-subtitle {
  color: #555555;
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 0;
}

.section-title {
  font-family: 'Fredoka', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #141414;
  margin: 0 0 0.25rem;
}

.section-desc {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
}

/* Stats Strip */
.stats-strip {
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 1.25rem 2rem;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
  gap: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stat-value {
  font-family: 'Fredoka', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #141414;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}

.stat-divider {
  width: 1px;
  height: 2.5rem;
  background-color: #f0f0f0;
}

/* Layout */
.sections-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section-header {
  margin-bottom: 1.25rem;
}

/* Master Control Card */
.master-control-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 2rem 2.5rem;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.master-control-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.06);
}

.master-control-card.is-active {
  background: #fdfefc;
  border-color: #dcfce7;
}

.master-control-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* Segments Grid */
.segments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.segment-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 1.75rem;
  border-radius: 24px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.03);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.segment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.05);
}

.segment-card.is-active {
  background: #fdfefc;
  border-color: #e0f2fe; /* Soft blue/cyan hint from the brand */
}

.segment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.segment-title-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.segment-name {
  font-family: 'Fredoka', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #141414;
}

.segment-desc {
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.4;
}

.segment-metrics {
  display: flex;
  justify-content: space-between;
  padding-top: 1.25rem;
  border-top: 1px solid #f3f4f6;
}

.s-metric {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.s-metric span {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
  font-weight: 600;
}

.s-metric strong {
  font-size: 1.1rem;
  font-weight: 700;
  color: #141414;
}

/* Toggles */
.hidden-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.custom-toggle {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.toggle-track {
  width: 4rem;
  height: 2.25rem;
  background: #e5e7eb;
  border-radius: 999px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle-thumb {
  width: 1.85rem;
  height: 1.85rem;
  background: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

input:checked + .toggle-track {
  background: #618B2F; /* Brand Green */
}

input:checked + .toggle-track .toggle-thumb {
  transform: translateX(1.75rem);
}

.small-toggle .toggle-track {
  width: 3rem;
  height: 1.75rem;
}

.small-toggle .toggle-thumb {
  width: 1.35rem;
  height: 1.35rem;
}

.small-toggle input:checked + .toggle-track .toggle-thumb {
  transform: translateX(1.25rem);
}

/* Actions Footer */
.action-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 1.5rem 2.5rem;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
}

.presets-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.presets-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6b7280;
  margin-right: 0.5rem;
}

.btn-preset {
  background: #f9fafb;
  color: #4b5563;
  border: 1px solid #e5e7eb;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;
}

.btn-preset:hover {
  background: #ffffff;
  border-color: #cbd5e1;
  color: #141414;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

.btn-primary {
  background: #618B2F; /* Brand Green */
  color: #ffffff;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 999px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(97, 139, 47, 0.25);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
}

.btn-primary:hover:not(:disabled) {
  background: #507524;
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(97, 139, 47, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Spinner & Toast */
.spinner {
  animation: rotate 2s linear infinite;
  width: 22px;
  height: 22px;
}
.spinner .path {
  stroke: #ffffff;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate { 100% { transform: rotate(360deg); } }
@keyframes dash {
  0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
  100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
}

.toast-notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #141414;
  color: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 50;
  font-weight: 500;
}

.toast-notification.show {
  transform: translateY(0);
  opacity: 1;
}

.toast-icon {
  width: 20px;
  height: 20px;
  color: #618B2F;
}

/* Responsive */
@media (max-width: 991px) {
  .page-header { flex-direction: column; align-items: stretch; gap: 1.5rem; }
  .header-titles { max-width: 100%; }
  .stats-strip { justify-content: space-between; }
  .action-footer { flex-direction: column; align-items: stretch; }
  .presets-group { justify-content: center; }
}

@media (max-width: 575px) {
  .ads-dashboard-wrapper { padding: 2rem 1rem; }
  .master-control-card { flex-direction: column; align-items: flex-start; gap: 1.5rem; padding: 1.5rem; }
  .stats-strip { flex-direction: column; gap: 1rem; align-items: center; text-align: center; }
  .stat-divider { width: 100%; height: 1px; }
  .action-footer { padding: 1.5rem; }
  .toast-notification { right: 1rem; left: 1rem; bottom: 1rem; justify-content: center; }
}
</style>