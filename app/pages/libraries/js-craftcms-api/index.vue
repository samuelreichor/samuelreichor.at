<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';

  const { surround } = await useSurroundHelper()
  const { page, navNodes } = await useCustomNavs('/libraries/js-craftcms-api')

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
      <SidebarLeft :nodes="nodeProps" pre-selected-value="js-craftcms-api" />
    </template>

    <template v-slot:main>
      <MainHero :headline="{
        text: 'Js Craft CMS Query API',
        target: 'Query API',
      }"
        description="The core package for all SDKs. Use this as a foundation to build a query builder for Craft CMS with your preferred JavaScript framework."
        :cta="[
          {
            text: 'Installation',
            url: '/libraries/js-craftcms-api/install',
          },
          {
            text: 'Available Methods',
            url: '/libraries/js-craftcms-api/methods',
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