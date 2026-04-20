import { defineEventHandler } from "h3";

export default defineEventHandler(() => {
  // DEPRECATED: Eliminado para reducir a 0 el uso de Serverless Functions en Vercel Free Tier.
  // La lógica de evaluación y despliegue fue migrada completamente al cliente en `AdSenseStrip.vue`.
  return { adsEligible: false, adsRendered: false };
});