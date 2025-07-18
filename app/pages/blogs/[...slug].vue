<script setup lang="ts">
  import type { ContentNavigationItem } from '@nuxt/content';
  //const { page, navNodes } = await useCustomNavs('/libraries/craft-loanwords')

  const route = useRoute()
  const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('blog').path(route.path).first()
  })

  const tocLinks = page.value?.body?.toc?.links;

  const socialNodes = inject<ContentNavigationItem[]>('socialMediaObj')
</script>

<template>
  <NuxtLayout name="sidebar">
    <template v-slot:sidebarleft>
      <aside class="flex flex-col justify-between h-full">
        <NuxtLink class="flex gap-2" to="/blogs">
          <Icon name="arrow" size="lg" class="-rotate-90 shrink-0" /> Back to Overview
        </NuxtLink>
        <SidebarNav v-if="socialNodes" label="Find me here" :nav-nodes="socialNodes" />
      </aside>
    </template>

    <template v-slot:main>
      <HeroSimple :headline="page?.title ?? 'Not Implemented'" :description="page?.description" :show-btns="false"/>
      <div class="markdown-rte">
        <ContentRenderer v-if="page" :value="page" />
      </div>
    </template>

    <template v-if="tocLinks?.length" v-slot:sidebarright>
      <SidebarRight :toc-links="tocLinks" />
    </template>
  </NuxtLayout>
</template>