<script lang="ts" setup>
  import type { NavNode } from './types'

  const props = defineProps({
    navNodes: {
      required: true,
      type: Array as PropType<NavNode[]>
    }
  })

  const isOpen = ref(false)
  function toggleNav() {
    isOpen.value = !isOpen.value;
  }

  const socialNodes: NavNode[] = [
    {
      url: 'https://github.com/samuelreichor',
      title: 'Github',
      target: '_blank',
      icon: 'github'
    },
    {
      url: 'not-implemented',
      title: 'Discord',
      target: '_blank',
      icon: 'discord'
    },
    {
      url: 'https://medium.com/@samuelreichor',
      title: 'Blog',
      target: '_blank',
      icon: 'medium'
    },
  ]
</script>

<template>
  <div>
    <button @click="toggleNav()"
      class="font-bold max-lg:flex max-lg:justify-between max-lg:w-full max-lg:bg-muted max-lg:p-3 max-lg:rounded-md">
      Table of Contents
      <Icon class="-rotate-90 lg:hidden" name="chevron" />
    </button>
    <div v-show="isOpen" class="mt-4 lg:!block">
      <SidebarNav :nav-nodes="props.navNodes" />
    </div>
    <SidebarNav class="pt-20 max-lg:hidden" :nav-nodes="socialNodes" />
  </div>
</template>