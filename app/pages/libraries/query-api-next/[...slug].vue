<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';
  const addLinks = [
  {
    text: 'Full Example',
    url: 'https://github.com/samuelreichor/query-api-craft-starter/tree/examples/next',
    icon: 'showcase',
    target: '_blank',
  }
]
  const libRoute = '/libraries/query-api-next'

  const { surround } = await useSurroundHelper();
  const { page, navNodes, headline } = await useCustomNavs(libRoute)

  const nodeProps = [{
    navNodes,
    showParentUrl: false,
    defaultOpen: true,
  }]

  const tocLinks = page.value?.body?.toc?.links;
</script>

<template>
  <NuxtLayout name="sidebar">
    <template v-slot:sidebarleft>
      <SidebarLeft :nodes="nodeProps" pre-selected-value="query-api-next" />
    </template>

    <template v-slot:main>
      <HeroSimple :headline="page?.title ?? 'Not Implemented'" :label="headline" :description="page?.description" />
      <div class="markdown-rte">
        <ContentRenderer v-if="page" :value="page" />
      </div>
      <RelatedMd :relations="surround as Relation[]" />
    </template>

    <template v-slot:sidebarright>
      <SidebarRight v-if="tocLinks" :toc-links="tocLinks" :page-title="page?.title" :add-links="addLinks"/>
    </template>
  </NuxtLayout>
</template>