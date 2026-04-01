import { getRequestURL, setHeader } from "h3";
import { getAdConfig, getAdDashboardStats } from "~/server/utils/adsDb";
import { assertAdsDashboardAccess } from "~/server/utils/ads";

export default defineEventHandler(async (event) => {
  await assertAdsDashboardAccess(event);

  const config = await getAdConfig();
  const stats = await getAdDashboardStats();
  const url = getRequestURL(event);

  const globalEnabled = config.global_ads_enabled === 1;
  const internalEnabled = config.ads_for_internal === 1;
  const premiumEnabled = config.ads_for_premium === 1;
  const daycareEnabled = config.ads_for_daycare === 1;
  const organicEnabled = config.ads_for_organic === 1;

  type SegmentKey = "internal" | "premium" | "daycare" | "organic";

  const segmentDefs: Array<{
    key: SegmentKey;
    inputName: string;
    label: string;
    description: string;
  }> = [
    {
      key: "daycare",
      inputName: "ads_for_daycare",
      label: "guardería (login.php, usuario ≠ 6 caracteres)",
      description: "Padres y madres con cuentas de guardería. Suele ser el primer grupo recomendado para iniciar.",
    },
    {
      key: "organic",
      inputName: "ads_for_organic",
      label: "tráfico orgánico (sin login)",
      description: "Visitantes que nunca han iniciado sesión en este navegador.",
    },
    {
      key: "premium",
      inputName: "ads_for_premium",
      label: "familias particulares (login.php, usuario de 6 caracteres)",
      description: "Familias premium con mensualidad. Habilita con cuidado cuando ya tengas confianza en el sistema.",
    },
    {
      key: "internal",
      inputName: "ads_for_internal",
      label: "staff interno (/login con Google)",
      description: "Equipo interno y personal administrativo. Útil para revisiones internas o pruebas.",
    },
  ];

  const bySegmentIndex: Record<
    SegmentKey,
    { visits: number; eligible: number; rendered: number }
  > = {
    internal: { visits: 0, eligible: 0, rendered: 0 },
    premium: { visits: 0, eligible: 0, rendered: 0 },
    daycare: { visits: 0, eligible: 0, rendered: 0 },
    organic: { visits: 0, eligible: 0, rendered: 0 },
  };

  for (const row of stats.bySegment) {
    const key = row.user_segment as SegmentKey;
    if (bySegmentIndex[key]) {
      bySegmentIndex[key] = {
        visits: row.visits,
        eligible: row.eligible,
        rendered: row.rendered,
      };
    }
  }

  const segmentEnabled: Record<SegmentKey, boolean> = {
    internal: internalEnabled,
    premium: premiumEnabled,
    daycare: daycareEnabled,
    organic: organicEnabled,
  };

  const segmentCardsHtml = segmentDefs
    .map((seg) => {
      const metrics = bySegmentIndex[seg.key];
      const enabled = segmentEnabled[seg.key];
      const cardStateClass = enabled ? "segment-on" : "segment-off";
      const statusText = enabled ? "Activo" : "Apagado";
      const statusDetail = enabled
        ? "Puede recibir anuncios cuando el kill switch global está en ON."
        : "No recibe anuncios mientras este segmento esté en OFF.";

      return `
        <label class="segment-card ${cardStateClass}">
          <input
            type="checkbox"
            name="${seg.inputName}"
            value="1"
            class="segment-input"
            ${enabled ? "checked" : ""}
          />
          <div class="segment-content">
            <div class="segment-header">
              <div class="segment-title-wrap">
                <span class="segment-badge">
                  <span class="segment-dot"></span>
                  <span class="segment-status-text">${statusText}</span>
                </span>
                <span class="segment-title">
                  <code>${seg.key}</code> · ${seg.label}
                </span>
              </div>
              <span class="segment-status-detail">${statusDetail}</span>
            </div>
            <p class="segment-desc">
              ${seg.description}
            </p>
            <div class="segment-metrics">
              <div class="metric">
                <span class="metric-label">Visitas</span>
                <span class="metric-value">${metrics.visits}</span>
              </div>
              <div class="metric">
                <span class="metric-label">Elegibles</span>
                <span class="metric-value">${metrics.eligible}</span>
              </div>
              <div class="metric">
                <span class="metric-label">Impresiones</span>
                <span class="metric-value">${metrics.rendered}</span>
              </div>
            </div>
          </div>
        </label>
      `;
    })
    .join("");

  const killStatusText = globalEnabled ? "Anuncios Activados" : "Anuncios Detenidos";
  const killSubtitle = globalEnabled
    ? "Los segmentos activos recibirán bloques de AdSense."
    : "Bloqueo maestro. La monetización está inactiva y no se inyectarán anuncios.";

  // Fully Light-Only pristine SaaS aesthetic
  const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Ads Control Dashboard · IECS-IEDIS</title>
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <style>
    :root {
      /* Pure Light Theme Variables */
      --bg: #f8fafc;
      --bg-elevated: #ffffff;
      --border-subtle: #e2e8f0;
      --border-strong: #cbd5e1;
      
      --accent: #22c55e;
      --accent-soft: #dcfce7;
      --accent-border: #86efac;
      --accent-strong: #16a34a;
      
      --danger: #ef4444;
      --danger-soft: #fef2f2;
      --danger-border: #fca5a5;
      
      --text: #0f172a;
      --text-soft: #475569;
      --text-subtle: #64748b;
      
      --surface-radius: 1rem;
      --shadow-soft: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      padding: 1.5rem;
      background-color: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 1rem;
      line-height: 1.5;
    }

    .page {
      max-width: 68rem;
      margin: 3rem auto;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    /* Base Card Styling */
    .page-header, .section {
      background: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--surface-radius);
      box-shadow: var(--shadow-soft);
    }

    .page-header {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .page-header-top {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: #f1f5f9;
      border: 1px solid var(--border-subtle);
      color: var(--text-soft);
      font-weight: 600;
      align-self: flex-start;
      margin-bottom: 0.5rem;
    }

    .badge-dot {
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
      70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
    }

    h1 {
      margin: 0;
      font-size: 2.25rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    .hint {
      margin: 0;
      font-size: 1.05rem;
      color: var(--text-subtle);
    }

    .page-header-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      border-top: 1px solid #f1f5f9;
      padding-top: 1.25rem;
    }

    .meta-item {
      display: flex;
      flex-direction: column;
    }

    .meta-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-subtle);
      margin-bottom: 0.25rem;
    }

    .meta-item span:last-child {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text);
    }

    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 0.8em;
      padding: 0.2rem 0.4rem;
      border-radius: 0.3rem;
      background: #f1f5f9;
      border: 1px solid var(--border-subtle);
      color: var(--text);
    }

    .page-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .section {
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .section-header {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .section-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .section-subtitle {
      margin: 0;
      font-size: 0.9rem;
      color: var(--text-subtle);
    }

    /* Master Kill Switch Box */
    .kill-container {
      border-radius: 0.75rem;
      padding: 1.5rem;
      border: 1px solid var(--border-subtle);
      background: var(--bg-elevated);
      transition: all 0.3s ease;
    }

    .kill-container.kill-on {
      background: var(--success-bg);
      border-color: var(--accent-border);
    }

    .kill-container.kill-off {
      background: var(--danger-soft);
      border-color: var(--danger-border);
    }

    .kill-inner {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      cursor: pointer;
    }

    .kill-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .kill-text {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .kill-title {
      font-size: 1.2rem;
      font-weight: 800;
      letter-spacing: -0.01em;
      text-transform: uppercase;
    }

    .kill-container.kill-on .kill-title { color: #166534; }
    .kill-container.kill-off .kill-title { color: #991b1b; }

    .kill-subtitle {
      font-size: 0.9rem;
      color: var(--text-soft);
    }

    /* iOS Style Toggle Switch */
    .kill-toggle {
      display: inline-flex;
      align-items: center;
    }

    .kill-input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    .kill-track {
      width: 3.5rem;
      height: 1.75rem;
      border-radius: 999px;
      background: var(--border-subtle);
      border: 1px solid var(--border-strong);
      position: relative;
      transition: all 0.3s ease;
    }

    .kill-thumb {
      width: 1.35rem;
      height: 1.35rem;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: absolute;
      top: 0.15rem;
      left: 0.2rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .kill-container.kill-on .kill-track {
      background: var(--accent);
      border-color: var(--accent-strong);
    }

    .kill-container.kill-on .kill-thumb {
      transform: translateX(1.65rem);
    }

    /* Segment Cards Grid */
    .segment-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.25rem;
    }

    .segment-card {
      border-radius: 0.75rem;
      border: 1px solid var(--border-subtle);
      background: var(--bg-elevated);
      padding: 1.5rem;
      display: flex;
      flex-direction: row;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }

    .segment-card:hover {
      background: var(--bg);
      border-color: var(--border-strong);
      box-shadow: var(--shadow-soft);
    }

    .segment-card.segment-on {
      background: var(--success-bg);
      border-color: var(--accent-border);
    }

    .segment-input {
      margin: 0;
      margin-top: 0.25rem;
      flex-shrink: 0;
      width: 1.15rem;
      height: 1.15rem;
      accent-color: var(--accent);
    }

    .segment-content {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .segment-header {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 0.85rem;
    }

    .segment-title-wrap {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .segment-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.25rem 0.6rem;
      border-radius: 999px;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border: 1px solid var(--border-subtle);
      background: #f1f5f9;
      color: var(--text-soft);
      font-weight: 700;
    }

    .segment-card.segment-on .segment-badge {
      border-color: var(--accent-border);
      background: var(--accent-soft);
      color: #166534;
    }

    .segment-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #94a3b8;
    }

    .segment-card.segment-on .segment-dot {
      background: var(--accent);
    }

    .segment-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text);
    }

    .segment-card.segment-on code {
      background: var(--accent-soft);
      border-color: var(--accent-border);
      color: #166534;
    }

    .segment-status-detail {
      font-size: 0.8rem;
      color: var(--text-subtle);
    }

    .segment-desc {
      margin: 0 0 1.25rem;
      font-size: 0.85rem;
      color: var(--text-soft);
      line-height: 1.5;
    }

    .segment-metrics {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.5rem;
      border-top: 1px solid #f1f5f9;
      padding-top: 1rem;
    }

    .segment-card.segment-on .segment-metrics {
      border-top-color: #bbf7d0;
    }

    .metric {
      display: flex;
      flex-direction: column;
    }

    .metric-label {
      font-size: 0.7rem;
      color: var(--text-subtle);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
      margin-bottom: 0.15rem;
    }

    .metric-value {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--text);
    }

    /* Buttons & Presets */
    .btn-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .btn-preset {
      background: var(--bg-elevated);
      color: var(--text-soft);
      border: 1px solid var(--border-subtle);
      padding: 0.5rem 1.25rem;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-preset:hover {
      background: var(--bg);
      border-color: var(--border-strong);
      color: var(--text);
    }

    .btn-primary {
      background: var(--text);
      color: #ffffff;
      border: none;
      padding: 0.85rem 2.25rem;
      border-radius: 999px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .btn-primary:hover {
      background: #1e293b;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.25);
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

    .save-hint {
      font-size: 0.9rem;
      color: var(--text-subtle);
    }

    @media (max-width: 768px) {
      .page-header-meta { flex-direction: column; gap: 1rem; }
      .kill-row { flex-direction: column; align-items: flex-start; gap: 1rem; }
      .save-row { flex-direction: column; align-items: flex-start; }
    }
  </style>
</head>
<body>
  <div class="page">
    <header class="page-header">
      <div class="page-header-top">
        <div class="badge">
          <span class="badge-dot"></span>
          <span>Panel de control de monetización</span>
        </div>
        <h1>Ads Control Dashboard</h1>
        <p class="hint">Ajusta el motor de decisión, segmentos y comportamientos de forma global y reactiva.</p>
      </div>
      <div class="page-header-meta">
        <div class="meta-item">
          <span class="meta-label">Host</span>
          <code>${url.hostname}</code>
        </div>
        <div class="meta-item">
          <span class="meta-label">Total visitas</span>
          <span>${stats.totalVisits}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Total Elegibles</span>
          <span>${stats.totalEligible}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Anuncios Renderizados</span>
          <span>${stats.totalRendered}</span>
        </div>
      </div>
    </header>

    <form method="post" action="/ads" class="page-form">
      
      <!-- Kill Switch Global -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Kill Switch Global</h2>
          <p class="section-subtitle">Corte maestro inmediato. Si se apaga, ningún visitante verá anuncios, sin importar sus segmentos habilitados.</p>
        </div>
        <div class="kill-container ${globalEnabled ? "kill-on" : "kill-off"}">
          <label class="kill-inner">
            <div class="kill-row">
              <div class="kill-text">
                <span class="kill-title">${killStatusText}</span>
                <span class="kill-subtitle">${killSubtitle}</span>
              </div>
              <div class="kill-toggle">
                <input
                  type="checkbox"
                  name="global_ads_enabled"
                  value="1"
                  class="kill-input"
                  ${globalEnabled ? "checked" : ""}
                />
                <div class="kill-track">
                  <div class="kill-thumb"></div>
                </div>
              </div>
            </div>
          </label>
        </div>
      </section>

      <!-- Matriz por Segmento -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Matriz por Segmento</h2>
          <p class="section-subtitle">Activa selectivamente las audiencias. El algoritmo de segmentación define qué visitas son elegibles.</p>
        </div>
        <div class="segment-grid">
          ${segmentCardsHtml}
        </div>
      </section>

      <!-- Presets -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Acciones Rápidas (Presets)</h2>
          <p class="section-subtitle">Patrones recomendados para rollouts progresivos sin intervención manual celda por celda.</p>
        </div>
        <div class="btn-row">
          <button type="submit" name="preset" value="daycare-only" class="btn-preset">
            Solo Guardería
          </button>
          <button type="submit" name="preset" value="daycare-organic" class="btn-preset">
            Guardería + Orgánico
          </button>
          <button type="submit" name="preset" value="all-segments" class="btn-preset">
            Activar todos
          </button>
        </div>
      </section>

      <!-- Guardar -->
      <section class="section save-section">
        <div class="save-row">
          <button type="submit" name="action" value="save" class="btn-primary">
            Guardar Cambios
          </button>
          <span class="save-hint">Aplica instantáneamente en memoria y DB (Zero Downtime).</span>
        </div>
      </section>

    </form>
  </div>
</body>
</html>`;

  setHeader(event, "Content-Type", "text/html; charset=utf-8");
  return html;
});