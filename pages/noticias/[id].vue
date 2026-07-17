<template>
  <main class="news-detail">
    <article v-if="noticia" class="container news-article pt-70 pb-100">
      <NuxtLink to="/noticias" class="news-back">← Todas las noticias</NuxtLink>

      <header class="news-header">
        <p class="news-audience">Información para madres, padres y tutores</p>
        <h1>{{ noticia.titulo }}</h1>
        <div class="news-meta">
          <time :datetime="publishedIso">{{ formattedDate }}</time>
          <span aria-hidden="true">•</span>
          <span>Equipo IECS-IEDIS</span>
        </div>
      </header>

      <img
        v-if="normalizedImg"
        :src="normalizedImg"
        :alt="noticia.titulo"
        class="news-cover"
        decoding="async"
      >

      <div class="news-body content-rich" v-html="noticia.contenido"></div>

      <AdSenseStrip placement="article-footer" />

      <footer class="news-article-footer">
        <NuxtLink to="/noticias" class="news-back">Ver más noticias</NuxtLink>
      </footer>
    </article>
  </main>
</template>

<script setup lang="ts">
import type { PublicNoticia } from '~/utils/noticias'
import {
  formatNewsDate,
  getNewsExcerpt,
  normalizeNewsImage,
  toIsoDate,
} from '~/utils/noticias'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const siteUrl = String(runtimeConfig.public.siteUrl || 'https://casitaiedis.edu.mx').replace(/\/+$/, '')
const canonicalUrl = computed(() => `${siteUrl}/noticias/${route.params.id}`)

const { data: noticia, error } = await useFetch<PublicNoticia>(`/api/noticias/${route.params.id}`, {
  key: `public-news-${route.params.id}`,
})

if (error.value || !noticia.value) {
  throw createError({ statusCode: 404, statusMessage: 'Noticia no encontrada' })
}

const formattedDate = computed(() => formatNewsDate(noticia.value?.fecha))
const publishedIso = computed(() => toIsoDate(noticia.value?.fecha))
const normalizedImg = computed(() => normalizeNewsImage(noticia.value?.imagen))
const description = computed(() => getNewsExcerpt(noticia.value?.contenido, 160))

useSeoMeta(() => ({
  title: `${noticia.value?.titulo} | Colegios IECS-IEDIS`,
  description: description.value,
  ogTitle: noticia.value?.titulo,
  ogDescription: description.value,
  ogType: 'article',
  ogUrl: canonicalUrl.value,
  ogImage: normalizedImg.value || undefined,
  articlePublishedTime: publishedIso.value,
  twitterCard: normalizedImg.value ? 'summary_large_image' : 'summary',
}))

useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: noticia.value?.titulo,
      datePublished: publishedIso.value,
      dateModified: publishedIso.value,
      description: description.value,
      image: normalizedImg.value ? [normalizedImg.value] : undefined,
      mainEntityOfPage: canonicalUrl.value,
      author: {
        '@type': 'Organization',
        name: 'Colegios IECS-IEDIS',
        url: siteUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Colegios IECS-IEDIS',
        url: siteUrl,
      },
    }),
  }],
}))
</script>

<style scoped>
.news-detail {
  min-height: 100vh;
  background: #f8fbfb;
}

.news-article {
  max-width: 980px;
}

.news-back {
  display: inline-flex;
  color: #007f92;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.news-header {
  max-width: 860px;
  margin: 36px 0 32px;
}

.news-audience {
  margin: 0 0 12px;
  color: #618b2f;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.news-header h1 {
  margin: 0;
  color: #141414;
  font-family: 'Fredoka', sans-serif;
  font-size: clamp(2.6rem, 6vw, 5rem);
  line-height: 1.02;
}

.news-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
  color: #657177;
  font-family: 'Montserrat', sans-serif;
}

.news-cover {
  width: 100%;
  max-height: 620px;
  object-fit: cover;
  border-radius: 26px;
  box-shadow: 0 24px 60px rgba(16, 57, 62, 0.12);
}

.news-body {
  max-width: 820px;
  margin: 48px auto 0;
  color: #273237;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.08rem;
  line-height: 1.85;
}

.content-rich :deep(p),
.content-rich :deep(ul),
.content-rich :deep(ol),
.content-rich :deep(blockquote) {
  margin-bottom: 1.35em;
}

.content-rich :deep(h2),
.content-rich :deep(h3),
.content-rich :deep(h4) {
  margin: 1.6em 0 0.65em;
  color: #141414;
  font-family: 'Fredoka', sans-serif;
}

.content-rich :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 18px;
}

.content-rich :deep(a) {
  color: #007f92;
  text-decoration: underline;
}

.news-article-footer {
  max-width: 820px;
  margin: 28px auto 0;
  padding-top: 28px;
  border-top: 1px solid #dce5e7;
}

@media (max-width: 767px) {
  .news-article {
    padding-left: 20px;
    padding-right: 20px;
  }

  .news-body {
    margin-top: 34px;
    font-size: 1rem;
  }
}
</style>
