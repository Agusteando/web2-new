import { evaluateAdsForEvent } from "~/server/utils/ads";

export default defineEventHandler(async (event) => {
  const { decision } = await evaluateAdsForEvent(event);
  return decision;
});