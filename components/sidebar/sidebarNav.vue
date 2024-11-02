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
    }
  })
</script>

<template>
  <div v-if="props.navNodes">
    <h5 class="text-sm font-bold">{{ props.label }}</h5>
    <ul class="mt-3 space-y-1">
      <li v-for="(node, index) in props.navNodes" :key="index">
        <details v-if="node.children?.length" class="group" :open="props.defaultOpen">
          <summary class="flex items-center justify-between cursor-pointer">
            <component :is="props.showParentUrl ? 'a' : 'div'" v-bind:href="node._path" v-bind:target="node.target"
              class="flex gap-2 items-center cursor-pointer">
              <Icon v-if="node.icon" :name="node.icon" size="sm" class="shrink-0" />
              {{ node.title }}
            </component>
            <div>
              <Icon name="chevron" class="rotate-180 transition-transform group-open:rotate-[270deg] cursor-pointer" />
            </div>
          </summary>
          <ul class="pl-3 border-l-2 border-muted space-y-1 mt-2 mb-6">
            <li v-for="(child, index) in node.children" :key="index">
              <a :href="child._path" v-bind:target="child.target" class="flex gap-2 items-center">
                <Icon v-if="child.icon" :name="child.icon" size="sm" class="shrink-0" />
                {{ child.title }}
              </a>
            </li>
          </ul>
        </details>
        <a v-else :href="node._path" v-bind:target="node.target" class="flex gap-2 items-center">
          <Icon v-if="node.icon" :name="node.icon" size="sm" class="shrink-0" />
          {{ node.title }}
        </a>
      </li>
    </ul>
  </div>
</template>