// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],

  routeRules: {
    '/': { prerender: true }
  },

  vite: {
    plugins: [svgLoader()],
  },

  compatibilityDate: '2024-11-01',
})