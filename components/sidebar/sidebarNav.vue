<script setup lang="ts">
  import type { NavNode } from './types'
  
  const props = defineProps({
    navNodes: {
      required: true,
      type: Array as PropType<NavNode[]>
    },
  })
</script>

<template>
  <nav>
    <ul class="mt-4 space-y-1">
      <li v-for="node in navNodes">
        <a :href="node.url" v-bind:target="node.target" class="flex gap-2">
          <Icon v-if="node.icon" :name="node.icon" size="lg" />
          {{ node.title }}
        </a>
      </li>
    </ul>
  </nav> 
</template>