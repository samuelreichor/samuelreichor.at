<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';

  const { surround } = await useSurroundHelper()
  const { page, navNodes } = await useCustomNavs('/libraries/craft-query-api')

  const nodeProps = [{
    navNodes,
    showParentUrl: false,
    defaultOpen: true,
  }]

  const highlights = [
    {
      title: 'Flexible API Queries',
      description: 'Fetch content via URL parameters for dynamic data retrieval.',
      icon: 'cloud',
    },
    {
      title: 'Unified Content Access',
      description: 'Retrieve addresses, assets, entries, and users with one API.',
      icon: 'book',
    },
    {
      title: 'Image Transforms',
      description: 'Detects and configures ImagerX transforms for optimized images.',
      icon: 'image',
    },
  ];

  const tocLinks = page.value?.body?.toc?.links;
</script>

<template>
  <NuxtLayout name="sidebar">
    <template v-slot:sidebarleft>
      <SidebarLeft :nodes="nodeProps" />
    </template>

    <template v-slot:main>
      <MainHero :headline="{
          text: 'The Query API for Craft CMS',
          target: 'Query API',
        }" 
        description="Craft Query API makes Craft's query builder accessible across any frontend, 
          allowing you to dynamically build queries via URL parameters for flexible, real-time data 
          access in headless or traditional setups." 
        image="craft-query-api"
        :cta="[
          {
            text: 'Introduction',
            url: '/libraries/craft-query-api/get-started/introduction',
          },
          {
            text: 'Installation',
            url: '/libraries/craft-query-api/get-started/install',
          }
        ]" :link="{
          text: 'The evolution of Craft Query API',
          url: 'https://gj.com',
        }" />

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
        <Card v-for="pkg in highlights" :key="pkg.title" :headline="pkg.title" :icon="pkg.icon"
          :description="pkg.description" />
      </div>

      <div class="markdown-rte mt-10">
        <ContentDoc />
      </div>
      <RelatedMd :relations="surround as Relation[]" />
    </template>

    <template v-if="tocLinks?.length" v-slot:sidebarright>
      <SidebarRight :toc-links="tocLinks" />
    </template>
  </NuxtLayout>
</template>