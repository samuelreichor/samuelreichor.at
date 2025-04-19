<script setup lang="ts">
  import type { NavItem } from '@nuxt/content';

  const props = defineProps({
    navNodes: {
      required: true,
      type: Array as PropType<NavItem[] | undefined>
    },
    label: {
      type: String,
      default: () => '',
    },
    showParentUrl: {
      type: Boolean,
      default: () => true,
    },
    defaultOpen: {
      type: Boolean,
      default: () => true,
    },
    showChilds: {
      type: Boolean,
      default: () => true,
    }
  })
</script>

<template>
  <div v-if="props.navNodes">
    <h5 class="text-sm font-bold">{{ props.label }}</h5>
    <ul class="mt-3 space-y-1 text-sm text-nav-node">
      <li v-for="(node, index) in props.navNodes" :key="index">
        <details v-if="node.children?.length && props.showChilds" class="group" :open="props.defaultOpen">
          <summary class="flex items-center justify-between cursor-pointer">
            <div v-if="!props.showParentUrl" class="flex gap-2 items-center cursor-pointer">
              <Icon v-if="node.icon" :name="node.icon" size="sm" class="shrink-0" />
              {{ node.title }}
            </div>
            <NuxtLink v-else :href="node._path" :target="node.target" class="flex gap-2 items-center cursor-pointer">
              <Icon v-if="node.icon" :name="node.icon" size="sm" class="shrink-0" />
              {{ node.title }}
            </NuxtLink>
            <div>
              <Icon name="chevron" class="rotate-180 transition-transform group-open:rotate-[270deg] cursor-pointer" />
            </div>
          </summary>
          <ul class="pl-3 border-l-2 border-contrast space-y-1 mt-2 mb-6">
            <li v-for="(child, index) in node.children" :key="index">
              <NuxtLink :href="child._path" v-bind:target="child.target" class="flex gap-2 items-center">
                <Icon v-if="child.icon" :name="child.icon" size="sm" class="shrink-0" />
                {{ child.title }}
              </NuxtLink>
            </li>
          </ul>
        </details>
        <NuxtLink v-else :href="node._path" v-bind:target="node.target" class="flex gap-2 items-center">
          <Icon v-if="node.icon" :name="node.icon" size="sm" class="shrink-0" />
          {{ node.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .router-link-active {
    @apply !text-highlight-500 hover:!text-highlight-500;
  }
</style>