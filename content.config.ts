import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: '1.blogs/**',
      type: 'page',
      schema: z.object({
        tags: z.array(z.string()),
        imgPath: z.string(),
        datePublished: z.date(),
        readingTime: z.string(),
      })
    }),
    docs: defineCollection({
      source: '2.libraries/**',
      type: 'page',
      schema: z.object({
        badge: z.boolean(),
        icon: z.string(),
        type: z.string(),
      })
    }),
    snippets: defineCollection({
      source: '_snippets/**',
      type: 'page',
    })
  }
})