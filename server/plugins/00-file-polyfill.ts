export default defineNitroPlugin(async () => {
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