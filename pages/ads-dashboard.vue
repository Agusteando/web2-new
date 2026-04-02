<template>
  <div class="ads-dashboard-wrapper">
    <div class="page-container">
      
      <header class="page-header">
        <div class="header-titles">
          <span class="badge-pill">
            <span class="badge-dot pulse-animation"></span>
            Panel de control
          </span>
          <h1 class="page-title">Monetización</h1>
          <p class="page-subtitle">Visibilidad operativa, métricas de tráfico y control de anuncios.</p>
        </div>
        
        <div class="time-filters">
          <button @click="setFilter('today')" :class="{ active: currentFilter === 'today' }">Hoy</button>
          <button @click="setFilter('7d')" :class="{ active: currentFilter === '7d' }">Últimos 7 días</button>
          <button @click="setFilter('30d')" :class="{ active: currentFilter === '30d' }">Últimos 30 días</button>
          <button @click="setFilter('all')" :class="{ active: currentFilter === 'all' }">Histórico</button>
        </div>
      </header>

      <!-- KPI Row -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Visitas del Periodo</span>
          <div class="kpi-value-row">
            <span class="kpi-value">{{ stats.totalVisits?.toLocaleString() || 0 }}</span>
            <span class="kpi-trend" v-if="stats.todayVisits && currentFilter !== 'today'" title="Visitas de hoy">
              +{{ stats.todayVisits.toLocaleString() }}
            </span>
          </div>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Tráfico Elegible</span>
          <div class="kpi-value-row">
            <span class="kpi-value">{{ stats.totalEligible?.toLocaleString() || 0 }}</span>
          </div>
        </div>
        <div class="kpi-card highlight-card">
          <span class="kpi-label">Anuncios Mostrados</span>
          <div class="kpi-value-row">
            <span class="kpi-value">{{ stats.totalRendered?.toLocaleString() || 0 }}</span>
          </div>
        </div>
      </div>

      <!-- Main Dense Layout -->
      <div class="main-grid">
        
        <!-- Left Pane: Controls & Segments -->
        <div class="control-pane">
          <div class="panel-card master-panel" :class="{ 'is-active': config.global_ads_enabled }">
            <div class="master-info">
              <h2 class="panel-title">Control Maestro</h2>
              <p class="panel-desc">Habilita la monetización en el sitio.</p>
            </div>
            <div class="custom-toggle">
              <input type="checkbox" v-model="config.global_ads_enabled" class="hidden-input" />
              <div class="toggle-track"><div class="toggle-thumb"></div></div>
            </div>
          </div>

          <div class="panel-card segments-panel">
            <h2 class="panel-title mb-10">Audiencias</h2>
            <div class="segment-table">
              <div class="segment-th">
                <span>Segmento</span>
                <span>Hits</span>
                <span>Ads</span>
                <span class="text-right">Activo</span>
              </div>
              <label v-for="seg in segmentDefs" :key="seg.key" class="segment-tr" :class="{ 'is-active': config[seg.inputName] }">
                <span class="s-name">{{ seg.label }}</span>
                <span class="s-num">{{ getSegmentStat(seg.key, 'visits') }}</span>
                <span class="s-num highlight">{{ getSegmentStat(seg.key, 'rendered') }}</span>
                <div class="s-action">
                  <div class="custom-toggle small-toggle">
                    <input type="checkbox" v-model="config[seg.inputName]" class="hidden-input" />
                    <div class="toggle-track"><div class="toggle-thumb"></div></div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div class="panel-card actions-panel">
            <div class="presets-row">
              <button class="btn-preset" @click="applyPreset('daycare-only')">Solo Guardería</button>
              <button class="btn-preset" @click="applyPreset('all-segments')">Activar Todos</button>
            </div>
            <button class="btn-primary mt-15" @click="saveChanges" :disabled="isSaving">
              <svg v-if="isSaving" class="spinner" viewBox="0 0 24 24"><circle class="path" cx="12" cy="12" r="10" fill="none" stroke-width="4"></circle></svg>
              <span v-else>Guardar Cambios</span>
            </button>
          </div>
        </div>

        <!-- Right Pane: Route Analytics -->
        <div class="analytics-pane">
          <div class="panel-card h-100">
            <div class="route-header">
              <h2 class="panel-title">Rutas Más Visitadas</h2>
              <p class="panel-desc">Actividad detallada de enrutamiento y exposición.</p>
            </div>
            
            <div class="route-list">
              <div v-if="!stats.topRoutes || stats.topRoutes.length === 0" class="empty-state">
                No hay datos de rutas registrados en este periodo.
              </div>
              <div v-else v-for="(r, idx) in stats.topRoutes" :key="idx" class="route-row">
                <div class="route-info">
                  <span class="route-path">{{ r.route || '/' }}</span>
                  <div class="route-metrics">
                    <span class="r-badge">{{ r.visits }} hits</span>
                    <span class="r-badge r-ads" v-if="r.rendered > 0">{{ r.rendered }} ads</span>
                  </div>
                </div>
                <div class="route-bar-container">
                  <div class="route-bar" :style="{ width: Math.max(2, (r.visits / Math.max(stats.maxRouteVisits, 1)) * 100) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    
    <div :class="['toast-notification', { 'show': showToast }]">
       <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
       <span>Configuración guardada correctamente</span>
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
  topRoutes: [],
  maxRouteVisits: 1
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
  { key: 'organic', inputName: 'ads_for_organic', label: 'Orgánico' },
  { key: 'premium', inputName: 'ads_for_premium', label: 'Particular' },
  { key: 'internal', inputName: 'ads_for_internal', label: 'Interno' }
]

