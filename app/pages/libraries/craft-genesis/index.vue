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

  const { surround } = await useSurroundHelper()
  const { page, navNodes } = await useCustomNavs('/libraries/craft-genesis')

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
      <MainHero :headline="{
        text: 'Bulk Import Element Types with Genesis',
        target: 'Genesis',
      }" description="Genesis helps you to set up your Craft CMS site structure quickly using CSV files. You can define everything in a spreadsheet and import it all at once."
        image="craft-genesis" :cta="[
          {
            text: 'Install',
            url: '/libraries/craft-genesis/get-started/installation',
          },
        ]" />

      <div class="markdown-rte mt-10">
        <ContentRenderer v-if="page" :value="page" />
      </div>
      <RelatedMd :relations="surround as Relation[]" />
    </template>

    <template v-slot:sidebarright>
      <SidebarRight v-if="tocLinks" :page-title="page?.title" :toc-links="tocLinks" :add-links="addLinks"/>
    </template>
  </NuxtLayout>
</template>
