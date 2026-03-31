import { defineEventHandler } from "h3";
import { getAdConfig, getAdDashboardStats } from "~/server/utils/adsDb";

export default defineEventHandler(async () => {
  // Authentication is handled automatically by server/middleware/ads-auth.ts
  const config = await getAdConfig();
  const stats = await getAdDashboardStats();
  
  return { config, stats };
});