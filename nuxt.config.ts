const isProd = process.env.NODE_ENV === 'production'
const isVercel = Boolean(process.env.VERCEL || process.env.VERCEL_ENV !== undefined)

const dynamicContentTtl = 300

const staticPublicRoutes = [
  '/acerca-de-institutos',
  '/aviso-legal',
  '/campus',
  '/convenios',
  '/daycare',
  '/elementary-school',
  '/escuela-padres',
  '/middle-school',
  '/politica-privacidad',
  '/preguntas-frecuentes',
  '/preschool',
  '/talleres-inteligentes',
  '/terminos-condiciones',
  '/ubicaciones',
  '/vida-husky',
  '/voluntarios',
]

export default defineNuxtConfig({
  ssr: true,
  pages: true,

  compatibilityDate: '2025-12-13',

  routeRules: {
    // Public informational pages are emitted as static HTML at build time.
    '/**': { prerender: true },

    // The homepage and news remain server-rendered so new MySQL content is
    // present in the initial HTML without requiring a new deployment.
    '/': { prerender: false, swr: dynamicContentTtl },
    '/noticias': { prerender: false, swr: dynamicContentTtl },
    '/noticias/**': { prerender: false, swr: dynamicContentTtl },

    // APIs always execute at runtime. Preserve the current CORS behavior;
    // future write endpoints can add stricter authentication and origin rules.
    '/api/**': { cors: true, prerender: false },
    '/api/noticias': { prerender: false, swr: dynamicContentTtl },
    '/api/noticias/**': { prerender: false, swr: dynamicContentTtl },

    // Private tools remain client-only and must never be cached or prerendered.
    '/ads-dashboard': {
      ssr: false,
      prerender: false,
      headers: { 'cache-control': 'private, no-store' },
    },
    '/ads-dashboard/**': {
      ssr: false,
      prerender: false,
      headers: { 'cache-control': 'private, no-store' },
    },
    '/sitemap': {
      ssr: false,
      prerender: false,
      headers: { 'cache-control': 'private, no-store' },
    },

    // The XML sitemap is generated from the current database state at runtime.
    '/sitemap.xml': { prerender: false, swr: dynamicContentTtl },

    '/_nuxt/**': {
      headers: {
        'cache-control': 'public, max-age=31536000, immutable',
      },
    },
    '/assets/**': {
      headers: {
        'cache-control': 'public, max-age=604800, stale-while-revalidate=2592000',
      },
    },
    '/img/**': {
      headers: {
        'cache-control': 'public, max-age=604800, stale-while-revalidate=2592000',
      },
    },

    // Preserve the existing admin-site proxy behavior outside IIS.
    '/virtual/**': { proxy: 'https://admin.casitaiedis.edu.mx/virtual/**' },
    '/signatures/**': { proxy: 'https://admin.casitaiedis.edu.mx/signatures/**' },
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
    // Keep runtime rendering and APIs available on both deployment targets.
    preset: isVercel ? 'vercel' : (isProd ? 'node-server' : undefined),
    prerender: {
      // Fail the build when a public static page cannot be generated.
      failOnError: true,
      crawlLinks: true,
      routes: staticPublicRoutes,
      ignore: [
        '/noticias',
        '/sitemap',
        '/ads-dashboard',
        '/api/',
      ],
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