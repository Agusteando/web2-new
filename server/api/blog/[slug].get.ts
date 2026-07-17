import { createError } from 'h3'
import { fetchBlogPostBySlug } from '~/server/utils/blog'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || ''
  const post = await fetchBlogPostBySlug(slug)

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Publicación no encontrada' })
  }

  return post
})
