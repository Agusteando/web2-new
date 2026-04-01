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
      --bg: #f4fbfc;
      --surface: #ffffff;
      --text-main: #141414;
      --text-muted: #6b7280;
      --text-light: #9ca3af;
      --brand-green: #618B2F;
      --brand-green-hover: #507524;
      --border-light: #f3f4f6;
      --border-active: #e0f2fe;
      --shadow-sm: 0 6px 20px rgba(0,0,0,0.03);
      --shadow-lg: 0 10px 40px rgba(0,0,0,0.04);
      --radius: 24px;
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
      max-width: 64rem;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

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
      font-size: 1.1rem;
      margin: 0;
    }

    /* Stats */
    .stats-strip {
      display: flex;
      align-items: center;
      background: var(--surface);
      padding: 1.25rem 2rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow-lg);
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
      color: var(--text-main);
      line-height: 1.2;
    }

    .stat-label {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
    }

    .stat-divider {
      width: 1px;
      height: 2.5rem;
      background-color: #f0f0f0;
    }

    /* Sections */
    .sections-layout {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .section-header {
      margin-bottom: 1.25rem;
    }

    .section-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-main);
      margin: 0 0 0.25rem;
    }

    .section-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
      margin: 0;
    }

    /* Cards */
    .master-control-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--surface);
      padding: 2rem 2.5rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow-lg);
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

    .segments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.25rem;
    }

    .segment-card {
      display: flex;
      flex-direction: column;
      background: var(--surface);
      padding: 1.75rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
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
      border-color: var(--border-active);
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
      color: var(--text-main);
    }

    .segment-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .segment-metrics {
      display: flex;
      justify-content: space-between;
      padding-top: 1.25rem;
      border-top: 1px solid var(--border-light);
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
      color: var(--text-light);
      font-weight: 600;
    }

    .s-metric strong {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-main);
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
      background: var(--brand-green);
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
      background: var(--surface);
      padding: 1.5rem 2.5rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow-lg);
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
      color: var(--text-muted);
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
      background: var(--brand-green);
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
      min-width: 200px;
    }

    .btn-primary:hover {
      background: var(--brand-green-hover);
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(97, 139, 47, 0.3);
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
      body { padding: 2rem 1rem; }
      .master-control-card { flex-direction: column; align-items: flex-start; gap: 1.5rem; padding: 1.5rem; }
      .stats-strip { flex-direction: column; gap: 1rem; align-items: center; text-align: center; }
      .stat-divider { width: 100%; height: 1px; }
      .action-footer { padding: 1.5rem; }
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
        <p class="page-subtitle">Gestiona la visibilidad de anuncios de forma global y por audiencias. Host: <code>${url.hostname}</code></p>
      </div>
      
      <div class="stats-strip">
        <div class="stat-item">
          <span class="stat-value">${stats.totalVisits}</span>
          <span class="stat-label">Visitas totales</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">${stats.totalEligible}</span>
          <span class="stat-label">Elegibles</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">${stats.totalRendered}</span>
          <span class="stat-label">Anuncios mostrados</span>
        </div>
      </div>
    </header>

    <form method="post" action="/ads" class="sections-layout">
      
      <!-- Control Maestro -->
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

      <!-- Audiencias -->
      <div>
        <div class="section-header">
          <h2 class="section-title">Audiencias</h2>
          <p class="section-desc">Selecciona qué grupos de usuarios podrán ver anuncios cuando el control maestro esté activo.</p>
        </div>
        <div class="segments-grid">
          ${segmentCardsHtml}
        </div>
      </div>

      <!-- Acciones y Presets -->
      <div class="action-footer">
        <div class="presets-group">
          <span class="presets-label">Acciones rápidas:</span>
          <button type="submit" name="preset" value="daycare-only" class="btn-preset">Solo Guardería</button>
          <button type="submit" name="preset" value="daycare-organic" class="btn-preset">Guardería + Orgánico</button>
          <button type="submit" name="preset" value="all-segments" class="btn-preset">Activar todos</button>
        </div>
        
        <button type="submit" name="action" value="save" class="btn-primary">
          Guardar Cambios
        </button>
      </div>

    </form>
  </div>
</body>
</html>`;

  setHeader(event, "Content-Type", "text/html; charset=utf-8");
  return html;
});