<template>
  <main class="blog-index">
    <section class="blog-hero">
      <div class="container blog-hero-inner">
        <div>
          <p class="blog-eyebrow">Blog IECS-IEDIS</p>
          <h1>Historias, ideas y experiencias de nuestra comunidad</h1>
        </div>
        <p class="blog-intro">
          Un espacio para compartir publicaciones, actividades y contenidos de los Institutos
          IECS-IEDIS desde una mirada más amplia.
        </p>
      </div>
    </section>

    <section class="container blog-content pb-100">
      <div v-if="pending" class="blog-state" aria-live="polite">Cargando publicaciones…</div>

      <div v-else-if="error" class="blog-state blog-state-error" role="alert">
        No fue posible cargar el Blog IECS-IEDIS en este momento.
      </div>

      <template v-else-if="posts.length">
        <article v-if="featuredPost" class="blog-featured">
          <NuxtLink :to="`/blog-iecs-iedis/${featuredPost.slug}`" class="blog-featured-media">
            <img
              :src="getBlogCover(featuredPost)"
              :alt="featuredPost.title"
              decoding="async"
              fetchpriority="high"
              @error="handleImageError"
            >
          </NuxtLink>

          <div class="blog-featured-copy">
            <p class="blog-kicker">
              <span v-if="featuredPost.category">{{ featuredPost.category }}</span>
              <time v-if="featuredPost.publishedAt" :datetime="toBlogIsoDate(featuredPost.publishedAt)">
                {{ formatBlogDate(featuredPost.publishedAt) }}
              </time>
            </p>
            <h2><NuxtLink :to="`/blog-iecs-iedis/${featuredPost.slug}`">{{ featuredPost.title }}</NuxtLink></h2>
            <p>{{ featuredPost.description }}</p>
            <NuxtLink :to="`/blog-iecs-iedis/${featuredPost.slug}`" class="blog-primary-link">
              Leer publicación <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </article>

        <AdSenseStrip placement="blog-index" />

        <div v-if="remainingPosts.length" class="blog-list-heading">
          <div>
            <p class="blog-eyebrow">Publicaciones recientes</p>
            <h2>Explora el Blog IECS-IEDIS</h2>
          </div>
          <p>{{ remainingPosts.length }} publicaciones disponibles</p>
        </div>

        <div v-if="remainingPosts.length" class="blog-grid">
          <article v-for="(post, index) in remainingPosts" :key="post.id || post.slug" class="blog-card">
            <NuxtLink :to="`/blog-iecs-iedis/${post.slug}`" class="blog-card-media">
              <img
                :src="getBlogCover(post, index + 1)"
                :alt="post.title"
                decoding="async"
                loading="lazy"
                @error="handleImageError"
              >
            </NuxtLink>
            <div class="blog-card-body">
              <p class="blog-kicker">
                <span v-if="post.category">{{ post.category }}</span>
                <time v-if="post.publishedAt" :datetime="toBlogIsoDate(post.publishedAt)">
                  {{ formatBlogDate(post.publishedAt) }}
                </time>
              </p>
              <h3><NuxtLink :to="`/blog-iecs-iedis/${post.slug}`">{{ post.title }}</NuxtLink></h3>
              <p>{{ post.description }}</p>
              <NuxtLink :to="`/blog-iecs-iedis/${post.slug}`" class="blog-secondary-link">Leer más</NuxtLink>
            </div>
          </article>
        </div>
      </template>

      <div v-else class="blog-state blog-state-empty">
        <p class="blog-eyebrow">Blog IECS-IEDIS</p>
        <h2>Estamos preparando este nuevo espacio.</h2>
        <p>Las primeras publicaciones aparecerán aquí cuando la fuente editorial esté conectada.</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { BlogFeed } from '~/utils/blog'
import {
  BLOG_FALLBACK_IMAGES,
  formatBlogDate,
  getBlogCover,
  toBlogIsoDate,
} from '~/utils/blog'

const runtimeConfig = useRuntimeConfig()
const siteUrl = String(runtimeConfig.public.siteUrl || 'https://casitaiedis.edu.mx').replace(/\/+$/, '')

const { data, pending, error } = await useFetch<BlogFeed & { count: number }>('/api/blog', {
  key: 'blog-iecs-iedis-index',
})

const posts = computed(() => data.value?.items || [])
const featuredPost = computed(() => posts.value.find((post) => post.featured) || posts.value[0] || null)
const remainingPosts = computed(() => posts.value.filter((post) => post.slug !== featuredPost.value?.slug))

const handleImageError = (event: Event) => {
  const image = event.currentTarget as HTMLImageElement | null
  if (!image || image.dataset.fallbackApplied === 'true') return
  image.dataset.fallbackApplied = 'true'
  image.src = BLOG_FALLBACK_IMAGES[0]
}

