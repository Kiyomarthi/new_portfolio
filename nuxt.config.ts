// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    'nuxt-studio',
    '@nuxt/fonts'
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.ico'
        }
      ],
      htmlAttrs: {
        dir: 'rtl',
        lang: 'fa'
      }
    }
  },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    provider: 'local',
    families: [
      {
        name: 'YekanBakh',
        src: ['/fonts/yekan-bakh-normal-subset.woff2'],
        weight: '400',
        style: 'normal',
        preload: true,
        global: true,
        display: 'swap',
        unicodeRange: 'U+0600-06FF,U+06F0-06F9'
      },
      {
        name: 'YekanBakh',
        src: ['/fonts/yekan-bakh-semibold-subset.woff2'],
        weight: '500',
        style: 'normal',
        preload: true,
        global: true,
        display: 'swap',
        unicodeRange: 'U+0600-06FF,U+06F0-06F9'
      },
      {
        name: 'YekanBakh',
        src: ['/fonts/yekan-bakh-bold-subset.woff2'],
        weight: '700',
        style: 'normal',
        preload: true,
        global: true,
        display: 'swap',
        unicodeRange: 'U+0600-06FF,U+06F0-06F9'
      },
      {
        name: 'grok',
        src: ['/fonts/robeaugo.woff2'],
        weight: '700',
        style: 'normal',
        preload: true,
        global: true,
        display: 'swap',
        unicodeRange: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+2000-206F'
      }
    ]
  },

  ogImage: {
    zeroRuntime: true
  },

  studio: {
    repository: {
      provider: 'github',
      owner: 'Kiyomarthi',
      repo: 'new_portfolio',
      branch: 'main'
    }
  }
})
