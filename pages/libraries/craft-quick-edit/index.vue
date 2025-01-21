<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';

  const { surround } = await useSurroundHelper()
  const { page, navNodes } = await useCustomNavs('/libraries/craft-quick-edit')

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
      <SidebarLeft :nodes="nodeProps" pre-selected-value="craft-quick-edit" />
    </template>

    <template v-slot:main>
      <MainHero :headline="{
        text: 'Quick Edit for Craft CMS',
        target: 'Quick Edit',
      }"
        description="Quick Edit is a Craft CMS plugin that automatically adds an edit page link to the frontend."
        image="craft-quick-edit" :cta="[
          {
            text: 'Install',
    url: '/libraries/craft-quick-edit/get-started/installation',
          },
          {
            text: 'Usage',
            url: '/libraries/craft-quick-edit/get-started/usage',
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