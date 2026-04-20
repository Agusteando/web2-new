import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  // Eliminado. 
  // Ahora la limpieza y normalización de URLs (strip HTML) es manejada nativamente 
  // en la CDN de Vercel usando "cleanUrls": true dentro del archivo vercel.json.
  // Esto evita un consumo innecesario de funciones Serverless.
})