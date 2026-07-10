export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute()

  nuxtApp.hook('app:mounted', async () => {
    if (route.path !== '/') return

    try {
      // La portada contiene un payload vacío de prerender; se actualiza desde la API al hidratar.
      await refreshNuxtData()
    } catch (error) {
      console.error('[Noticias] No fue posible cargar las noticias en el navegador.', error)
    }
  })
})
