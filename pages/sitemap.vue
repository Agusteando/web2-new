<template>
  <div class="sitemap-dashboard-wrapper">
    <div class="page-container">
      <header class="page-header">
        <div class="header-titles">
          <span class="badge-pill">
            <span class="badge-dot pulse-animation"></span>
            Control de Enrutamiento
          </span>
          <h1 class="page-title">Sitemap Operativo</h1>
          <p class="page-subtitle">Inspecciona y controla la resolución de rutas canónicas en tiempo real.</p>
        </div>
      </header>

      <div class="sitemap-layout">
        
        <!-- Tree Panel -->
        <div class="tree-panel">
          <div class="panel-header">
            <h2 class="panel-title">Estructura Dinámica (App)</h2>
          </div>
          <div class="tree-container">
            <SitemapTreeItem 
              :node="routeTree" 
              :depth="0" 
              :selectedPath="selectedPath" 
              :overrides="overrides"
              @select="handleSelect" 
            />
          </div>
        </div>

        <!-- Inspector Panel -->
        <div class="inspector-panel">
           <div v-if="selectedNode" class="inspector-card">
             <div class="route-header">
               <span class="route-label">Ruta seleccionada</span>
               <h3 class="route-path">{{ selectedNode.path }}</h3>
             </div>

             <div class="control-group">
               <label>Comportamiento de Resolución</label>
               <div class="behavior-selector">
                 <button class="behavior-btn" :class="{ active: editForm.type === 'default' }" @click="editForm.type = 'default'">Nativo (Vue)</button>
                 <button class="behavior-btn" :class="{ active: editForm.type === 'redirect' }" @click="editForm.type = 'redirect'">Redirección</button>
                 <button class="behavior-btn" :class="{ active: editForm.type === 'proxy' }" @click="editForm.type = 'proxy'">Proxy Transparente</button>
               </div>
               <p class="behavior-help">{{ behaviorHelp }}</p>
             </div>

             <div class="control-group" v-if="editForm.type !== 'default'">
               <label>Destino (Target URL / Path)</label>
               <input type="text" v-model="editForm.target" placeholder="Ej. /otra-ruta o https://..." class="form-input" />
             </div>

             <div class="control-group" v-if="editForm.type === 'redirect'">
               <label>Código de Estado HTTP</label>
               <select v-model="editForm.statusCode" class="form-input">
                 <option :value="301">301 - Permanente (SEO)</option>
                 <option :value="302">302 - Temporal</option>
               </select>
             </div>

             <div class="action-row">
               <button class="btn-primary" @click="saveOverride" :disabled="isSaving">
                 <svg v-if="isSaving" class="spinner" viewBox="0 0 24 24"><circle class="path" cx="12" cy="12" r="10" fill="none" stroke-width="4"></circle></svg>
                 <span v-else>Aplicar Cambios</span>
               </button>
             </div>
           </div>
           
           <div v-else class="empty-inspector">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <p>Selecciona una ruta en el mapa a la izquierda para inspeccionarla o modificar su comportamiento.</p>
           </div>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <div :class="['toast-notification', { 'show': showToast }]">
       <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
       <span>Enrutamiento actualizado correctamente</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const headers = useRequestHeaders(['authorization']);
const overrides = ref({});
const router = useRouter();

const fetchOverrides = async () => {
  try {
    const data = await $fetch('/api/sitemap/overrides', { headers });
    overrides.value = data || {};
  } catch(e) {
    console.error('[Sitemap] Failed to fetch overrides:', e);
  }
};

onMounted(() => fetchOverrides());

const routeTree = computed(() => {
  const root = { name: 'Colegios IECS-IEDIS', path: '/', children: [] };
  
  // Extrae y normaliza todas las rutas registradas en Vue
  const paths = [...new Set(router.getRoutes().map(r => r.path))]
    .filter(p => !p.includes(':') && p !== '/sitemap' && p !== '/ads-dashboard')
    .sort();

  const insert = (pathStr) => {
    if (pathStr === '/') return;
    const parts = pathStr.split('/').filter(Boolean);
    let current = root;
    let currPath = '';
    
    for (const part of parts) {
      currPath += `/${part}`;
      let child = current.children.find(c => c.name === part);
      if (!child) {
        child = { name: part, path: currPath, children: [] };
        current.children.push(child);
      }
      current = child;
    }
  };
  
  paths.forEach(insert);
  return root;
});

const selectedNode = ref(null);
const selectedPath = computed(() => selectedNode.value?.path);

const editForm = ref({
  type: 'default',
  target: '',
  statusCode: 302
});

const handleSelect = (node) => {
  selectedNode.value = node;
  const over = overrides.value[node.path];
  if (over && over.type !== 'default') {
    editForm.value = { ...over };
  } else {
    editForm.value = { type: 'default', target: '', statusCode: 302 };
  }
};

