<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';
  const addLinks = [
  {
    text: 'Full Example',
      url: 'https://github.com/samuelreichor/query-api-craft-starter/tree/examples/react-vite',
    icon: 'showcase',
    target: '_blank',
  }
]
const libRoute = '/libraries/query-api-react'

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
      <SidebarLeft :nodes="nodeProps" pre-selected-value="query-api-react" />
    </template>

    <template v-slot:main>
      <MainHero :headline="{
        text: 'Use Craft CMS Query Builder in React',
        target: 'React',
      }"
        description="With the React SDK, you can easily integrate Craft CMS and leverage the Craft Query Builder in your React projects."
        :cta="[
          {
            text: 'Introduction',
            url: '/libraries/query-api-react/get-started/introduction',
          },
          {
            text: 'Installation',
            url: '/libraries/query-api-react/get-started/quick-start',
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