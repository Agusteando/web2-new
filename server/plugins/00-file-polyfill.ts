export default defineNitroPlugin(async () => {
  if (typeof (globalThis as any).File === 'undefined') {
    // undici ships a File implementation; make it available globally
    const { File } = await import('undici')
    ;(globalThis as any).File = File
  }
})
