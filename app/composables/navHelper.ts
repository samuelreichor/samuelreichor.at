import { useRoute, useAsyncData, createError } from '#imports'
import { inject } from 'vue'
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

export const useSurroundHelper = async () => {
  const route = useRoute()
  const routePath = route.path.replace(/\/$/, '')

  const { data: surround } = await useAsyncData(
    `${routePath}-surround`,
    () =>
      queryCollectionItemSurroundings('docs', routePath, {
        fields: ['title', 'description', 'path'],
      }).then((res) => res || []),
    { default: () => [] }
  )

  return { surround }
}

function getCurrentNodeTree(navigation: ContentNavigationItem[], path: string) {
  for (const node of navigation) {
    if (node.path === '/libraries') {
      for (const lib of node.children || []) {
        if (lib.path === path) {
          return lib.children
        }
      }
    }
  }
  return undefined
}

export const useCustomNavs = async (path: string) => {
  const route = useRoute()
  const navigation = inject<ContentNavigationItem[]>('navigationObj')
  if (!navigation) {
    throw createError({ statusCode: 500, statusMessage: 'Navigation data not found', fatal: true })
  }

  const navNodes =  getCurrentNodeTree(navigation, path)
  const { data: page } = await useAsyncData(
    route.path,
    () =>
      queryCollection('docs').path(route.path).first().then((res) => res || null)
  )
  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }

  const headline = findPageHeadline(navigation, route.path)

  return { page, navNodes, headline }
}