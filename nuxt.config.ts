// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  devtools: { enabled: false },
  future: {
    compatibilityVersion: 4,
  },
  
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/seo', 'nuxt-llms'],

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
    build: {
      markdown: {
        toc: {
          depth: 2,
        },
        highlight: {
          langs: ['js','jsx','json','ts','tsx','vue','css','html','bash','md','mdc','yaml', 'php', 'dockerfile'],
          theme: {
            default: 'github-dark',
            dark: 'github-dark',
            light: 'github-light',
          }
        }
      },
    }
  },

  llms: {
    domain: 'http://localhost:3000',
    title: 'Your Site Name',
    description: 'A brief description of your site',
    full: {
      title: 'Full Documentation',
      description: 'Full documentation of the application',
    },
    sections: [
      {
        title: 'queryApiJs',
        description: 'Technical documentation and guides',
        contentCollection: 'queryApiJs'
      },
      {
        title: 'queryApiVue',
        description: 'Technical documentation and guides',
        contentCollection: 'queryApiVue'
      }
    ],
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

  site: {
    trailingSlash: false,
    url: 'https://samuelreichor.at',
    name: 'samuelreichor',
  },

  compatibilityDate: '2024-11-01',
})