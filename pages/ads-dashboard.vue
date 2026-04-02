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
          <p class="page-subtitle">Visibilidad operativa, métricas de tráfico y control de anuncios.</p>
        </div>
        
        <!-- Date Filters -->
        <div class="time-filters">
          <button @click="setFilter('today')" :class="{ active: currentFilter === 'today' }">Hoy</button>
          <button @click="setFilter('7d')" :class="{ active: currentFilter === '7d' }">Últimos 7 días</button>
          <button @click="setFilter('30d')" :class="{ active: currentFilter === '30d' }">Últimos 30 días</button>
          <button @click="setFilter('all')" :class="{ active: currentFilter === 'all' }">Histórico</button>
        </div>
      </header>

      <!-- Top Metrics -->
      <div class="metrics-grid">
        <div class="metric-card">
          <span class="metric-label">Visitas del Periodo</span>
          <div class="metric-value-row">
            <span class="metric-value">{{ stats.totalVisits || 0 }}</span>
            <span class="metric-trend" v-if="stats.todayVisits && currentFilter !== 'today'">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              +{{ stats.todayVisits }} hoy
            </span>
          </div>
        </div>
        <div class="metric-card">
          <span class="metric-label">Tráfico Elegible</span>
          <div class="metric-value-row">
            <span class="metric-value">{{ stats.totalEligible || 0 }}</span>
          </div>
        </div>
        <div class="metric-card highlight-card">
          <span class="metric-label">Anuncios Mostrados</span>
          <div class="metric-value-row">
            <span class="metric-value">{{ stats.totalRendered || 0 }}</span>
          </div>
        </div>
      </div>

      <div class="dashboard-layout">
        
        <!-- Left Column: Controls -->
        <div class="control-column">
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
              <h2 class="section-title">Audiencias Activas</h2>
              <p class="section-desc">Selecciona qué grupos de usuarios verán anuncios si el control maestro está activo.</p>
            </div>
            
            <div class="segments-list">
              <label v-for="seg in segmentDefs" :key="seg.key" class="segment-row" :class="{ 'is-active': config[seg.inputName] }">
                <div class="segment-info">
                  <span class="segment-name">{{ seg.label }}</span>
                  <div class="segment-mini-metrics">
                    <span title="Visitas">👁 {{ getSegmentStat(seg.key, 'visits') }}</span>
                    <span title="Mostrados">✦ {{ getSegmentStat(seg.key, 'rendered') }}</span>
                  </div>
                </div>
                <div class="custom-toggle small-toggle">
                  <input type="checkbox" v-model="config[seg.inputName]" class="hidden-input" />
                  <div class="toggle-track">
                    <div class="toggle-thumb"></div>
                  </div>
                </div>
              </label>
            </div>
          </section>

          <!-- Actions Footer -->
          <section class="action-footer">
            <div class="presets-group">
              <button class="btn-preset" @click="applyPreset('daycare-only')">Solo Guardería</button>
              <button class="btn-preset" @click="applyPreset('all-segments')">Activar todos</button>
            </div>
            
            <button class="btn-primary" @click="saveChanges" :disabled="isSaving">
              <svg v-if="isSaving" class="spinner" viewBox="0 0 24 24"><circle class="path" cx="12" cy="12" r="10" fill="none" stroke-width="4"></circle></svg>
              <span v-else>Guardar Cambios</span>
            </button>
          </section>
        </div>

        <!-- Right Column: Insights & Routes -->
        <div class="insights-column">
          <section class="dashboard-section h-100">
            <div class="routes-card">
              <div class="section-header mb-4">
                <h2 class="section-title">Rutas Más Visitadas</h2>
                <p class="section-desc">Actividad de tráfico detallada durante el periodo seleccionado.</p>
              </div>
              
              <div class="route-list">
                <div v-if="!stats.topRoutes || stats.topRoutes.length === 0" class="empty-routes">
                  No hay datos de rutas disponibles para este periodo.
                </div>
                <div v-else v-for="(r, idx) in stats.topRoutes" :key="idx" class="route-item">
                  <span class="route-path">{{ r.route }}</span>
                  <div class="route-badges">
                    <span class="r-badge r-visits">{{ r.visits }} hits</span>
                    <span class="r-badge r-rendered" v-if="r.rendered > 0">{{ r.rendered }} ads</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

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
const currentFilter = ref('30d')

const { data, refresh } = await useFetch(() => `/api/ads/dashboard?filter=${currentFilter.value}`, { headers })

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
  todayVisits: 0,
  bySegment: [],
  topRoutes: []
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

const setFilter = async (f) => {
  currentFilter.value = f
  await refresh()
}

