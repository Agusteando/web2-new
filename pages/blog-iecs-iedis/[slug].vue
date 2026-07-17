<template>
  <main class="blog-detail">
    <article v-if="post" class="container blog-article pt-70 pb-100">
      <NuxtLink to="/blog-iecs-iedis" class="blog-back">← Blog IECS-IEDIS</NuxtLink>

      <header class="blog-header">
        <p class="blog-kicker">
          <span v-if="post.category">{{ post.category }}</span>
          <time v-if="post.publishedAt" :datetime="publishedIso">{{ formatBlogDate(post.publishedAt) }}</time>
        </p>
        <h1>{{ post.title }}</h1>
        <p v-if="post.description" class="blog-description">{{ post.description }}</p>
        <p class="blog-author">Por {{ post.author }}</p>
      </header>

      <img
        :src="coverImage"
        :alt="post.title"
        class="blog-cover"
        decoding="async"
        fetchpriority="high"
        @error="handleImageError"
      >

      <div class="blog-body">
        <p v-if="post.content" class="blog-content-text">{{ post.content }}</p>
        <p v-else>{{ post.description }}</p>
      </div>

      <div v-if="galleryImages.length" class="blog-gallery" aria-label="Galería de imágenes">
        <figure v-for="(image, index) in galleryImages" :key="`${image}-${index}`">
          <img
            :src="image"
            :alt="`${post.title}, imagen ${index + 2}`"
            decoding="async"
            loading="lazy"
            @error="handleImageError"
          >
        </figure>
      </div>

      <AdSenseStrip placement="article-footer" />

      <section v-if="relatedPosts.length" class="blog-related">
        <div class="blog-related-heading">
          <p>Continúa explorando</p>
          <h2>Más del Blog IECS-IEDIS</h2>
        </div>
        <div class="blog-related-grid">
          <article v-for="(related, index) in relatedPosts" :key="related.slug" class="blog-related-card">
            <NuxtLink :to="`/blog-iecs-iedis/${related.slug}`">
              <img
                :src="getBlogCover(related, index + 1)"
                :alt="related.title"
                decoding="async"
                loading="lazy"
                @error="handleImageError"
              >
              <span>{{ related.title }}</span>
            </NuxtLink>
          </article>
        </div>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import type { BlogFeed, BlogPost } from '~/utils/blog'
import {
  BLOG_FALLBACK_IMAGES,
  formatBlogDate,
  getBlogCover,
  normalizeBlogImage,
  toBlogIsoDate,
} from '~/utils/blog'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const siteUrl = String(runtimeConfig.public.siteUrl || 'https://casitaiedis.edu.mx').replace(/\/+$/, '')
const slug = String(route.params.slug || '')

const { data: post, error } = await useFetch<BlogPost>(`/api/blog/${encodeURIComponent(slug)}`, {
  key: `blog-iecs-iedis-${slug}`,
})

if (error.value || !post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Publicación no encontrada' })
}

const { data: feed } = await useFetch<BlogFeed & { count: number }>('/api/blog', {
  key: 'blog-iecs-iedis-related',
  query: { limit: 5 },
})

const canonicalUrl = computed(() => `${siteUrl}/blog-iecs-iedis/${post.value?.slug || slug}`)
const publishedIso = computed(() => toBlogIsoDate(post.value?.publishedAt))
const coverImage = computed(() => getBlogCover(post.value))
const galleryImages = computed(() => {
  const cover = coverImage.value
  return Array.from(new Set((post.value?.images || [])
    .map((image) => normalizeBlogImage(image))
    .filter((image): image is string => Boolean(image) && image !== cover)))
})
const relatedPosts = computed(() => (feed.value?.items || [])
  .filter((candidate) => candidate.slug !== post.value?.slug)
  .slice(0, 3))

