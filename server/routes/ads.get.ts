import { getRequestURL, setHeader, getQuery } from "h3";
import { getAdConfig, getAdDashboardStats } from "~/server/utils/adsDb";
import { assertAdsDashboardAccess } from "~/server/utils/ads";

export default defineEventHandler(async (event) => {
  await assertAdsDashboardAccess(event);

  const q = getQuery(event);
  const filter = (q.filter as string) || '30d';

  const config = await getAdConfig();
  const stats = await getAdDashboardStats(filter);
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
      label: "Guardería",
      description: "Padres y madres con cuentas de nivel inicial.",
    },
    {
      key: "organic",
      inputName: "ads_for_organic",
      label: "Tráfico Orgánico",
      description: "Visitantes públicos y prospectos sin cuenta activa.",
    },
    {
      key: "premium",
      inputName: "ads_for_premium",
      label: "Familias Particulares",
      description: "Usuarios matriculados en niveles superiores.",
    },
    {
      key: "internal",
      inputName: "ads_for_internal",
      label: "Staff Interno",
      description: "Personal administrativo (Login Google).",
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
      const cardStateClass = enabled ? "is-active" : "";

      return `
        <label class="segment-card ${cardStateClass}">
          <div class="segment-header">
            <div class="segment-title-group">
              <span class="segment-name">${seg.label}</span>
              <span class="segment-desc">${seg.description}</span>
            </div>
            <div class="custom-toggle small-toggle">
              <input type="checkbox" name="${seg.inputName}" value="1" class="hidden-input" ${enabled ? "checked" : ""} />
              <div class="toggle-track">
                <div class="toggle-thumb"></div>
              </div>
            </div>
          </div>
          <div class="segment-metrics">
            <div class="s-metric"><span>Visitas</span><strong>${metrics.visits}</strong></div>
            <div class="s-metric"><span>Elegibles</span><strong>${metrics.eligible}</strong></div>
            <div class="s-metric"><span>Mostrados</span><strong>${metrics.rendered}</strong></div>
          </div>
        </label>
      `;
    })
    .join("");

  const routeItemsHtml = (stats.topRoutes || []).map((r) => `
    <div class="route-item">
      <span class="route-path">${r.route}</span>
      <div class="route-badges">
        <span class="r-badge r-visits">${r.visits} hits</span>
        ${r.rendered > 0 ? `<span class="r-badge r-rendered">${r.rendered} ads</span>` : ''}
      </div>
    </div>
  `).join("") || `<div class="empty-routes">No hay datos de rutas disponibles para este periodo.</div>`;

  // Beautiful, minimalist, website-aligned UI
  const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Monetización · IECS-IEDIS</title>
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Montserrat:wght@400;500;600;700&display=swap">
  <style>
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --text-main: #141414;
      --text-muted: #6b7280;
      --text-light: #9ca3af;
      --brand-green: #618B2F;
      --brand-green-hover: #507524;
      --border-light: #f3f4f6;
      --border-active: #e0f2fe;
      --shadow-sm: 0 6px 20px rgba(0,0,0,0.02);
      --shadow-lg: 0 10px 40px rgba(0,0,0,0.04);
      --radius: 20px;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      padding: 4rem 1.5rem;
      background-color: var(--bg);
      color: var(--text-main);
      font-family: 'Montserrat', sans-serif;
      line-height: 1.5;
    }

    .page {
      max-width: 72rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    a { text-decoration: none; }

    /* Header */
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
      background: var(--surface);
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--brand-green);
      margin-bottom: 1.25rem;
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--brand-green);
    }

    .page-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 2.75rem;
      font-weight: 700;
      color: var(--text-main);
      margin: 0 0 0.5rem;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .page-subtitle {
      color: var(--text-muted);
      font-size: 1.05rem;
      margin: 0;
    }

    /* Filters */
    .time-filters {
      display: flex;
      background: var(--surface);
      padding: 6px;
      border-radius: 12px;
      gap: 6px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.02);
      flex-wrap: wrap;
    }
    .time-filters a {
      background: transparent;
      padding: 8px 16px;
      border-radius: 8px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      transition: all 0.2s;
    }
    .time-filters a.active {
      background: #f1f5f9;
      color: var(--text-main);
      box-shadow: 0 2px 5px rgba(0,0,0,0.03);
    }
    .time-filters a:hover:not(.active) { color: var(--text-main); }

    /* Stats */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }

    .metric-card {
      background: var(--surface);
      padding: 1.75rem 2rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
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
      color: var(--text-muted);
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
      color: var(--text-main);
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

    /* Layout */
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
      color: var(--text-main);
      margin: 0 0 0.25rem;
    }

    .section-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin: 0;
      line-height: 1.4;
    }

    /* Cards */
    .master-control-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--surface);
      padding: 1.75rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
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

    .segments-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .segment-card {
      display: flex;
      flex-direction: column;
      background: var(--surface);
      padding: 1.5rem;
      border-radius: 16px;
      box-shadow: var(--shadow-sm);
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;
    }
    .segment-card:hover { border-color: #e2e8f0; }
    .segment-card.is-active { background: #fdfefc; border-color: var(--border-active); }

    .segment-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      gap: 1rem;
    }
    .segment-title-group { display: flex; flex-direction: column; gap: 0.2rem; }
    .segment-name { font-family: 'Montserrat', sans-serif; font-size: 1rem; font-weight: 600; color: var(--text-main); }
    .segment-desc { font-size: 0.8rem; color: var(--text-muted); }

    .segment-metrics {
      display: flex;
      justify-content: space-between;
      padding-top: 1rem;
      border-top: 1px solid var(--border-light);
    }
    .s-metric { display: flex; flex-direction: column; gap: 0.1rem; }
    .s-metric span { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-light); font-weight: 600; }
    .s-metric strong { font-size: 1rem; font-weight: 700; color: var(--text-main); }

    /* Routes Card */
    .routes-card {
      background: var(--surface);
      border-radius: var(--radius);
      padding: 1.75rem;
      box-shadow: var(--shadow-sm);
      height: 100%;
    }
    .route-list { display: flex; flex-direction: column; }
    .route-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid #f1f5f9;
      transition: background 0.2s;
      border-radius: 8px;
    }
    .route-item:hover { background: #f8fafc; }
    .route-item:last-child { border-bottom: none; }
    .route-path {
      font-family: monospace;
      font-size: 0.95rem;
      color: #334155;
      font-weight: 500;
      word-break: break-all;
      padding-right: 15px;
    }
    .route-badges { display: flex; gap: 8px; flex-shrink: 0; }
    .r-badge { font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; white-space: nowrap; }
    .r-visits { background: #f1f5f9; color: #475569; }
    .r-rendered { background: #fef3c7; color: #d97706; }
    .empty-routes { padding: 3rem 1rem; text-align: center; color: #94a3b8; font-size: 0.95rem; font-style: italic; }

    /* Toggles */
    .hidden-input { position: absolute; opacity: 0; pointer-events: none; }
    .custom-toggle { display: inline-flex; align-items: center; flex-shrink: 0; }
    .toggle-track { width: 3.5rem; height: 2rem; background: #e5e7eb; border-radius: 999px; position: relative; transition: all 0.3s; }
    .toggle-thumb { width: 1.6rem; height: 1.6rem; background: #ffffff; border-radius: 50%; position: absolute; top: 0.2rem; left: 0.2rem; transition: all 0.3s; box-shadow: 0 2px 5px rgba(0,0,0,0.15); }
    input:checked + .toggle-track { background: var(--brand-green); }
    input:checked + .toggle-track .toggle-thumb { transform: translateX(1.5rem); }
    
    .small-toggle .toggle-track { width: 2.8rem; height: 1.6rem; }
    .small-toggle .toggle-thumb { width: 1.2rem; height: 1.2rem; }
    .small-toggle input:checked + .toggle-track .toggle-thumb { transform: translateX(1.2rem); }

    /* Actions Footer */
    .action-footer {
      display: flex;
      flex-direction: column;
      background: var(--surface);
      padding: 1.5rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
      gap: 1rem;
    }
    .presets-group { display: flex; align-items: center; gap: 0.5rem; width: 100%; }
    .btn-preset {
      flex: 1; background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; padding: 0.6rem 0.5rem;
      border-radius: 12px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease;
      font-family: 'Montserrat', sans-serif; text-align: center;
    }
    .btn-preset:hover { background: #ffffff; border-color: #cbd5e1; color: #141414; box-shadow: 0 2px 8px rgba(0,0,0,0.03); }
    .btn-primary {
      background: var(--brand-green); color: #ffffff; border: none; padding: 1rem; border-radius: 12px;
      font-family: 'Montserrat', sans-serif; font-size: 1rem; font-weight: 700; cursor: pointer;
      box-shadow: 0 8px 20px rgba(97, 139, 47, 0.25); transition: all 0.3s ease; display: inline-flex;
      align-items: center; justify-content: center; width: 100%;
    }
    .btn-primary:hover { background: var(--brand-green-hover); transform: translateY(-2px); box-shadow: 0 12px 25px rgba(97, 139, 47, 0.3); }

    /* Responsive */
    @media (max-width: 991px) {
      .dashboard-layout { grid-template-columns: 1fr; }
      .page-header { flex-direction: column; align-items: stretch; gap: 1.5rem; }
      .header-titles { max-width: 100%; }
    }
    @media (max-width: 575px) {
      body { padding: 2rem 1rem; }
      .master-control-card { flex-direction: column; align-items: flex-start; gap: 1.5rem; padding: 1.5rem; }
      .metric-card { padding: 1.25rem 1.5rem; }
    }
  </style>
</head>
<body>
  <div class="page">
    <header class="page-header">
      <div class="header-titles">
        <span class="badge-pill">
          <span class="badge-dot pulse-animation"></span>
          /ads · Panel de control
        </span>
        <h1 class="page-title">Monetización</h1>
        <p class="page-subtitle">Visibilidad operativa, métricas de tráfico y control de anuncios. Host: <code>${url.hostname}</code></p>
      </div>
      
      <div class="time-filters">
        <a href="?filter=today" class="${filter === 'today' ? 'active' : ''}">Hoy</a>
        <a href="?filter=7d" class="${filter === '7d' ? 'active' : ''}">Últimos 7 días</a>
        <a href="?filter=30d" class="${filter === '30d' ? 'active' : ''}">Últimos 30 días</a>
        <a href="?filter=all" class="${filter === 'all' ? 'active' : ''}">Histórico</a>
      </div>
    </header>

    <div class="metrics-grid">
      <div class="metric-card">
        <span class="metric-label">Visitas del Periodo</span>
        <div class="metric-value-row">
          <span class="metric-value">${stats.totalVisits || 0}</span>
          ${stats.todayVisits && filter !== 'today' ? `
            <span class="metric-trend">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              +${stats.todayVisits} hoy
            </span>
          ` : ''}
        </div>
      </div>
      <div class="metric-card">
        <span class="metric-label">Tráfico Elegible</span>
        <div class="metric-value-row">
          <span class="metric-value">${stats.totalEligible || 0}</span>
        </div>
      </div>
      <div class="metric-card highlight-card">
        <span class="metric-label">Anuncios Mostrados</span>
        <div class="metric-value-row">
          <span class="metric-value">${stats.totalRendered || 0}</span>
        </div>
      </div>
    </div>

    <form method="post" action="/ads" class="dashboard-layout">
      
      <!-- Left Column -->
      <div class="control-column">
        <section class="dashboard-section">
          <label class="master-control-card ${globalEnabled ? 'is-active' : ''}">
            <div class="master-control-info">
              <h2 class="section-title">Control Maestro</h2>
              <p class="section-desc">Activa o detiene la monetización en todo el sitio web al instante.</p>
            </div>
            <div class="custom-toggle">
              <input type="checkbox" name="global_ads_enabled" value="1" class="hidden-input" ${globalEnabled ? 'checked' : ''} />
              <div class="toggle-track">
                <div class="toggle-thumb"></div>
              </div>
            </div>
          </label>
        </section>

        <section class="dashboard-section">
          <div class="section-header">
            <h2 class="section-title">Audiencias Activas</h2>
            <p class="section-desc">Selecciona qué grupos de usuarios verán anuncios si el control maestro está activo.</p>
          </div>
          <div class="segments-list">
            ${segmentCardsHtml}
          </div>
        </section>

        <section class="action-footer">
          <div class="presets-group">
            <button type="submit" name="preset" value="daycare-only" class="btn-preset">Solo Guardería</button>
            <button type="submit" name="preset" value="all-segments" class="btn-preset">Activar todos</button>
          </div>
          <button type="submit" name="action" value="save" class="btn-primary">
            Guardar Cambios
          </button>
        </section>
      </div>

      <!-- Right Column -->
      <div class="insights-column">
        <section class="dashboard-section h-100">
          <div class="routes-card">
            <div class="section-header" style="margin-bottom: 1rem;">
              <h2 class="section-title">Rutas Más Visitadas</h2>
              <p class="section-desc">Actividad de tráfico detallada durante el periodo seleccionado.</p>
            </div>
            <div class="route-list">
              ${routeItemsHtml}
            </div>
          </div>
        </section>
      </div>

    </form>
  </div>
</body>
</html>`;

  setHeader(event, "Content-Type", "text/html; charset=utf-8");
  return html;
});