import type { RowDataPacket } from "mysql2/promise";
import { getDbPool } from "./db";
import type { UserSegment } from "./adsTypes";

export type AdConfigRow = {
  id: number;
  global_ads_enabled: number;
  ads_for_internal: number;
  ads_for_premium: number;
  ads_for_daycare: number;
  ads_for_organic: number;
  rollout_percentage: number;
  updated_at: Date | string;
};

export interface AdDashboardSegmentRow {
  user_segment: UserSegment;
  visits: number;
  eligible: number;
  rendered: number;
}

export interface AdDashboardRouteRow {
  route: string;
  visits: number;
  rendered: number;
}

export interface AdDashboardStats {
  todayVisits: number;
  totalVisits: number;
  totalEligible: number;
  totalRendered: number;
  bySegment: AdDashboardSegmentRow[];
  topRoutes: AdDashboardRouteRow[];
  maxRouteVisits: number;
}

const AD_CONFIG_ID = 1;

/**
 * Load the single control-plane row from ad_config.
 */
export async function getAdConfig(): Promise<AdConfigRow> {
  const pool = getDbPool();

  const [rows] = await pool.query<RowDataPacket[]>(
    `
      SELECT
        id,
        global_ads_enabled,
        ads_for_internal,
        ads_for_premium,
        ads_for_daycare,
        ads_for_organic,
        rollout_percentage,
        updated_at
      FROM ad_config
      WHERE id = ?
      LIMIT 1
    `,
    [AD_CONFIG_ID]
  );

  if (rows.length > 0) {
    return rows[0] as unknown as AdConfigRow;
  }

  await pool.query("INSERT IGNORE INTO ad_config (id) VALUES (?)", [AD_CONFIG_ID]);

  const [rowsAfterInsert] = await pool.query<RowDataPacket[]>(
    `
      SELECT
        id,
        global_ads_enabled,
        ads_for_internal,
        ads_for_premium,
        ads_for_daycare,
        ads_for_organic,
        rollout_percentage,
        updated_at
      FROM ad_config
      WHERE id = ?
      LIMIT 1
    `,
    [AD_CONFIG_ID]
  );

  if (!rowsAfterInsert.length) {
    throw new Error("ad_config seed row could not be created or loaded");
  }

  return rowsAfterInsert[0] as unknown as AdConfigRow;
}

/**
 * Patch the ad_config control-plane row with the provided fields.
 */
export async function updateAdConfig(partial: {
  global_ads_enabled?: boolean;
  ads_for_internal?: boolean;
  ads_for_premium?: boolean;
  ads_for_daycare?: boolean;
  ads_for_organic?: boolean;
}): Promise<void> {
  const pool = getDbPool();

  const sets: string[] = [];
  const values: Array<string | number> = [];

  if (typeof partial.global_ads_enabled === "boolean") {
    sets.push("global_ads_enabled = ?");
    values.push(partial.global_ads_enabled ? 1 : 0);
  }

  if (typeof partial.ads_for_internal === "boolean") {
    sets.push("ads_for_internal = ?");
    values.push(partial.ads_for_internal ? 1 : 0);
  }

  if (typeof partial.ads_for_premium === "boolean") {
    sets.push("ads_for_premium = ?");
    values.push(partial.ads_for_premium ? 1 : 0);
  }

  if (typeof partial.ads_for_daycare === "boolean") {
    sets.push("ads_for_daycare = ?");
    values.push(partial.ads_for_daycare ? 1 : 0);
  }

  if (typeof partial.ads_for_organic === "boolean") {
    sets.push("ads_for_organic = ?");
    values.push(partial.ads_for_organic ? 1 : 0);
  }

  if (!sets.length) {
    return;
  }

  values.push(AD_CONFIG_ID);

  const sql = `
    UPDATE ad_config
    SET ${sets.join(", ")}
    WHERE id = ?
  `;

  await pool.query(sql, values);
}

/**
 * Insert a single ad_visits row for auditing and metrics.
 */
export async function insertAdVisit(opts: {
  visitorId: string;
  userSegment: UserSegment;
  adsEligible: boolean;
  adsRendered: boolean;
  route?: string;
}): Promise<void> {
  const pool = getDbPool();

  const adsEligibleInt = opts.adsEligible ? 1 : 0;
  const adsRenderedInt = opts.adsRendered ? 1 : 0;

  const sql = `
    INSERT INTO ad_visits (visitor_id, user_segment, ads_eligible, ads_rendered, route)
    VALUES (?, ?, ?, ?, ?)
  `;
  await pool.query(sql, [opts.visitorId, opts.userSegment, adsEligibleInt, adsRenderedInt, opts.route || '/']);
}

/**
 * Aggregate core stats for the /ads dashboard.
 */
export async function getAdDashboardStats(filter: string = '30d'): Promise<AdDashboardStats> {
  const pool = getDbPool();

  let dateCondition = "";
  if (filter === 'today') dateCondition = "WHERE DATE(created_at) = CURDATE()";
  else if (filter === '7d') dateCondition = "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
  else if (filter === '30d') dateCondition = "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)";

  const [summaryRows] = await pool.query<RowDataPacket[]>(`
    SELECT
      COUNT(*) AS total_visits,
      COALESCE(SUM(ads_eligible), 0) AS total_eligible,
      COALESCE(SUM(ads_rendered), 0) AS total_rendered
    FROM ad_visits
    ${dateCondition}
  `);
  const summaryRow = summaryRows[0] || {};

  const [segmentRows] = await pool.query<RowDataPacket[]>(`
    SELECT
      user_segment,
      COUNT(*) AS visits,
      COALESCE(SUM(ads_eligible), 0) AS eligible,
      COALESCE(SUM(ads_rendered), 0) AS rendered
    FROM ad_visits
    ${dateCondition}
    GROUP BY user_segment
    ORDER BY visits DESC
  `);

  let todayVisits = 0;
  let topRoutes: AdDashboardRouteRow[] = [];
  let maxRouteVisits = 1;

  const [todayRows] = await pool.query<RowDataPacket[]>(`
    SELECT COUNT(*) as c FROM ad_visits WHERE DATE(created_at) = CURDATE()
  `);
  todayVisits = Number(todayRows[0]?.c || 0);

  const [routeRows] = await pool.query<RowDataPacket[]>(`
    SELECT route, COUNT(*) as visits, COALESCE(SUM(ads_rendered),0) as rendered
    FROM ad_visits
    ${dateCondition}
    GROUP BY route
    ORDER BY visits DESC
    LIMIT 12
  `);
  topRoutes = routeRows as AdDashboardRouteRow[];
  
  if (topRoutes.length > 0) {
    maxRouteVisits = Math.max(...topRoutes.map(r => Number(r.visits)));
  }

  const bySegment: AdDashboardSegmentRow[] = segmentRows.map(
    (r) =>
      ({
        user_segment: r.user_segment as UserSegment,
        visits: Number(r.visits ?? 0),
        eligible: Number(r.eligible ?? 0),
        rendered: Number(r.rendered ?? 0),
      } as AdDashboardSegmentRow)
  );

  return {
    todayVisits,
    totalVisits: Number(summaryRow.total_visits ?? 0),
    totalEligible: Number(summaryRow.total_eligible ?? 0),
    totalRendered: Number(summaryRow.total_rendered ?? 0),
    bySegment,
    topRoutes,
    maxRouteVisits
  };
}