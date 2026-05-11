const isProd = process.env.NODE_ENV === 'production'
// Detección automática del entorno Vercel para forzar SSG puro
const isVercel = !!process.env.VERCEL || process.env.VERCEL_ENV !== undefined

export default defineNuxtConfig({
  ssr: true,
  pages: true,

  compatibilityDate: '2025-12-13',

  routeRules: isVercel ? {
    // Static prerender on Vercel. Static files still count as Edge Requests,
    // so we also reduce the number of browser requests and make cache behavior explicit.
    '/**': { prerender: true },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/assets/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=2592000' } },
    '/img/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=2592000' } }
  } : {
    // En PM2/IIS: Mantiene el servidor Node nativo, las APIs dinámicas y los proxies transparentes
    '/**': { prerender: true },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/assets/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=2592000' } },
    '/img/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=2592000' } },
    '/api/**': { cors: true, prerender: false },
    '/ads-dashboard': { ssr: false, prerender: false },
    '/sitemap': { ssr: false, prerender: false },
    '/virtual/**': { proxy: 'https://admin.casitaiedis.edu.mx/virtual/**' },
    '/signatures/**': { proxy: 'https://admin.casitaiedis.edu.mx/signatures/**' }
  },

  experimental: {
    defaults: {
      nuxtLink: {
        prefetch: false,
        prefetchOn: { visibility: false, interaction: false }
      }
    }
  },

  vue: {
    compilerOptions: {
      // Evita advertencias en consola sobre Web Components nativos del theme
      isCustomElement: (tag) => tag.startsWith('ion-') || tag.startsWith('atropos-')
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      bodyAttrs: { class: 'tp-magic-cursor loaded' },
      title: 'Colegios IECS-IEDIS',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Institutos IECS-IEDIS: educación integral y valores desde 1993. Ofrecemos programas educativos en guardería, preescolar, primaria y secundaria en 5 campus del Estado de México. Formamos líderes comprometidos con la excelencia educativa y el desarrollo social.' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/assets/img/IECS-IEDIS IMAGES/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/assets/img/IECS-IEDIS IMAGES/favicon.svg' },
        { rel: 'shortcut icon', href: '/assets/img/IECS-IEDIS IMAGES/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/img/IECS-IEDIS IMAGES/apple-touch-icon.png' },
        { rel: 'manifest', href: '/assets/img/IECS-IEDIS IMAGES/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap' },
        { rel: 'stylesheet', href: '/assets/css/legacy-styles.bundle.css?v=20260511-fa-fonts' }
      ],
      script: [
        { type: 'module', src: 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js' },
        { nomodule: true, src: 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js' },
        { src: 'https://www.clarity.ms/tag/jutz06e6ij', async: true },
        { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1644096973273978', async: true, crossorigin: 'anonymous' },

        // Ordered bundle of the same legacy theme scripts, built by scripts/build-legacy-assets.mjs.
        { src: '/assets/js/legacy-vendor.bundle.js', tagPosition: 'bodyClose', defer: true }
      ]
    }
  },

  nitro: {
    ignore: [
      '**/server/routes/index.get.ts',
      '**/server/routes/index.html.get.ts',
      '**/server/routes/legacy-*.ts',
      '**/server/routes/__diag.get.ts',
      '**/server/routes/\\[page\\].get.ts',
      '**/server/routes/\\[page\\].html.get.ts',
      '**/server/middleware/legacy-html.ts',
      '**/server/routes/virtual/\\[blob\\].get.ts'
    ],
    // Fuerza 'vercel-static' en Vercel para impedir explícitamente la construcción e instanciación de Serverless Functions
    preset: isVercel ? 'vercel-static' : (isProd ? 'node-server' : undefined),
    prerender: {
      // Evita que el build se bloquee si el crawler choca con rutas privadas (403/404)
      failOnError: false,
      ignore: ['/ads-dashboard', '/sitemap', '/api/ads/dashboard', '/api/sitemap/overrides']
    },
    ...(isProd && !isVercel
      ? {
          server: {
            host: process.env.NITRO_HOST || process.env.HOST || '127.0.0.1',
            port: Number(process.env.NITRO_PORT || process.env.PORT || 16767),
          },
        }
      : {})
  },

  runtimeConfig: {
    dbHost: process.env.NUXT_DB_HOST || process.env.DB_HOST || '',
    dbPort: Number(process.env.NUXT_DB_PORT || process.env.DB_PORT || 3306),
    dbName: process.env.NUXT_DB_NAME || process.env.DB_NAME || '',
    dbUser: process.env.NUXT_DB_USER || process.env.DB_USER || '',
    dbPassword: process.env.NUXT_DB_PASSWORD || process.env.DB_PASSWORD || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://casitaiedis.edu.mx',
      adsEnabled: process.env.NUXT_PUBLIC_ADS_ENABLED !== 'false',
      enableDynamicAdConfig: process.env.NUXT_PUBLIC_DYNAMIC_AD_CONFIG === 'true',
      enableRouteOverrides: process.env.NUXT_PUBLIC_ENABLE_ROUTE_OVERRIDES === 'true',
    },
  },
})