const isSaving = ref(false);
const showToast = ref(false);

const saveOverride = async () => {
  if (!selectedNode.value) return;
  
  isSaving.value = true;
  try {
    await $fetch('/api/sitemap/overrides', {
      method: 'POST',
      body: {
        path: selectedNode.value.path,
        override: editForm.value
      },
      headers: import.meta.client ? {} : useRequestHeaders(['authorization'])
    });
    
    await fetchOverrides();
    
    // Sincroniza el estado SPA global inmediatamente sin necesidad de recargar la página
    const sitemapOverridesState = useState('sitemapOverrides');
    sitemapOverridesState.value = overrides.value;
    
    showToast.value = true;
    setTimeout(() => { showToast.value = false }, 3500);
  } catch (e) {
    alert('No se pudo guardar la configuración de la ruta. Revisa la consola.');
  } finally {
    isSaving.value = false;
  }
};

const behaviorHelp = computed(() => {
  if (editForm.value.type === 'default') return "La ruta resolverá a la página nativa de Vue configurada en Nuxt por defecto.";
  if (editForm.value.type === 'redirect') return "El usuario será redirigido HTTP de forma visible a la nueva URL o ruta indicada.";
  if (editForm.value.type === 'proxy') return "El contenido de la URL destino se clonará e inyectará de forma invisible manteniendo la ruta actual en el navegador (URL Estable).";
  return "";
});

useHead({
  title: 'Sitemap & Enrutamiento | IECS-IEDIS',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
});
</script>

<style scoped>
/* 
  =============================================================
  ELEVATED BRAND UI - SITEMAP DASHBOARD
  Light-only, minimal cognitive load. Aligned with /ads.
  =============================================================
*/

@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');

.sitemap-dashboard-wrapper {
  min-height: 100vh;
  background-color: #f4fbfc;
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
  max-width: 42rem;
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
  color: #007F92; /* Alternative Brand Color */
  margin-bottom: 1.25rem;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #007F92;
}

.pulse-animation {
  box-shadow: 0 0 0 0 rgba(0, 127, 146, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 127, 146, 0.4); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(0, 127, 146, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 127, 146, 0); }
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

/* Layout Grid */
.sitemap-layout {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  align-items: start;
}

.tree-panel, .inspector-panel {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
  padding: 2rem;
}

.panel-header {
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.panel-title {
  font-family: 'Fredoka', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #141414;
  margin: 0;
}

.tree-container {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 10px;
}

.tree-container::-webkit-scrollbar {
  width: 6px;
}
.tree-container::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 6px;
}

/* Route Inspector */
.route-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.route-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #9ca3af;
  font-weight: 700;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.25rem;
}

.route-path {
  font-family: monospace;
  font-size: 1.4rem;
  color: #007F92;
  margin: 0;
  word-break: break-all;
}

.control-group {
  margin-bottom: 1.75rem;
}

.control-group label {
  display: block;
  font-family: 'Fredoka', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #141414;
}

.behavior-selector {
  display: flex;
  background: #f3f4f6;
  padding: 6px;
  border-radius: 12px;
  gap: 6px;
  flex-wrap: wrap;
}

.behavior-btn {
  flex: 1;
  background: transparent;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 140px;
}

.behavior-btn.active {
  background: #ffffff;
  color: #141414;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.behavior-help {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0.75rem 0 0;
  line-height: 1.5;
}

.form-input {
  width: 100%;
  padding: 14px 18px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  background: #fdfdfd;
}

.form-input:focus {
  border-color: #007F92;
  background: #ffffff;
}

.action-row {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: flex-end;
}

.btn-primary {
  background: #007F92;
  color: #ffffff;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 999px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 127, 146, 0.25);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
}

.btn-primary:hover:not(:disabled) {
  background: #006877;
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(0, 127, 146, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.empty-inspector {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  text-align: center;
  color: #9ca3af;
  height: 100%;
}

.empty-inspector svg {
  width: 64px;
  height: 64px;
  opacity: 0.3;
  margin-bottom: 1.5rem;
}

.empty-inspector p {
  font-size: 1.1rem;
  max-width: 280px;
  line-height: 1.5;
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
  color: #007F92;
}

/* Responsive */
@media (max-width: 991px) {
  .sitemap-layout { grid-template-columns: 1fr; }
  .tree-panel { max-height: 40vh; overflow-y: auto; }
  .tree-container { max-height: none; overflow: visible; }
}

@media (max-width: 575px) {
  .sitemap-dashboard-wrapper { padding: 2rem 1rem; }
  .tree-panel, .inspector-panel { padding: 1.5rem; }
  .action-row { justify-content: stretch; }
  .btn-primary { width: 100%; }
}
</style>