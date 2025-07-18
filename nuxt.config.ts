// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';
import path from 'path';
import fs from 'fs';

export default defineNuxtConfig({
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/seo', 'nuxt-llms'],

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [],
    },
  },

  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.dev) return

      const libDir = path.resolve(__dirname, 'content/2.libraries')
      const mdFiles: string[] = []

      function walk(dir: string) {
        for (const name of fs.readdirSync(dir)) {
          const full = path.join(dir, name)
          const stat = fs.statSync(full)
          if (stat.isDirectory()) {
            walk(full)
          } else if (name.endsWith('.md')) {
            mdFiles.push(full)
          }
        }
      }
      walk(libDir)

      function stripNum(s: string) {
        return s.replace(/^\d+\./, '')
      }

      const routes = mdFiles.map((fullPath) => {
        const rel = path.relative(libDir, fullPath).split(path.sep)
          .map(seg => stripNum(seg))
          .join('/')
        if (rel.endsWith('index.md')) {
          // Replace /index.md with .md (e.g. /foo/index.md -> /foo.md)
          return `/raw/libraries/${rel.replace(/\/index\.md$/, '.md').replace(/\\/g,'/')}`
        }
        return `/raw/libraries/${rel.replace(/\\/g,'/')}`
      })

      nitroConfig?.prerender?.routes?.push(...routes)
    }
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
    domain: 'https://samuelreichor.at',
    title: 'Samuel Reichör',
    description: 'This is a summary of all open source libraries, that I maintain.',
    full: {
      title: 'Full Documentation',
      description: 'Full documentation of all libraries',
    },
    sections: [
      {
        title: 'Complete documentation of Query API Craft CMS Plugin',
        description: 'Query API is a Craft CMS plugin that allows developers to create queries directly from URL parameters, enabling fast and flexible data quering in JS Frameworks.',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/libraries/craft-query-api%' }
        ]
      },
      {
        title: 'Complete documentation of Loanwords Craft CMS Plugin',
        description: 'Loanwords is a Craft CMS plugin that helps manage loanwords by wrapping them with appropriate language tags, enhancing accessibility and screen reader support.',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/libraries/craft-loanwords%' }
        ]
      },
      {
        title: 'Complete documentation of Quick Edit Craft CMS Plugin',
        description: 'Quick Edit is a Craft CMS plugin that automatically adds an edit page button to your frontend.',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/libraries/craft-quick-edit%' }
        ]
      },
      {
        title: 'Complete documentation of @query-api/js npm package',
        description: 'Documentation and usage examples for the JavaScript SDK to integrate with Craft CMS using the Query API.',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/libraries/js-craftcms-api%' }
        ]
      },
      {
        title: 'Complete documentation of @query-api/vue npm package',
        description: 'Documentation and usage examples for the Vue SDK to integrate with Craft CMS using the Query API. It depends on @query-api/js.',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/libraries/vue-craftcms%' }
        ]
      },
      {
        title: 'Complete documentation of @query-api/nuxt npm package',
        description: 'Documentation and usage examples for the Nuxt SDK to integrate with Craft CMS using the Query API. It depends on @query-api/js and @query-api/vue.',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/libraries/nuxt-craftcms%' }
        ]
      },
      {
        title: 'Complete documentation of @query-api/react npm package',
        description: 'Documentation and usage examples for the React SDK to integrate with Craft CMS using the Query API. It depends on @query-api/js.',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/libraries/query-api-react%' }
        ]
      },
      {
        title: 'Complete documentation of @query-api/next npm package',
        description: 'Documentation and usage examples for the Next.js SDK to integrate with Craft CMS using the Query API. It depends on @query-api/js and @query-api/react.',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/libraries/query-api-next%' }
        ]
      },
    ],
    notes: [
      'The content is automatically generated from the same source as the official documentation.'
    ]
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

  site: {
    trailingSlash: false,
    url: 'https://samuelreichor.at',
    name: 'samuelreichor',
  },

  compatibilityDate: '2024-11-01',
})