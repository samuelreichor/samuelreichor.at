<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';

  const { surround } = await useSurroundHelper()
  const { page, navNodes } = await useCustomNavs('/libraries/craft-better-cache')
  useContentSeo(page)

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
      <SidebarLeft :nodes="nodeProps" pre-selected-value="craft-better-cache" />
    </template>

    <template v-slot:main>
      <MainHero :headline="{
          text: 'Better Cache, static caching for Craft CMS',
          target: 'Better Cache',
        }"
        description="Better Cache turns your Craft pages into static HTML and keeps them fresh when content changes. Fast to refresh, light on memory and a drop-in replacement for Blitz."
        image="craft-better-cache" :cta="[
          {
            text: 'Get Started',
            url: '/libraries/craft-better-cache/get-started/installation',
          },
          {
            text: 'Switch from Blitz',
            url: '/libraries/craft-better-cache/usage/switching-from-blitz',
          },
        ]" />

      <div class="markdown-rte mt-10">
        <ContentRenderer v-if="page" :value="page" />
      </div>
      <RelatedMd :relations="surround as Relation[]" />
    </template>

    <template v-slot:sidebarright>
      <SidebarRight v-if="tocLinks" :toc-links="tocLinks" :page-title="page?.title"/>
    </template>
  </NuxtLayout>
</template>
