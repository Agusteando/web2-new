import { rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'

export default defineNitroPlugin(() => {
  // Este plugin se encarga de purgar automáticamente las rutas del backend antiguo
  // que secuestran las peticiones y causan las respuestas de 0 bytes o errores 404.
  const filesToDelete = [
    'server/routes/index.get.ts',
    'server/routes/index.html.get.ts',
    'server/routes/legacy-index.get.ts',
    'server/routes/__diag.get.ts',
    'server/routes/[page].get.ts',
    'server/routes/[page].html.get.ts',
    'server/middleware/legacy-html.ts',
    'server/routes/virtual/[blob].get.ts',
    'public/legacy'
  ]

  let cleaned = false
  for (const file of filesToDelete) {
    const fullPath = join(process.cwd(), file)
    if (existsSync(fullPath)) {
      try {
        rmSync(fullPath, { recursive: true, force: true })
        console.log(`🧹 [Auto-Cleanup] Eliminado interceptor/archivo legacy que bloqueaba Vue: ${file}`)
        cleaned = true
      } catch (e) {
        console.error(`⚠️ [Auto-Cleanup] No se pudo eliminar ${file}. Por favor, bórralo manualmente.`, e)
      }
    }
  }

  if (cleaned) {
    console.log('✅ Limpieza completada. El servidor se auto-recargará para liberar las rutas de Vue.')
  }
})