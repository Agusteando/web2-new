import { defineEventHandler, readBody } from "h3";
import { updateAdConfig } from "~/server/utils/adsDb";

export default defineEventHandler(async (event) => {
  // Authentication is handled automatically by server/middleware/ads-auth.ts
  const body = await readBody(event);
  
  if (!body) return { success: false, message: 'Invalid payload' };

  await updateAdConfig({
    global_ads_enabled: !!body.global_ads_enabled,
    ads_for_internal: !!body.ads_for_internal,
    ads_for_premium: !!body.ads_for_premium,
    ads_for_daycare: !!body.ads_for_daycare,
    ads_for_organic: !!body.ads_for_organic
  });

  return { success: true };
});