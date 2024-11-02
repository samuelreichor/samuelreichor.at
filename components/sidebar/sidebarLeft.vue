<script setup lang="ts">
  import type { NavItem } from '@nuxt/content';

  type nodes = {
    navNodes: NavItem[] | undefined;
    label?: string;
    showParentUrl?: boolean;
    defaultOpen?: boolean;
  }

  const props = defineProps({
    nodes: {
      required: true,
      type: Array as PropType<nodes[]>,
    },
  })

  const socialNodes = inject<NavItem[]>('socialMediaObj')
</script>

<template>
  <aside class="flex flex-col justify-between h-full">
    <nav class="space-y-14">
      <SidebarNav 
        v-for="nodeObj in props.nodes" 
        :label="nodeObj.label" 
        :nav-nodes="nodeObj.navNodes" 
        :default-open="nodeObj.defaultOpen"
        :show-parent-url="nodeObj.showParentUrl"
        />
    </nav>
    <SidebarNav v-if="socialNodes" label="Find me here" :nav-nodes="socialNodes" class="text-black/70 dark:text-white/70" />
  </aside>
</template>