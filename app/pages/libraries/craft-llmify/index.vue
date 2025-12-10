<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';

  const { surround } = await useSurroundHelper()
  const { page, navNodes } = await useCustomNavs('/libraries/craft-llmify')

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
      <SidebarLeft :nodes="nodeProps" pre-selected-value="craft-llmify" />
    </template>

    <template v-slot:main>
      <MainHero :headline="{
        text: 'Optimize Your Site for AI with LLMify',
        target: 'LLMify',
      }" description="    LLMify makes your Craft CMS content instantly AI-ready. It transforms your templates into clean, structured outputs, giving you full control over what’s included." image="craft-llmify" :cta="[
          {
            text: 'Install',
            url: '/libraries/craft-llmify/get-started/installation',
          },
          {
            text: 'Basic Overview',
            url: '/libraries/craft-llmify/usage/basic-overview',
          }
        ]" />

      <div class="markdown-rte mt-10">
        <ContentRenderer v-if="page" :value="page" />
      </div>
      <RelatedMd :relations="surround as Relation[]" />
    </template>

    <template v-slot:sidebarright>
      <SidebarRight v-if="tocLinks" :page-title="page?.title" :toc-links="tocLinks" />
    </template>
  </NuxtLayout>
</template>
