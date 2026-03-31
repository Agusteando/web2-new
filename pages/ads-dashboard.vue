<template>
  <div class="ads-dashboard-wrapper">
    <div class="page-container">
      <header class="page-header">
        <div class="page-header-top">
          <div class="badge-pill">
            <span class="badge-dot pulse-animation"></span>
            <span>Panel de control de monetización</span>
          </div>
          <h1 class="page-title">Ads Control Dashboard</h1>
          <p class="page-subtitle">Ajusta el motor de decisión, segmentos y comportamientos de forma global y reactiva.</p>
        </div>
        
        <div class="page-header-meta">
          <div class="meta-item">
            <span class="meta-label">Total visitas</span>
            <span>{{ stats.totalVisits }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Total Elegibles</span>
            <span>{{ stats.totalEligible }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Anuncios Renderizados</span>
            <span>{{ stats.totalRendered }}</span>
          </div>
        </div>
      </header>

      <div class="sections-layout">
        <section class="dashboard-section">
          <div class="section-header">
            <h2 class="section-title">Kill Switch Global</h2>
            <p class="section-desc">Corte maestro inmediato. Si se apaga, ningún visitante verá anuncios, sin importar sus segmentos habilitados.</p>
          </div>
          
          <div :class="['kill-switch-card', config.global_ads_enabled ? 'is-active' : 'is-inactive']">
            <label class="kill-switch-inner">
              <div class="kill-switch-info">
                <span class="kill-status-title">{{ config.global_ads_enabled ? 'Anuncios Activados' : 'Anuncios Detenidos' }}</span>
                <span class="kill-status-desc">{{ config.global_ads_enabled ? 'Los segmentos en ON recibirán bloques de Adsense.' : 'Bloqueo maestro. La monetización está inactiva.' }}</span>
              </div>
              <div class="kill-switch-toggle">
                <input type="checkbox" v-model="config.global_ads_enabled" class="hidden-input" />
                <div class="custom-track">
                  <div class="custom-thumb"></div>
                </div>
              </div>
            </label>
          </div>
        </section>

        <section class="dashboard-section">
          <div class="section-header">
            <h2 class="section-title">Matriz por Segmento</h2>
            <p class="section-desc">Activa selectivamente las audiencias. El algoritmo de segmentación define qué visitas son elegibles.</p>
          </div>
          
          <div class="segments-grid">
            <label v-for="seg in segmentDefs" :key="seg.key" :class="['segment-card', config[seg.inputName] ? 'is-active' : 'is-inactive']">
              <input type="checkbox" v-model="config[seg.inputName]" class="hidden-input" />
              <div class="segment-content">
                <div class="segment-header">
                  <div class="segment-badge">
                    <span class="segment-dot"></span>
                    <span>{{ config[seg.inputName] ? 'Activo' : 'Apagado' }}</span>
                  </div>
                  <span class="segment-name"><code>{{ seg.key }}</code> · {{ seg.label }}</span>
                </div>
                <p class="segment-desc">{{ seg.description }}</p>
                
                <div class="segment-metrics">
                  <div class="metric">
                    <span class="metric-label">Visitas</span>
                    <span class="metric-val">{{ getSegmentStat(seg.key, 'visits') }}</span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">Elegibles</span>
                    <span class="metric-val">{{ getSegmentStat(seg.key, 'eligible') }}</span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">Impresiones</span>
                    <span class="metric-val">{{ getSegmentStat(seg.key, 'rendered') }}</span>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </section>

        <section class="dashboard-section">
          <div class="section-header">
            <h2 class="section-title">Acciones Rápidas (Presets)</h2>
            <p class="section-desc">Patrones recomendados para rollouts progresivos sin intervención manual celda por celda.</p>
          </div>
          <div class="presets-row">
            <button class="btn-preset" @click="applyPreset('daycare-only')">Solo Guardería</button>
            <button class="btn-preset" @click="applyPreset('daycare-organic')">Guardería + Orgánico</button>
            <button class="btn-preset" @click="applyPreset('all-segments')">Activar todos</button>
          </div>
        </section>

        <section class="dashboard-section save-section">
          <div class="save-row">
            <button class="btn-primary" @click="saveChanges" :disabled="isSaving">
              <svg v-if="isSaving" class="spinner" viewBox="0 0 24 24"><circle class="path" cx="12" cy="12" r="10" fill="none" stroke-width="4"></circle></svg>
              <span v-else>Guardar Cambios</span>
            </button>
            <span class="save-hint">Aplica instantáneamente en memoria y DB (Zero Downtime).</span>
          </div>
        </section>
      </div>
    </div>
    
    <div :class="['toast-notification', { 'show': showToast }]">
       <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
       <span>Configuración guardada exitosamente</span>
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
  { key: 'daycare', inputName: 'ads_for_daycare', label: 'Guardería', description: 'Usuarios de plataforma de desarrollo infantil (length ≠ 6).' },
  { key: 'organic', inputName: 'ads_for_organic', label: 'Tráfico Orgánico', description: 'Visitantes públicos de marketing sin login registrado en el navegador.' },
  { key: 'premium', inputName: 'ads_for_premium', label: 'Familias Particulares', description: 'Usuarios pagadores de alto nivel (length = 6).' },
  { key: 'internal', inputName: 'ads_for_internal', label: 'Staff Interno', description: 'Personal y administrativos logueados vía Google OAuth.' }
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
  title: 'Ads Dashboard | IECS-IEDIS',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})
