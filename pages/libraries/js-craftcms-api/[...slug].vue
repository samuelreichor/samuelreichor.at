<script setup lang="ts">
  import type { NavItem } from '@nuxt/content';
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';

  const { navDirFromPath } = useContentHelpers()

  const navigation = inject<NavItem[]>('navigationObj')
  const navNodes = navDirFromPath('/libraries/js-craftcms-api', navigation!)

  const route = useRoute()

  const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }

  const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
    return queryContent()
      .where({ _extension: 'md', navigation: { $ne: false } })
      .only(['title', 'description', '_path'])
      .findSurround(route.path.endsWith('/') ? route.path.slice(0, -1) : route.path)
  }, { default: () => [] })

  const nodeProps = [{
    navNodes,
    showParentUrl: false,
    defaultOpen: true,
  }]
</script>

<template>
  <NuxtLayout name="sidebar">
    <template v-slot:sidebarleft>
      <SidebarLeft :nodes="nodeProps" />
    </template>

    <template v-slot:main>
      <div class="markdown-rte">
        <ContentDoc />
      </div>
      <RelatedMd :relations="surround as Relation[]"/>
    </template>

    <template v-if="page?.body?.toc?.links?.length" v-slot:sidebarright>
      <SidebarRight :toc-links="page?.body?.toc?.links" />
    </template>
  </NuxtLayout>
</template>