const handleImageError = (event: Event) => {
  const image = event.currentTarget as HTMLImageElement | null
  if (!image || image.dataset.fallbackApplied === 'true') return
  image.dataset.fallbackApplied = 'true'
  image.src = BLOG_FALLBACK_IMAGES[0]
}

useSeoMeta(() => ({
  title: `${post.value?.title} | Blog IECS-IEDIS`,
  description: post.value?.description,
  ogTitle: post.value?.title,
  ogDescription: post.value?.description,
  ogType: 'article',
  ogUrl: canonicalUrl.value,
  ogImage: coverImage.value,
  articlePublishedTime: publishedIso.value,
  articleModifiedTime: toBlogIsoDate(post.value?.updatedAt),
  twitterCard: 'summary_large_image',
}))

useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.value?.title,
      description: post.value?.description,
      datePublished: publishedIso.value,
      dateModified: toBlogIsoDate(post.value?.updatedAt) || publishedIso.value,
      image: [coverImage.value, ...galleryImages.value],
      mainEntityOfPage: canonicalUrl.value,
      author: {
        '@type': 'Organization',
        name: post.value?.author || 'Equipo IECS-IEDIS',
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
.blog-detail {
  min-height: 100vh;
  background: #f7faf9;
}

.blog-article {
  max-width: 1120px;
}

.blog-back {
  display: inline-flex;
  color: #007f92;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 5px;
}

.blog-header {
  max-width: 960px;
  margin: 38px 0 36px;
}

.blog-kicker {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  margin: 0 0 18px;
  color: #66757a;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.blog-kicker span {
  color: #618b2f;
}

.blog-header h1 {
  margin: 0;
  color: #141b1e;
  font-family: 'Fredoka', sans-serif;
  font-size: clamp(3rem, 7vw, 6.4rem);
  line-height: 0.98;
  letter-spacing: -0.04em;
}

.blog-description {
  max-width: 820px;
  margin: 26px 0 0;
  color: #4e5d62;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.22rem;
  line-height: 1.72;
}

.blog-author {
  margin: 18px 0 0;
  color: #66757a;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.blog-cover {
  display: block;
  width: 100%;
  max-height: 680px;
  object-fit: cover;
  border-radius: 30px;
  background: #e8f0f0;
  box-shadow: 0 25px 65px rgba(25, 67, 70, 0.11);
}

.blog-body {
  max-width: 820px;
  margin: 52px auto 0;
  color: #273438;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  line-height: 1.9;
}

.blog-content-text {
  margin: 0;
  white-space: pre-line;
}

.blog-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  margin-top: 52px;
}

.blog-gallery figure {
  margin: 0;
  overflow: hidden;
  border-radius: 22px;
  background: #e8f0f0;
}

.blog-gallery img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
}

.blog-related {
  margin-top: 70px;
  padding-top: 44px;
  border-top: 1px solid #dce7e7;
}

.blog-related-heading p {
  margin: 0 0 8px;
  color: #007f92;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.blog-related-heading h2 {
  margin: 0 0 28px;
  color: #151b1d;
  font-family: 'Fredoka', sans-serif;
  font-size: clamp(2.25rem, 4vw, 3.8rem);
}

.blog-related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.blog-related-card {
  overflow: hidden;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 14px 36px rgba(25, 67, 70, 0.07);
}

.blog-related-card a {
  display: flex;
  height: 100%;
  flex-direction: column;
  color: #172024;
}

.blog-related-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  background: #e8f0f0;
}

.blog-related-card span {
  padding: 22px;
  font-family: 'Fredoka', sans-serif;
  font-size: 1.55rem;
  line-height: 1.14;
}

@media (max-width: 767px) {
  .blog-article {
    padding-left: 20px;
    padding-right: 20px;
  }

  .blog-body {
    margin-top: 38px;
    font-size: 1rem;
  }

  .blog-gallery,
  .blog-related-grid {
    grid-template-columns: 1fr;
  }

  .blog-gallery img {
    min-height: 0;
    aspect-ratio: 4 / 3;
  }
}
</style>
