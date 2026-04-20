import { defineEventHandler } from 'h3';
import { getAdConfig } from '~/server/utils/adsDb';

export default defineEventHandler(async () => {
  // Retorna únicamente el estado del "Control Maestro" para su prerenderización.
  try {
    const config = await getAdConfig();
    return { global_ads_enabled: config.global_ads_enabled === 1 };
  } catch (e) {
    return { global_ads_enabled: true };
  }
});