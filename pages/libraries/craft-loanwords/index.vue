<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';

  const { surround } = await useSurroundHelper()
  const { page, navNodes } = await useCustomNavs('/libraries/craft-loanwords')

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
      <SidebarLeft :nodes="nodeProps" pre-selected-value="craft-loanwords" />
    </template>

    <template v-slot:main>
      <MainHero :headline="{
          text: 'Loanwords for Craft CMS',
          target: 'Loanwords',
        }"
        description="Loanwords is a Craft CMS plugin that helps manage and highlight loanwords by wrapping them with appropriate language tags, enhancing accessibility and screen reader support."
        image="craft-loanwords" :cta="[
          {
            text: 'Install',
            url: '/libraries/craft-loanwords/install',
          },
          {
            text: 'Usage',
            url: '/libraries/craft-loanwords/usage',
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