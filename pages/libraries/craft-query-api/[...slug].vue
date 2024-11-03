<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';

  const { surround } = await useSurroundHelper();
  const { page, navNodes } = await useCustomNavs('/libraries/craft-query-api')

  const headline = computed(() => formatNavDir(page.value?._dir))

  const nodeProps = [{
    navNodes,
    showParentUrl: false,
    defaultOpen: true,
  }]

</script>

<template>
  <NuxtLayout name="sidebar">
    <template v-slot:sidebarleft>
      <SidebarLeft :nodes="nodeProps" />
    </template>

    <template v-slot:main>
      <HeroSimple :headline="page?.title ?? 'Not Implemented'" :label="headline" :description="page?.description"/>
      <div class="markdown-rte">
        <ContentDoc />
      </div>
      <RelatedMd :relations="surround as Relation[]" />
    </template>

    <template v-if="page?.body?.toc?.links.length" v-slot:sidebarright>
      <SidebarRight :toc-links="page?.body?.toc?.links" />
    </template>
  </NuxtLayout>
</template>