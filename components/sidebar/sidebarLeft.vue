<script lang="ts" setup>
  import type { NavNode } from './types'

  const props = defineProps({
    navNodes: {
      required: true,
      type: Array as PropType<NavNode[]>,
    },
    packageArr: {
      type: Array as PropType<NavNode[]>,
      default: () => undefined,
    }
  })

</script>

<template>
  <div class="relative">
    <SidebarSelect class="m-0.5"/>
    <SidebarNav :nav-nodes="props.navNodes" />
  </div>
</template>