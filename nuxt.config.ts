// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@nuxt/content'],

  routeRules: {
    '/': { prerender: true }
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
      langs: ['js','jsx','json','ts','tsx','vue','css','html','vue','bash','md','mdc','yaml', 'php'],
      theme: {
        default: 'github-dark',
        dark: 'github-dark',
        light: 'github-light',
      }
    }
  },

  compatibilityDate: '2024-11-01',
})