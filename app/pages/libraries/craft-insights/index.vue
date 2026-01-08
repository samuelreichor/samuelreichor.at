<script setup lang="ts">
  import type { Relation } from '~/components/relatedMd/relatedMd.vue';

  const { surround } = await useSurroundHelper()
  const { page, navNodes } = await useCustomNavs('/libraries/craft-insights')

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
      <SidebarLeft :nodes="nodeProps" pre-selected-value="craft-insights" />
    </template>

    <template v-slot:main>
      <MainHero :headline="{
        text: 'GDPR-compilant Analytics for Craft CMS',
        target: 'Analytics',
      }" description="Most analytics tools collect far more data than you need and violate your users' privacy in the process. Insights takes a different approach: it gives you meaningful traffic metrics while being fully GDPR-compliant by design."
        image="craft-insights" :cta="[
          {
            text: 'Get Started',
            url: '/libraries/craft-insights/get-started/installation',
          },
          {
            text: 'Feature Tour',
            url: '/libraries/craft-insights/introduction/feature-tour',
          },
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
