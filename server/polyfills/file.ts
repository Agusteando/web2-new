// server/polyfills/file.ts
import { Blob } from 'buffer'

// Minimal File polyfill for Node 18 (Windows)
if (typeof globalThis.File === 'undefined') {
  globalThis.File = class File extends Blob {
    name: string
    lastModified: number

    constructor(parts: any[], name: string, options: any = {}) {
      super(parts, options)
      this.name = name
      this.lastModified = options.lastModified ?? Date.now()
    }
  } as any
}