const segmentDefs = [
  { key: 'daycare', inputName: 'ads_for_daycare', label: 'Guardería' },
  { key: 'organic', inputName: 'ads_for_organic', label: 'Tráfico Orgánico' },
  { key: 'premium', inputName: 'ads_for_premium', label: 'Familias Particulares' },
  { key: 'internal', inputName: 'ads_for_internal', label: 'Staff Interno' }
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
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');

.ads-dashboard-wrapper {
  min-height: 100vh;
  background-color: #f8fafc; /* Lighter, cleaner background */
  color: #141414;
  font-family: 'Montserrat', sans-serif;
  padding: 4rem 1.5rem;
  box-sizing: border-box;
}

.page-container {
  max-width: 72rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  color: #618B2F;
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
  color: #6b7280;
  font-size: 1.05rem;
  line-height: 1.5;
  margin: 0;
}

/* Time Filters */
.time-filters {
  display: flex;
  background: #ffffff;
  padding: 6px;
  border-radius: 12px;
  gap: 6px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  flex-wrap: wrap;
}

.time-filters button {
  background: transparent;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.time-filters button.active {
  background: #f1f5f9;
  color: #141414;
  box-shadow: 0 2px 5px rgba(0,0,0,0.03);
}

.time-filters button:hover:not(.active) {
  color: #141414;
}

/* Top Metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.metric-card {
  background: #ffffff;
  padding: 1.75rem 2rem;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.metric-card.highlight-card {
  background: #fdfefc;
  border: 1px solid #dcfce7;
}

.metric-label {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}

.metric-value-row {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.metric-value {
  font-family: 'Fredoka', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #141414;
  line-height: 1;
}

.metric-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #16a34a;
  background: #dcfce7;
  padding: 4px 10px;
  border-radius: 20px;
}
.metric-trend svg { width: 14px; height: 14px; }

/* Dashboard Layout */
.dashboard-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 1.5rem;
  align-items: start;
}

.dashboard-section {
  margin-bottom: 1.5rem;
}

.section-header {
  margin-bottom: 1.25rem;
}

.section-title {
  font-family: 'Fredoka', sans-serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: #141414;
  margin: 0 0 0.25rem;
}

.section-desc {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

/* Master Control Card */
.master-control-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 1.75rem;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.02);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.master-control-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
}

.master-control-card.is-active {
  background: #fdfefc;
  border-color: #dcfce7;
}

.master-control-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-width: 220px;
}

/* Audiences List */
.segments-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.segment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 1rem 1.25rem;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.01);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.segment-row:hover {
  border-color: #e2e8f0;
}

.segment-row.is-active {
  background: #fdfefc;
  border-color: #e0f2fe;
}

.segment-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.segment-name {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #141414;
}

.segment-mini-metrics {
  display: flex;
  gap: 12px;
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
}

/* Route Insights */
.routes-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 6px 20px rgba(0,0,0,0.02);
  height: 100%;
}

.route-list {
  display: flex;
  flex-direction: column;
}

.route-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.2s;
  border-radius: 8px;
}

.route-item:hover {
  background: #f8fafc;
}

.route-item:last-child {
  border-bottom: none;
}

.route-path {
  font-family: monospace;
  font-size: 0.95rem;
  color: #334155;
  font-weight: 500;
  word-break: break-all;
  padding-right: 15px;
}

.route-badges {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.r-badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
  white-space: nowrap;
}

.r-visits {
  background: #f1f5f9;
  color: #475569;
}

.r-rendered {
  background: #fef3c7;
  color: #d97706;
}

.empty-routes {
  padding: 3rem 1rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.95rem;
  font-style: italic;
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
  width: 3.5rem;
  height: 2rem;
  background: #e5e7eb;
  border-radius: 999px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle-thumb {
  width: 1.6rem;
  height: 1.6rem;
  background: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

input:checked + .toggle-track {
  background: #618B2F;
}

input:checked + .toggle-track .toggle-thumb {
  transform: translateX(1.5rem);
}

.small-toggle .toggle-track {
  width: 2.8rem;
  height: 1.6rem;
}

.small-toggle .toggle-thumb {
  width: 1.2rem;
  height: 1.2rem;
}

.small-toggle input:checked + .toggle-track .toggle-thumb {
  transform: translateX(1.2rem);
}

/* Actions Footer */
.action-footer {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.02);
  gap: 1rem;
}

.presets-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
}

.btn-preset {
  flex: 1;
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
  padding: 0.6rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}

.btn-preset:hover {
  background: #ffffff;
  border-color: #cbd5e1;
  color: #141414;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

.btn-primary {
  background: #618B2F;
  color: #ffffff;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(97, 139, 47, 0.25);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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
  .dashboard-layout { grid-template-columns: 1fr; }
  .page-header { flex-direction: column; align-items: stretch; gap: 1.5rem; }
  .header-titles { max-width: 100%; }
}

@media (max-width: 575px) {
  .ads-dashboard-wrapper { padding: 2rem 1rem; }
  .master-control-card { flex-direction: column; align-items: flex-start; gap: 1.5rem; padding: 1.5rem; }
  .metric-card { padding: 1.25rem 1.5rem; }
  .toast-notification { right: 1rem; left: 1rem; bottom: 1rem; justify-content: center; }
}
</style>