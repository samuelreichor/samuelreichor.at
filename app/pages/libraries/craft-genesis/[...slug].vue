<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';

  const addLinks = [
    {
      text: 'Download Example Excel',
      url: '/other-files/example-craft-config.xlsx',
      icon: 'download',
      target: '_blank',
    }
  ]

  const { surround } = await useSurroundHelper();
  const { page, navNodes, headline } = await useCustomNavs('/libraries/craft-genesis')

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
      <SidebarLeft :nodes="nodeProps" pre-selected-value="craft-genesis" />
    </template>

    <template v-slot:main>
      <HeroSimple :headline="page?.title ?? 'Not Implemented'" :label="headline" :description="page?.description" />
      <div class="markdown-rte">
        <ContentRenderer v-if="page" :value="page" />
      </div>
      <RelatedMd :relations="surround as Relation[]" />
    </template>

    <template v-slot:sidebarright>
      <SidebarRight v-if="tocLinks" :page-title="page?.title" :toc-links="tocLinks" :add-links="addLinks" />
    </template>
  </NuxtLayout>
</template>
