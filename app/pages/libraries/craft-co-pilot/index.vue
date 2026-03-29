<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';

  const { surround } = await useSurroundHelper()
  const { page, navNodes } = await useCustomNavs('/libraries/craft-co-pilot')

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
      <SidebarLeft :nodes="nodeProps" pre-selected-value="craft-co-pilot" />
    </template>

    <template v-slot:main>
      <MainHero :headline="{
          text: 'CoPilot your AI Agent for Craft CMS',
          target: 'CoPilot',
        }"
        description="CoPilot is an AI agent for Craft CMS that lives in your control panel. Create, edit, translate, and publish content across all your sites through natural conversation."
        image="craft-co-pilot" :cta="[
          {
            text: 'Get Started',
            url: '/libraries/craft-co-pilot/get-started/installation',
          },
          {
            text: 'View Chat Features',
            url: '/libraries/craft-co-pilot/usage/chat',
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
