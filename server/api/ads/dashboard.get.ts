import { defineEventHandler, getQuery } from "h3";
import { getAdConfig, getAdDashboardStats } from "~/server/utils/adsDb";

export default defineEventHandler(async (event) => {
  // Authentication is handled automatically by server/middleware/ads-auth.ts
  const q = getQuery(event);
  const filter = (q.filter as string) || '30d';

  const config = await getAdConfig();
  const stats = await getAdDashboardStats(filter);
  
  return { config, stats };
});