import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { defineRobotsSchema } from '@nuxtjs/robots/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'
import { defineOgImageSchema } from 'nuxt-og-image/content'
import { defineSchemaOrgSchema } from 'nuxt-schema-org/content'

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
        badge: z.string().optional(),
        robots: defineRobotsSchema(),
        sitemap: defineSitemapSchema(),
        ogImage: defineOgImageSchema(),
        schemaOrg: defineSchemaOrgSchema(),
      })
    }),
    docs: defineCollection({
      source: '2.libraries/**',
      type: 'page',
      schema: z.object({
        badge: z.string().optional(),
        icon: z.string(),
        type: z.string(),
        robots: defineRobotsSchema(),
        sitemap: defineSitemapSchema(),
        ogImage: defineOgImageSchema(),
        schemaOrg: defineSchemaOrgSchema(),
      })
    }),
    snippets: defineCollection({
      source: '_snippets/**',
      type: 'page',
    })
  }
})