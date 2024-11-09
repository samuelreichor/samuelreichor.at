// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/seo'],

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/sitemap.xml", "/robots.txt"],
    },
  },


  vite: {
    plugins: [svgLoader()],
  },

  content: {
    markdown: {
      anchorLinks: {
        depth: 2, exclude: [1],
      }
    },
    highlight: {
      langs: ['js','jsx','json','ts','tsx','vue','css','html','bash','md','mdc','yaml', 'php'],
      theme: {
        default: 'github-dark',
        dark: 'github-dark',
        light: 'github-light',
      }
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon/favicon-96x96.png',
          sizes: '96x96',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon/favicon.svg',
        },
        {
          rel: 'shortcut icon',
          href: '/favicon/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/favicon/apple-touch-icon.png',
        },
        {
          rel: 'manifest',
          href: '/favicon/site.webmanifest',
        },
      ],
      meta: [
        {
          name: 'apple-mobile-web-app-title',
          content: 'Samuel Reichör',
        },
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: dark)',
          content: '#020817',
          id: 'theme-color-meta'
        },
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: light)',
          content: '#fff',
          id: 'theme-color-meta'
        },
      ],

    }
  },

  sitemap: {
    strictNuxtContentPaths: true
  },

  compatibilityDate: '2024-11-01',
})