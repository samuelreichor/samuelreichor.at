<script setup lang="ts">
  import type { NavItem } from '@nuxt/content';

  const { navDirFromPath } = useContentHelpers()

  const navigation = inject<NavItem[]>('navigationObj')
  const navNodes = navDirFromPath('/libraries/craft-query-api', navigation!)

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
      <div class="markdown-rte">
        <ContentDoc />
      </div>
    </template>
    <template v-slot:sidebarright>
      <SidebarRight :nodes="nodeProps" />
    </template>
  </NuxtLayout>
</template>