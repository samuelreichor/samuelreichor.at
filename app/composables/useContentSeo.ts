import type { Ref } from 'vue'

type ContentSeoPage = {
  title?: string
  description?: string
  badge?: string
  seo?: {
    title?: string
    description?: string
  }
  datePublished?: Date | string
  imgPath?: string
  tags?: string[]
} | null | undefined

export function useContentSeo(page: Ref<ContentSeoPage>) {
  const title = computed(() => page.value?.seo?.title || page.value?.title)
  const description = computed(() => page.value?.seo?.description || page.value?.description)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
  })

  defineOgImage('Default', {
    title: title.value,
    description: description.value,
    badge: page.value?.badge,
  })

  if (page.value?.datePublished) {
    const publishedIso = new Date(page.value.datePublished).toISOString()

    useSeoMeta({
      ogType: 'article',
      articlePublishedTime: publishedIso,
      articleAuthor: ['Samuel Reichör'],
      articleTag: page.value.tags,
    })

    useSchemaOrg([
      defineArticle({
        '@type': 'BlogPosting',
        headline: title.value,
        description: description.value,
        datePublished: publishedIso,
        image: page.value.imgPath,
        keywords: page.value.tags,
      }),
    ])
  }
}
