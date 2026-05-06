import type { Ref } from 'vue'

type ContentSeoPage = {
  title?: string
  description?: string
  badge?: string
  seo?: {
    title?: string
    description?: string
  }
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

  defineOgImageComponent('Default', {
    title: title.value,
    description: description.value,
    badge: page.value?.badge,
  })
}
