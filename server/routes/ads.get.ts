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
  }> = [
    { key: "daycare", inputName: "ads_for_daycare", label: "Guardería" },
    { key: "organic", inputName: "ads_for_organic", label: "Orgánico" },
    { key: "premium", inputName: "ads_for_premium", label: "Particular" },
    { key: "internal", inputName: "ads_for_internal", label: "Interno" }
  ];

  const bySegmentIndex: Record<SegmentKey, { visits: number; eligible: number; rendered: number }> = {
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

  const segmentRowsHtml = segmentDefs
    .map((seg) => {
      const metrics = bySegmentIndex[seg.key];
      const enabled = segmentEnabled[seg.key];
      const cardStateClass = enabled ? "is-active" : "";

      return `
        <label class="segment-tr ${cardStateClass}">
          <span class="s-name">${seg.label}</span>
          <span class="s-num">${metrics.visits.toLocaleString()}</span>
          <span class="s-num highlight">${metrics.rendered.toLocaleString()}</span>
          <div class="s-action">
            <div class="custom-toggle small-toggle">
              <input type="checkbox" name="${seg.inputName}" value="1" class="hidden-input" ${enabled ? "checked" : ""} />
              <div class="toggle-track"><div class="toggle-thumb"></div></div>
            </div>
          </div>
        </label>
      `;
    })
    .join("");

  const maxVisits = Math.max(stats.maxRouteVisits, 1);
  const routeItemsHtml = (stats.topRoutes || []).map((r) => {
    const pct = Math.max(2, (r.visits / maxVisits) * 100);
    return `
    <div class="route-row">
      <div class="route-info">
        <span class="route-path">${r.route || '/'}</span>
        <div class="route-metrics">
          <span class="r-badge">${r.visits} hits</span>
          ${r.rendered > 0 ? `<span class="r-badge r-ads">${r.rendered} ads</span>` : ''}
        </div>
      </div>
      <div class="route-bar-container">
        <div class="route-bar" style="width: ${pct}%"></div>
      </div>
    </div>
  `}).join("") || `<div class="empty-state">No hay datos de rutas registrados en este periodo.</div>`;

  const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Monetización · IECS-IEDIS</title>
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Montserrat:wght@500;600;700&display=swap">
  <style>
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --brand-green: #618B2F;
      --brand-green-hover: #507524;
      --radius: 16px;
      --shadow-sm: 0 4px 15px rgba(0,0,0,0.02);
    }

    * { box-sizing: border-box; }
    body {
      margin: 0; padding: 3rem 1.5rem; background-color: var(--bg);
      color: var(--text-main); font-family: 'Montserrat', sans-serif; line-height: 1.5;
    }
    .page { max-width: 1440px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem; }
    a { text-decoration: none; }
    
    /* Header */
    .page-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 1.5rem; flex-wrap: wrap; }
    .header-titles { display: flex; flex-direction: column; align-items: flex-start; }
    .badge-pill {
      display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.25rem 0.75rem; border-radius: 20px;
      background: var(--surface); box-shadow: 0 2px 8px rgba(0,0,0,0.04); font-size: 0.7rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.05em; color: var(--brand-green); margin-bottom: 0.75rem;
    }
    .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--brand-green); }
    .page-title { font-family: 'Fredoka', sans-serif; font-size: 2.25rem; font-weight: 700; margin: 0 0 0.25rem; line-height: 1.1; letter-spacing: -0.02em; }
    .page-subtitle { color: var(--text-muted); font-size: 0.95rem; margin: 0; }
    
    /* Filters */
    .time-filters { display: flex; background: var(--surface); padding: 4px; border-radius: 10px; gap: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); }
    .time-filters a { background: transparent; padding: 6px 12px; border-radius: 6px; font-family: 'Montserrat', sans-serif; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); transition: all 0.2s; }
    .time-filters a.active { background: #f1f5f9; color: var(--text-main); }
    .time-filters a:hover:not(.active) { color: var(--text-main); }

    /* KPIs */
    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; }
    .kpi-card { background: var(--surface); padding: 1.25rem 1.5rem; border-radius: var(--radius); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 0.4rem; }
    .kpi-card.highlight-card { border: 1px solid #dcfce7; background: #fdfefc; }
    .kpi-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }
    .kpi-value-row { display: flex; align-items: baseline; gap: 0.75rem; }
    .kpi-value { font-family: 'Fredoka', sans-serif; font-size: 2rem; font-weight: 700; color: var(--text-main); line-height: 1; }
    .kpi-trend { font-size: 0.75rem; font-weight: 700; color: #15803d; background: #dcfce7; padding: 3px 8px; border-radius: 12px; }

    /* Layout */
    .main-grid { display: grid; grid-template-columns: 420px 1fr; gap: 1.5rem; align-items: start; }
    .control-pane { display: flex; flex-direction: column; gap: 1.25rem; }
    .panel-card { background: var(--surface); border-radius: var(--radius); padding: 1.5rem; box-shadow: var(--shadow-sm); }
    .panel-title { font-family: 'Fredoka', sans-serif; font-size: 1.2rem; font-weight: 600; color: var(--text-main); margin: 0 0 0.2rem; }
    .panel-desc { font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.4; }
    
    .mb-10 { margin-bottom: 1rem; }
    .mt-15 { margin-top: 1.5rem; }
    .text-right { text-align: right; }
    .h-100 { height: 100%; display: flex; flex-direction: column; }

    /* Master Panel */
    .master-panel { display: flex; justify-content: space-between; align-items: center; border: 2px solid transparent; transition: all 0.2s ease; padding: 1.25rem 1.5rem; cursor: pointer; }
    .master-panel.is-active { background: #fdfefc; border-color: #dcfce7; }

    /* Segment Table */
    .segment-table { display: flex; flex-direction: column; }
    .segment-th { display: grid; grid-template-columns: 2fr 1fr 1fr 50px; padding: 0 10px 8px; border-bottom: 1px solid #e2e8f0; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; }
    .segment-tr { display: grid; grid-template-columns: 2fr 1fr 1fr 50px; align-items: center; padding: 10px; border-bottom: 1px solid #f1f5f9; cursor: pointer; transition: background 0.2s; border-radius: 8px; }
    .segment-tr:hover { background: #f8fafc; }
    .segment-tr.is-active { background: #fdfefc; }
    .segment-tr:last-child { border-bottom: none; }
    .s-name { font-size: 0.9rem; font-weight: 600; color: #1e293b; }
    .s-num { font-size: 0.9rem; font-weight: 500; color: #475569; }
    .s-num.highlight { color: #d97706; font-weight: 600; }
    .s-action { display: flex; justify-content: flex-end; }

    /* Actions */
    .presets-row { display: flex; gap: 0.5rem; }
    .btn-preset { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; color: #475569; padding: 0.5rem; border-radius: 8px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Montserrat', sans-serif; text-align: center; }
    .btn-preset:hover { background: #ffffff; border-color: #cbd5e1; color: var(--text-main); }
    .btn-primary { width: 100%; background: var(--brand-green); color: #ffffff; border: none; padding: 0.8rem; border-radius: 10px; font-family: 'Montserrat', sans-serif; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s; display: flex; justify-content: center; }
    .btn-primary:hover { background: var(--brand-green-hover); }

    /* Routes */
    .route-header { margin-bottom: 1.5rem; }
    .route-list { display: flex; flex-direction: column; gap: 0.75rem; overflow-y: auto; }
    .route-row { display: flex; flex-direction: column; gap: 6px; }
    .route-info { display: flex; justify-content: space-between; align-items: center; }
    .route-path { font-family: monospace; font-size: 0.85rem; color: #334155; font-weight: 600; }
    .route-metrics { display: flex; gap: 6px; }
    .r-badge { font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 10px; background: #f1f5f9; color: #64748b; }
    .r-ads { background: #fef3c7; color: #d97706; }
    .route-bar-container { width: 100%; height: 4px; background: #f1f5f9; border-radius: 2px; overflow: hidden; }
    .route-bar { height: 100%; background: var(--brand-green); border-radius: 2px; }
    .empty-state { padding: 3rem 1rem; text-align: center; color: #94a3b8; font-size: 0.9rem; font-style: italic; }

    /* Toggles */
    .hidden-input { position: absolute; opacity: 0; pointer-events: none; }
    .custom-toggle { display: inline-flex; align-items: center; }
    .toggle-track { width: 3rem; height: 1.75rem; background: #cbd5e1; border-radius: 999px; position: relative; transition: all 0.3s; }
    .toggle-thumb { width: 1.35rem; height: 1.35rem; background: #ffffff; border-radius: 50%; position: absolute; top: 0.2rem; left: 0.2rem; transition: all 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    input:checked + .toggle-track { background: var(--brand-green); }
    input:checked + .toggle-track .toggle-thumb { transform: translateX(1.25rem); }
    .small-toggle .toggle-track { width: 2.4rem; height: 1.4rem; }
    .small-toggle .toggle-thumb { width: 1rem; height: 1rem; top: 0.2rem; left: 0.2rem; }
    .small-toggle input:checked + .toggle-track .toggle-thumb { transform: translateX(1rem); }

    @media (max-width: 991px) { .main-grid { grid-template-columns: 1fr; } .page-header { flex-direction: column; align-items: stretch; } }
    @media (max-width: 575px) { body { padding: 1.5rem 1rem; } }
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

    <div class="kpi-grid">
      <div class="kpi-card">
        <span class="kpi-label">Visitas del Periodo</span>
        <div class="kpi-value-row">
          <span class="kpi-value">${stats.totalVisits?.toLocaleString() || 0}</span>
          ${stats.todayVisits && filter !== 'today' ? `
            <span class="kpi-trend" title="Visitas de hoy">
              +${stats.todayVisits.toLocaleString()}
            </span>
          ` : ''}
        </div>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Tráfico Elegible</span>
        <div class="kpi-value-row">
          <span class="kpi-value">${stats.totalEligible?.toLocaleString() || 0}</span>
        </div>
      </div>
      <div class="kpi-card highlight-card">
        <span class="kpi-label">Anuncios Mostrados</span>
        <div class="kpi-value-row">
          <span class="kpi-value">${stats.totalRendered?.toLocaleString() || 0}</span>
        </div>
      </div>
    </div>

    <form method="post" action="/ads" class="main-grid">
      
      <!-- Left Pane -->
      <div class="control-pane">
        <label class="panel-card master-panel ${globalEnabled ? 'is-active' : ''}">
          <div class="master-info">
            <h2 class="panel-title">Control Maestro</h2>
            <p class="panel-desc">Habilita la monetización en el sitio.</p>
          </div>
          <div class="custom-toggle">
            <input type="checkbox" name="global_ads_enabled" value="1" class="hidden-input" ${globalEnabled ? 'checked' : ''} />
            <div class="toggle-track"><div class="toggle-thumb"></div></div>
          </div>
        </label>

        <div class="panel-card segments-panel">
          <h2 class="panel-title mb-10">Audiencias</h2>
          <div class="segment-table">
            <div class="segment-th">
              <span>Segmento</span><span>Hits</span><span>Ads</span><span class="text-right">Activo</span>
            </div>
            ${segmentRowsHtml}
          </div>
        </div>

        <div class="panel-card actions-panel">
          <div class="presets-row">
            <button type="submit" name="preset" value="daycare-only" class="btn-preset">Solo Guardería</button>
            <button type="submit" name="preset" value="all-segments" class="btn-preset">Activar Todos</button>
          </div>
          <button type="submit" name="action" value="save" class="btn-primary mt-15">
            Guardar Cambios
          </button>
        </div>
      </div>

      <!-- Right Pane -->
      <div class="analytics-pane">
        <div class="panel-card h-100">
          <div class="route-header">
            <h2 class="panel-title">Rutas Más Visitadas</h2>
            <p class="panel-desc">Actividad detallada de enrutamiento y exposición.</p>
          </div>
          <div class="route-list">
            ${routeItemsHtml}
          </div>
        </div>
      </div>

    </form>
  </div>
</body>
</html>`;

  setHeader(event, "Content-Type", "text/html; charset=utf-8");
  return html;
});