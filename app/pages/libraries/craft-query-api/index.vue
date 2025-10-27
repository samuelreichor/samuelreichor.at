<script setup lang="ts">
import type { Relation } from '~/components/relatedMd/relatedMd.vue';
  const addLinks = [
    {
      text: 'Full Nuxt Example',
      url: 'https://github.com/samuelreichor/craft-nuxt-starter',
      icon: 'showcase',
      target: '_blank',
    },
    {
      text: 'Other Examples',
      url: 'https://github.com/samuelreichor/query-api-craft-starter',
      icon: 'showcase',
      target: '_blank',
    }
  ]
  const libRoute = '/libraries/craft-query-api'

  const { page, navNodes } = await useCustomNavs(libRoute)
  const tocLinks = page.value?.body?.toc?.links;
  const { surround } = await useSurroundHelper()

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
</script>

<template>
  <NuxtLayout name="sidebar">
    <template v-slot:sidebarleft>
      <SidebarLeft :nodes="nodeProps" pre-selected-value="craft-query-api" />
    </template>

    <template v-slot:main>
      <MainHero :headline="{
          text: 'Craft Query API for Craft CMS',
          target: 'Query API',
        }" description="The Craft Query API is a Craft CMS API Plugin that makes Craft's 
        query builder accessible across any frontend. It allows you to dynamically 
        build Craft CMS dynamic queries via URL parameters, enabling flexible, data access in 
        your headless Craft CMS setup" image="craft-query-api" :cta="[
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

      <div class="markdown-rte mt-16">
        <ContentRenderer v-if="page" :value="page" />
      </div>
      <RelatedMd :relations="surround as Relation[]" />
    </template>

    <template v-slot:sidebarright>
      <SidebarRight v-if="tocLinks" :toc-links="tocLinks" :pageTitle="page?.title" :add-links="addLinks"/>
    </template>
  </NuxtLayout>
</template>
