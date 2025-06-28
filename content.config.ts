import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: '1.blogs/*.md',
      type: 'page',
      schema: z.object({
        tags: z.array(z.string()),
        imgPath: z.string(),
        datePublished: z.date(),
        readingTime: z.string(),
      })
    }),
    docs: defineCollection({
      // Load every file inside the `content` directory
      source: '2.libraries/**/*.md',
      // Specify the type of content in this collection
      type: 'page',
      schema: z.object({
        badge:  z.string(),
        icon:  z.string(),
        type:  z.string(),
      })
    }),
    queryApiJs: defineCollection({
      // Load every file inside the `content` directory
      source: '2.libraries/5.js-craftcms-api/**/*.md',
      // Specify the type of content in this collection
      type: 'page',
    }),
    queryApiVue: defineCollection({
      // Load every file inside the `content` directory
      source: [{include: '2.libraries/5.js-craftcms-api/**/*.md'}, {include: '2.libraries/6.vue-craftcms/**/*.md'}],
      // Specify the type of content in this collection
      type: 'page',
    }),
  }
})