<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';

  const { surround } = await useSurroundHelper()
  const { page, navNodes } = await useCustomNavs('/libraries/nuxt-craftcms')

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
      <SidebarLeft :nodes="nodeProps" pre-selected-value="nuxt-craftcms" />
    </template>

    <template v-slot:main>
      <MainHero :headline="{
        text: 'Use Craft CMS Query Builder in Nuxt',
        target: 'Nuxt',
      }"
        description="With the Nuxt SDK, you can easily integrate Craft CMS and leverage the Craft Query Builder in your Nuxt projects."
        :cta="[
          {
            text: 'Introduction',
            url: '/libraries/nuxt-craftcms/get-started/introduction',
          },
          {
            text: 'Installation',
            url: '/libraries/nuxt-craftcms/get-started/install',
          }
        ]" />

      <div class="markdown-rte mt-10">
        <ContentRenderer v-if="page" :value="page" />
      </div>
      <RelatedMd :relations="surround as Relation[]" />
    </template>

    <template v-slot:sidebarright>
      <SidebarRight :toc-links="tocLinks" />
    </template>
  </NuxtLayout>
</template>