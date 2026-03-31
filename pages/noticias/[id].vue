<template>
  <main>
    <div class="container pt-80 pb-80">
      <NuxtLink to="/" class="tp-btn-md tp-bg-theme-1 tp-left-right p-relative hover-text-white d-inline-block tp-text-grey-5 lh-1 fs-16 fw-700 tp-ff-dm mb-30">
        <span class="mr10 td-text d-inline-block mr-5">← Volver</span>
      </NuxtLink>

      <h1 class="tp-ff-familjen tp-text-common-black-5">{{ noticia?.titulo }}</h1>
      <p class="tp-ff-dm tp-text-grey-7">{{ formattedDate }}</p>
      <img v-if="normalizedImg" :src="normalizedImg" alt="" style="max-width:100%;border-radius:16px;margin:20px 0;">
      <div class="tp-ff-dm tp-text-common-black-6 content-rich" v-html="noticia?.contenido"></div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const { data: noticia, error } = await useFetch(`/api/noticias/${route.params.id}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Noticia no encontrada' })
}

const formattedDate = computed(() => {
  if (!noticia.value?.fecha) return ''
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(new Date(noticia.value.fecha))
})

const normalizedImg = computed(() => {
  const img = noticia.value?.imagen
  if (!img) return null
  return /^https?:\/\//i.test(img) ? img : (img.startsWith('/') ? img : `/${img}`)
})

useHead({
  title: `${noticia.value?.titulo} | Colegios IECS-IEDIS`
})
</script>

<style scoped>
.content-rich {
  white-space: pre-wrap;
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>