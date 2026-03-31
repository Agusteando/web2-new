export default defineNitroPlugin(async () => {
  // Reemplazado undici por la API nativa de Node:buffer para evitar errores de importación en Vite
  if (typeof globalThis.File === 'undefined') {
    try {
      const { Blob } = await import('node:buffer')
      ;(globalThis as any).File = class File extends Blob {
        name: string
        lastModified: number
        constructor(fileBits: any[], fileName: string, options: any = {}) {
          super(fileBits, options)
          this.name = fileName
          this.lastModified = options.lastModified || Date.now()
        }
      }
    } catch (e) {
      console.warn('[polyfill] Native Blob fallback failed:', e)
    }
  }
})