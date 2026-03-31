const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  ssr: true,
  pages: true,

  compatibilityDate: '2025-12-13',

  modules: ['nuxt-swiper'],

  vue: {
    compilerOptions: {
      // Ignora advertencias de Web Components en la consola
      isCustomElement: (tag) => tag.startsWith('ion-') || tag.startsWith('atropos-')
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
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
        { rel: 'stylesheet', href: '/assets/css/font-awesome-pro.css' },
        { rel: 'stylesheet', href: '/assets/css/spacing.css' },
        { rel: 'stylesheet', href: '/assets/css/atropos.min.css' },
        { rel: 'stylesheet', href: '/assets/css/main.css' }
      ],
      script: [
        { type: 'module', src: 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js' },
        { nomodule: true, src: 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js' },
        { src: 'https://www.clarity.ms/tag/jutz06e6ij', async: true },
        { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1644096973273978', async: true, crossorigin: 'anonymous' }
      ]
    }
  },

  nitro: {
    // ESTO ES CLAVE: Ciega por completo a Nitro frente a los viejos interceptores
    // para que Vue Router tome el control de todas las URLs.
    ignore: [
      '**/server/routes/index.get.ts',
      '**/server/routes/index.html.get.ts',
      '**/server/routes/legacy-*.ts',
      '**/server/routes/__diag.get.ts',
      '**/server/routes/\\[page\\].get.ts',
      '**/server/routes/\\[page\\].html.get.ts',
      '**/server/middleware/legacy-html.ts'
    ],
    ...(isProd
      ? {
          preset: 'node-server',
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