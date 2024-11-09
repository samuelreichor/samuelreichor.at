<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';

  const { surround } = await useSurroundHelper()
  const { page, navNodes } = await useCustomNavs('/libraries/vue-craftcms')

  const nodeProps = [{
    navNodes,
    showParentUrl: false,
    defaultOpen: true,
  }]

  const highlights = [
    {
      title: 'Url Builder',
      description: 'Build your query urls like you would query stuff in Craft CMS',
      icon: 'cloud',
    },
    {
      title: 'Unified Content Access',
      description: 'Retrieve addresses, assets, entries, and users with one API.',
      icon: 'book',
    },
    {
      title: 'Auto Prop Injection',
      description: 'Connect your components easily with the data of Craft CMS',
      icon: 'image',
    },
  ];

  const tocLinks = page.value?.body?.toc?.links;
</script>

<template>
  <NuxtLayout name="sidebar">
    <template v-slot:sidebarleft>
      <SidebarLeft :nodes="nodeProps" pre-selected-value="vue-craftcms" />
    </template>

    <template v-slot:main>
      <MainHero :headline="{
        text: 'Use Craft CMS Query Builder in Vue',
        target: 'Vue',
      }"
        description="With the Vue Craft CMS module, you can easily integrate Craft CMS and leverage the Craft Query Builder in your Vue projects."
        :cta="[
            {
              text: 'Introduction',
              url: '/libraries/vue-craftcms/get-started/introduction',
            },
            {
              text: 'Installation',
              url: '/libraries/vue-craftcms/get-started/install',
            }
          ]" />
          
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