useSeoMeta({
  title: 'Blog IECS-IEDIS | Colegios IECS-IEDIS',
  description: 'Publicaciones, historias, experiencias y contenidos de la comunidad educativa IECS-IEDIS.',
  ogTitle: 'Blog IECS-IEDIS | Colegios IECS-IEDIS',
  ogDescription: 'Explora publicaciones, historias y experiencias de los Institutos IECS-IEDIS.',
  ogType: 'website',
  ogUrl: `${siteUrl}/blog-iecs-iedis`,
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/blog-iecs-iedis` }],
})
</script>

<style scoped>
.blog-index {
  min-height: 100vh;
  background: #f7faf9;
}

.blog-hero {
  padding: 88px 0 72px;
  background:
    radial-gradient(circle at 10% 15%, rgba(102, 168, 216, 0.22), transparent 34%),
    radial-gradient(circle at 90% 20%, rgba(142, 193, 82, 0.2), transparent 30%),
    #eef7f6;
}

.blog-hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.6fr);
  gap: 56px;
  align-items: end;
}

.blog-eyebrow {
  margin: 0 0 12px;
  color: #007f92;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.blog-hero h1,
.blog-state h2,
.blog-list-heading h2 {
  margin: 0;
  color: #151b1d;
  font-family: 'Fredoka', sans-serif;
}

.blog-hero h1 {
  max-width: 900px;
  font-size: clamp(3rem, 6.4vw, 6.2rem);
  line-height: 0.98;
  letter-spacing: -0.04em;
}

.blog-intro {
  margin: 0;
  color: #47565b;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.08rem;
  line-height: 1.75;
}

.blog-content {
  padding-top: 64px;
}

.blog-featured {
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(330px, 0.82fr);
  overflow: hidden;
  border: 1px solid #dce8e7;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0 24px 65px rgba(25, 67, 70, 0.09);
}

.blog-featured-media {
  min-height: 500px;
  overflow: hidden;
  background: #e8f0f0;
}

.blog-featured-media img,
.blog-card-media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.blog-featured:hover .blog-featured-media img,
.blog-card:hover .blog-card-media img {
  transform: scale(1.035);
}

.blog-featured-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(36px, 5vw, 70px);
}

.blog-kicker {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  margin: 0 0 18px;
  color: #617075;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.blog-kicker span {
  color: #618b2f;
}

.blog-featured-copy h2 {
  margin: 0 0 20px;
  font-family: 'Fredoka', sans-serif;
  font-size: clamp(2.25rem, 4vw, 4.25rem);
  line-height: 1.02;
}

.blog-featured-copy h2 a,
.blog-card h3 a {
  color: #172024;
}

.blog-featured-copy > p:not(.blog-kicker),
.blog-card-body > p:not(.blog-kicker),
.blog-state > p:not(.blog-eyebrow) {
  color: #526166;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.72;
}

.blog-primary-link,
.blog-secondary-link {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  color: #007f92;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 5px;
}

.blog-primary-link {
  margin-top: 12px;
  gap: 8px;
}

.blog-list-heading {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: end;
  margin: 24px 0 30px;
}

.blog-list-heading h2 {
  font-size: clamp(2.2rem, 4vw, 3.8rem);
}

.blog-list-heading > p {
  margin: 0 0 5px;
  color: #64748b;
  font-family: 'Montserrat', sans-serif;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
}

.blog-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e0e8e8;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 16px 42px rgba(25, 67, 70, 0.06);
}

.blog-card-media {
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #e8f0f0;
}

.blog-card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 26px;
}

.blog-card h3 {
  margin: 0 0 14px;
  font-family: 'Fredoka', sans-serif;
  font-size: 1.85rem;
  line-height: 1.12;
}

.blog-card-body > p:not(.blog-kicker) {
  margin: 0 0 22px;
}

.blog-secondary-link {
  margin-top: auto;
}

.blog-state {
  padding: 70px 30px;
  border: 1px solid #dfe9e8;
  border-radius: 28px;
  background: #fff;
  text-align: center;
}

.blog-state h2 {
  font-size: clamp(2rem, 4vw, 3.6rem);
}

.blog-state > p:not(.blog-eyebrow) {
  max-width: 650px;
  margin: 18px auto 0;
}

.blog-state-error {
  color: #8a1c1c;
  background: #fff4f4;
}

@media (max-width: 991px) {
  .blog-hero-inner,
  .blog-featured {
    grid-template-columns: 1fr;
  }

  .blog-featured-media {
    min-height: 0;
    aspect-ratio: 16 / 9;
  }

  .blog-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .blog-hero {
    padding: 58px 0 50px;
  }

  .blog-hero-inner {
    gap: 24px;
  }

  .blog-content {
    padding-top: 42px;
  }

  .blog-grid {
    grid-template-columns: 1fr;
  }

  .blog-list-heading {
    display: block;
  }

  .blog-list-heading > p {
    margin-top: 10px;
  }
}
</style>
