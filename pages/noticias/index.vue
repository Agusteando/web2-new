<template>
  <main class="news-index">
    <section class="news-hero">
      <div class="container">
        <p class="news-eyebrow">Comunidad IECS-IEDIS</p>
        <h1>Noticias y vida escolar</h1>
        <p class="news-intro">
          Información institucional dirigida a madres, padres y tutores: actividades, proyectos,
          logros y momentos relevantes de nuestra comunidad educativa.
        </p>
      </div>
    </section>

    <section class="container news-content pb-100">
      <div v-if="pending" class="news-state" aria-live="polite">Cargando noticias…</div>

      <div v-else-if="error" class="news-state news-state-error" role="alert">
        No fue posible cargar las noticias en este momento.
      </div>

      <template v-else-if="noticias?.length">
        <div class="news-grid">
          <article v-for="noticia in firstNoticias" :key="noticia.id" class="news-card">
            <NuxtLink :to="`/noticias/${noticia.id}`" class="news-card-image-link" :aria-label="`Leer ${noticia.titulo}`">
              <img
                :src="resolveImage(noticia.imagen, noticia.id)"
                :alt="noticia.titulo"
                class="news-card-image"
                decoding="async"
                loading="lazy"
              >
            </NuxtLink>
            <div class="news-card-body">
              <time :datetime="toIsoDate(noticia.fecha)">{{ formatNewsDate(noticia.fecha) }}</time>
              <h2><NuxtLink :to="`/noticias/${noticia.id}`">{{ noticia.titulo }}</NuxtLink></h2>
              <p>{{ getNewsExcerpt(noticia.contenido) }}</p>
              <NuxtLink :to="`/noticias/${noticia.id}`" class="news-read-more">Leer noticia</NuxtLink>
            </div>
          </article>
        </div>

        <AdSenseStrip placement="news-index" />

        <div v-if="remainingNoticias.length" class="news-grid news-grid-secondary">
          <article v-for="noticia in remainingNoticias" :key="noticia.id" class="news-card">
            <NuxtLink :to="`/noticias/${noticia.id}`" class="news-card-image-link" :aria-label="`Leer ${noticia.titulo}`">
              <img
                :src="resolveImage(noticia.imagen, noticia.id)"
                :alt="noticia.titulo"
                class="news-card-image"
                decoding="async"
                loading="lazy"
              >
            </NuxtLink>
            <div class="news-card-body">
              <time :datetime="toIsoDate(noticia.fecha)">{{ formatNewsDate(noticia.fecha) }}</time>
              <h2><NuxtLink :to="`/noticias/${noticia.id}`">{{ noticia.titulo }}</NuxtLink></h2>
              <p>{{ getNewsExcerpt(noticia.contenido) }}</p>
              <NuxtLink :to="`/noticias/${noticia.id}`" class="news-read-more">Leer noticia</NuxtLink>
            </div>
          </article>
        </div>
      </template>

      <div v-else class="news-state">
        Próximamente publicaremos nuevas actividades y comunicados de la comunidad IECS-IEDIS.
      </div>
    </section>
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

const runtimeConfig = useRuntimeConfig()
const siteUrl = String(runtimeConfig.public.siteUrl || 'https://casitaiedis.edu.mx').replace(/\/+$/, '')

const { data: noticias, pending, error } = await useFetch<PublicNoticia[]>('/api/noticias', {
  key: 'public-news-index',
})

const firstNoticias = computed(() => (noticias.value || []).slice(0, 3))
const remainingNoticias = computed(() => (noticias.value || []).slice(3))

const fallbacks = [
  '/assets/img/IECS-IEDIS IMAGES/ex-news-578x433.webp',
  '/assets/img/IECS-IEDIS IMAGES/ex-news2-578x433.webp',
  '/assets/img/IECS-IEDIS IMAGES/ex-news3-578x433.webp',
]

const resolveImage = (image: string | null, id: number) => {
  return normalizeNewsImage(image) || fallbacks[Math.abs(id) % fallbacks.length]
}

useSeoMeta({
  title: 'Noticias y vida escolar | Colegios IECS-IEDIS',
  description: 'Noticias, actividades, proyectos y logros de la comunidad educativa IECS-IEDIS para madres, padres y tutores.',
  ogTitle: 'Noticias y vida escolar | Colegios IECS-IEDIS',
  ogDescription: 'Conoce las actividades, proyectos y logros de la comunidad educativa IECS-IEDIS.',
  ogType: 'website',
  ogUrl: `${siteUrl}/noticias`,
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/noticias` }],
})
</script>

<style scoped>
.news-index {
  background: #f8fbfb;
  min-height: 100vh;
}

.news-hero {
  padding: 80px 0 60px;
  text-align: center;
  background: linear-gradient(180deg, #eaf7f8 0%, #f8fbfb 100%);
}

.news-eyebrow {
  margin: 0 0 12px;
  color: #007f92;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.news-hero h1 {
  margin: 0;
  color: #141414;
  font-family: 'Fredoka', sans-serif;
  font-size: clamp(2.6rem, 6vw, 5rem);
  line-height: 1;
}

.news-intro {
  max-width: 760px;
  margin: 24px auto 0;
  color: #4b5563;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.08rem;
  line-height: 1.75;
}

.news-content {
  padding-top: 56px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
}

.news-grid-secondary {
  margin-top: 24px;
}

.news-card {
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 18px 45px rgba(16, 57, 62, 0.07);
}

.news-card-image-link {
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #eaf3f4;
}

.news-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.news-card:hover .news-card-image {
  transform: scale(1.035);
}

.news-card-body {
  padding: 26px;
}

.news-card time {
  display: block;
  margin-bottom: 12px;
  color: #64748b;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.88rem;
}

.news-card h2 {
  margin: 0 0 14px;
  font-family: 'Fredoka', sans-serif;
  font-size: 1.75rem;
  line-height: 1.15;
}

.news-card h2 a {
  color: #182022;
}

.news-card p {
  margin: 0 0 20px;
  color: #536066;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.65;
}

.news-read-more {
  color: #007f92;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.news-state {
  padding: 48px 28px;
  border-radius: 20px;
  background: #fff;
  color: #4b5563;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}

.news-state-error {
  color: #8a1c1c;
  background: #fff4f4;
}

@media (max-width: 991px) {
  .news-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .news-hero {
    padding: 56px 0 44px;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }

  .news-card-body {
    padding: 22px;
  }
}
</style>
