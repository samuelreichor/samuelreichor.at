import type { Ref } from 'vue'

type ContentSeoPage = {
  title?: string
  description?: string
  seo?: {
    title?: string
    description?: string
  }
  imgPath?: string
} | null | undefined

export function useContentSeo(page: Ref<ContentSeoPage>) {
  const title = computed(() => page.value?.seo?.title || page.value?.title)
  const description = computed(() => page.value?.seo?.description || page.value?.description)
  const ogImage = computed(() => page.value?.imgPath || undefined)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
  })
}
