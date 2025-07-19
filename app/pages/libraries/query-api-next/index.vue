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
      <MainHero :headline="{
        text: 'Use Craft CMS Query Builder in Next',
        target: 'Next',
      }"
        description="With the Next SDK, you can easily integrate Craft CMS and leverage the Craft Query Builder in your Next projects."
        :cta="[
          {
            text: 'Introduction',
            url: '/libraries/query-api-next/get-started/introduction',
          },
          {
            text: 'Installation',
            url: '/libraries/query-api-next/get-started/quick-start',
          }
        ]" />

      <div class="markdown-rte mt-10">
        <ContentRenderer v-if="page" :value="page" />
      </div>
      <RelatedMd :relations="surround as Relation[]" />
    </template>

    <template v-slot:sidebarright>
      <SidebarRight v-if="tocLinks" :toc-links="tocLinks" :page-title="page?.title" :add-links="addLinks"/>
    </template>
  </NuxtLayout>
</template>