</script>

<style scoped>
/* Transición a un UI Ligero y Limpio para mantener coherencia visual con el resto del sitio */
.ads-dashboard-wrapper {
  min-height: 100vh;
  background: #f8fafc;
  color: #334155;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 3rem 1.5rem;
  box-sizing: border-box;
}

.page-container {
  max-width: 68rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
}

.page-header-top {
  margin-bottom: 1.25rem;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.8rem;
  border-radius: 9999px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #475569;
  margin-bottom: 1rem;
  font-weight: 600;
}

.badge-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #22c55e;
}

.pulse-animation {
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
  color: #0f172a;
}

.page-subtitle {
  color: #64748b;
  margin: 0;
  font-size: 1rem;
}

.page-header-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  border-top: 1px solid #f1f5f9;
  padding-top: 1rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #64748b;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.meta-item span:last-child {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
}

.sections-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dashboard-section {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06);
}

.section-header {
  margin-bottom: 1.25rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
  color: #0f172a;
}

.section-desc {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.kill-switch-card {
  border-radius: 0.75rem;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.kill-switch-card.is-active {
  background: #f0fdf4;
  border-color: #86efac;
}

.kill-switch-card.is-inactive {
  background: #fef2f2;
  border-color: #fca5a5;
}

.kill-switch-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.kill-status-title {
  display: block;
  font-size: 1.15rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.is-active .kill-status-title { color: #166534; }
.is-inactive .kill-status-title { color: #991b1b; }

.kill-status-desc {
  font-size: 0.875rem;
  color: #475569;
}

.hidden-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.custom-track {
  width: 3.5rem;
  height: 1.75rem;
  background: #e2e8f0;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  position: relative;
  transition: all 0.3s ease;
}

.custom-thumb {
  width: 1.35rem;
  height: 1.35rem;
  background: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 0.15rem;
  left: 0.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.is-active .custom-track {
  background: #22c55e;
  border-color: #16a34a;
}

.is-active .custom-thumb {
  transform: translateX(1.65rem);
  background: #ffffff;
}

.segments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.segment-card {
  display: flex;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.segment-card:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.segment-card.is-active {
  background: #f0fdf4;
  border-color: #4ade80;
}

.segment-content {
  width: 100%;
}

.segment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.segment-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: #0f172a;
}

code {
  background: #f1f5f9;
  padding: 0.2rem 0.4rem;
  border-radius: 0.3rem;
  font-size: 0.8em;
  color: #2563eb;
  border: 1px solid #bfdbfe;
}

.segment-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #475569;
  padding: 0.15rem 0.5rem;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  font-weight: 600;
}

.is-active .segment-badge {
  color: #166534;
  border-color: #86efac;
  background: #dcfce7;
}

.segment-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #94a3b8;
}

.is-active .segment-dot {
  background: #22c55e;
}

.segment-desc {
  font-size: 0.85rem;
  color: #475569;
  margin: 0 0 1rem;
  line-height: 1.4;
}

.segment-metrics {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f1f5f9;
  padding-top: 0.75rem;
}

.metric {
  display: flex;
  flex-direction: column;
}

.metric-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  color: #64748b;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.metric-val {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
}

.presets-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-preset {
  background: #ffffff;
  color: #334155;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-preset:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}

.save-section {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  margin-top: 0.5rem;
}

.save-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.btn-primary {
  background: #22c55e;
  color: #ffffff;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(34, 197, 94, 0.3);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
}

.btn-primary:hover:not(:disabled) {
  filter: brightness(1.05);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.save-hint {
  font-size: 0.85rem;
  color: #64748b;
}

.spinner {
  animation: rotate 2s linear infinite;
  width: 20px;
  height: 20px;
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
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
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
  color: #22c55e;
}

@media (max-width: 768px) {
  .page-header-meta { flex-direction: column; gap: 0.75rem; }
  .save-row { flex-direction: column; align-items: flex-start; }
  .toast-notification { right: 1rem; left: 1rem; bottom: 1rem; justify-content: center; }
}
</style>