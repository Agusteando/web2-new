const isProd = process.env.NODE_ENV === 'production'
// Detección automática del entorno Vercel para forzar SSG puro
const isVercel = !!process.env.VERCEL || process.env.VERCEL_ENV !== undefined

export default defineNuxtConfig({
  ssr: true,
  pages: true,

  compatibilityDate: '2025-12-13',

  // Configuración condicional para garantizar 0 Edge Requests en Vercel,
  // preservando el comportamiento dinámico y las capacidades de escritura en despliegues maestro con PM2.
  routeRules: isVercel ? {
    // En Vercel: Conversión estricta a Static Site Generation (SSG)
    '/**': { prerender: true }
  } : {
    // En PM2/IIS: Mantiene el servidor Node nativo, las APIs dinámicas y los proxies transparentes
    '/**': { prerender: true },
    '/api/**': { cors: true, prerender: false },
    '/ads-dashboard': { ssr: false, prerender: false },
    '/sitemap': { ssr: false, prerender: false },
    '/virtual/**': { proxy: 'https://admin.casitaiedis.edu.mx/virtual/**' },
    '/signatures/**': { proxy: 'https://admin.casitaiedis.edu.mx/signatures/**' }
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
        { rel: 'stylesheet', href: '/assets/css/bootstrap.css' },
        { rel: 'stylesheet', href: '/assets/css/swiper-bundle.css' },
        { rel: 'stylesheet', href: '/assets/css/magnific-popup.css' },
        { rel: 'stylesheet', href: '/assets/css/font-awesome-pro.css' },
        { rel: 'stylesheet', href: '/assets/css/spacing.css' },
        { rel: 'stylesheet', href: '/assets/css/atropos.min.css' },
        { rel: 'stylesheet', href: '/assets/css/main.css' }
      ],
      script: [
        { type: 'module', src: 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js' },
        { nomodule: true, src: 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js' },
        { src: 'https://www.clarity.ms/tag/jutz06e6ij', async: true },
        { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1644096973273978', async: true, crossorigin: 'anonymous' },
        
        // Restauración completa de los scripts visuales del diseñador al final del body
        { src: '/assets/js/vendor/jquery.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/bootstrap-bundle.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/plugin.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/three.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/hover-effect.umd.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/split-type.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/swiper-bundle.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/swiper-gl.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/effect-slicer.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/magnific-popup.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/nice-select.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/purecounter.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/isotope-pkgd.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/imagesloaded-pkgd.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/atropos.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/backtop.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/ajax-form.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/slider-init.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/main.js', tagPosition: 'bodyClose', defer: true },
        { src: '/assets/js/tp-cursor.js', tagPosition: 'bodyClose', defer: true }
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
    },
  },
})