const getSegmentStat = (key, metric) => {
  const row = stats.value.bySegment?.find(s => s.user_segment === key)
  return row ? row[metric].toLocaleString() : 0
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
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Montserrat:wght@500;600;700&display=swap');

.ads-dashboard-wrapper {
  min-height: 100vh;
  background-color: #f8fafc;
  color: #141414;
  font-family: 'Montserrat', sans-serif;
  padding: 3rem 1.5rem;
  box-sizing: border-box;
}

.page-container {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.header-titles {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #618B2F;
  margin-bottom: 0.75rem;
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
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.page-subtitle {
  color: #64748b;
  font-size: 0.95rem;
  margin: 0;
}

/* Filters */
.time-filters {
  display: flex;
  background: #ffffff;
  padding: 4px;
  border-radius: 10px;
  gap: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

.time-filters button {
  background: transparent;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.time-filters button.active {
  background: #f1f5f9;
  color: #0f172a;
}

.time-filters button:hover:not(.active) { color: #0f172a; }

/* KPIs */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.kpi-card {
  background: #ffffff;
  padding: 1.25rem 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.kpi-card.highlight-card {
  border: 1px solid #dcfce7;
  background: #fdfefc;
}

.kpi-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}

.kpi-value-row {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.kpi-value {
  font-family: 'Fredoka', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
}

.kpi-trend {
  font-size: 0.75rem;
  font-weight: 700;
  color: #15803d;
  background: #dcfce7;
  padding: 3px 8px;
  border-radius: 12px;
}

/* Main Grid */
.main-grid {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 1.5rem;
  align-items: start;
}

.control-pane {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.panel-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}

.panel-title {
  font-family: 'Fredoka', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.2rem;
}

.panel-desc {
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
}

.mb-10 { margin-bottom: 1rem; }
.mt-15 { margin-top: 1.5rem; }
.text-right { text-align: right; }
.h-100 { height: 100%; display: flex; flex-direction: column; }

/* Master Panel */
.master-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  padding: 1.25rem 1.5rem;
}
.master-panel.is-active {
  background: #fdfefc;
  border-color: #dcfce7;
}

/* Dense Segment Table */
.segment-table {
  display: flex;
  flex-direction: column;
}

.segment-th {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 50px;
  padding: 0 10px 8px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
}

.segment-tr {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 50px;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 8px;
}
.segment-tr:hover { background: #f8fafc; }
.segment-tr.is-active { background: #fdfefc; }
.segment-tr:last-child { border-bottom: none; }

.s-name { font-size: 0.9rem; font-weight: 600; color: #1e293b; }
.s-num { font-size: 0.9rem; font-weight: 500; color: #475569; }
.s-num.highlight { color: #d97706; font-weight: 600; }
.s-action { display: flex; justify-content: flex-end; }

/* Actions */
.presets-row {
  display: flex;
  gap: 0.5rem;
}

.btn-preset {
  flex: 1;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #475569;
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Montserrat', sans-serif;
}
.btn-preset:hover { background: #ffffff; border-color: #cbd5e1; color: #0f172a; }

.btn-primary {
  width: 100%;
  background: #618B2F;
  color: #ffffff;
  border: none;
  padding: 0.8rem;
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
}
.btn-primary:hover:not(:disabled) { background: #507524; }
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

/* Route Analytics */
.route-header { margin-bottom: 1.5rem; }

.route-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
}

.route-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.route-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.route-path {
  font-family: monospace;
  font-size: 0.85rem;
  color: #334155;
  font-weight: 600;
}

.route-metrics {
  display: flex;
  gap: 6px;
}

.r-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  background: #f1f5f9;
  color: #64748b;
}

.r-ads {
  background: #fef3c7;
  color: #d97706;
}

.route-bar-container {
  width: 100%;
  height: 4px;
  background: #f1f5f9;
  border-radius: 2px;
  overflow: hidden;
}

.route-bar {
  height: 100%;
  background: #618B2F;
  border-radius: 2px;
  transition: width 0.5s ease;
}

.empty-state {
  padding: 3rem 1rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
  font-style: italic;
}

/* Toggles */
.hidden-input { position: absolute; opacity: 0; pointer-events: none; }
.custom-toggle { display: inline-flex; align-items: center; }
.toggle-track { width: 3rem; height: 1.75rem; background: #cbd5e1; border-radius: 999px; position: relative; transition: all 0.3s; }
.toggle-thumb { width: 1.35rem; height: 1.35rem; background: #ffffff; border-radius: 50%; position: absolute; top: 0.2rem; left: 0.2rem; transition: all 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
input:checked + .toggle-track { background: #618B2F; }
input:checked + .toggle-track .toggle-thumb { transform: translateX(1.25rem); }

.small-toggle .toggle-track { width: 2.4rem; height: 1.4rem; }
.small-toggle .toggle-thumb { width: 1rem; height: 1rem; top: 0.2rem; left: 0.2rem; }
.small-toggle input:checked + .toggle-track .toggle-thumb { transform: translateX(1rem); }

/* Spinner & Toast */
.spinner { animation: rotate 2s linear infinite; width: 20px; height: 20px; }
.spinner .path { stroke: #ffffff; stroke-linecap: round; animation: dash 1.5s ease-in-out infinite; }
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
  background: #0f172a;
  color: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 50;
  font-weight: 500;
  font-size: 0.95rem;
}

.toast-notification.show { transform: translateY(0); opacity: 1; }
.toast-icon { width: 20px; height: 20px; color: #618B2F; }

/* Responsive */
@media (max-width: 991px) {
  .main-grid { grid-template-columns: 1fr; }
  .page-header { flex-direction: column; align-items: stretch; }
}
@media (max-width: 575px) {
  .ads-dashboard-wrapper { padding: 1.5rem 1rem; }
  .toast-notification { right: 1rem; left: 1rem; bottom: 1rem; justify-content: center; }
}
</style>