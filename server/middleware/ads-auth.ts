import { defineEventHandler, getRequestHeader, getRequestURL } from 'h3'
import { assertAdsDashboardAccess, assertInternalDashboardAccess } from '~/server/utils/ads'

export default defineEventHandler(async (event) => {
  if (getRequestHeader(event, 'x-nitro-prerender')) {
    return
  }

  const url = getRequestURL(event)
  const isAdsControl =
    url.pathname.startsWith('/ads-dashboard') ||
    url.pathname.startsWith('/api/ads/dashboard') ||
    url.pathname === '/sitemap' ||
    url.pathname.startsWith('/api/sitemap/overrides')

  if (isAdsControl) {
    assertAdsDashboardAccess(event)
    return
  }

  const isSummerReviewAdmin =
    url.pathname === '/evaluaciones-curso-verano-2026' ||
    url.pathname.startsWith('/api/curso-verano/evaluaciones-admin') ||
    url.pathname.startsWith('/api/curso-verano/evaluaciones-export')

  if (isSummerReviewAdmin) {
    assertInternalDashboardAccess(event, 'IECS-IEDIS Evaluaciones')
  }
})
