<script lang="ts" setup>
  import type { TocLink } from '@nuxt/content';
  import { useActiveScroll } from 'vue-use-active-scroll'

  const props = defineProps({
    tocLinks: {
      type: Array as PropType<TocLink[]>,
      required: true,
    }
  })

  const ids = computed(() =>
    props.tocLinks.flatMap(({ id, children = [] }) => [
      id,
      ...children.map(({ id }) => id), // Flatten any nested link
    ])
  )

  const { setActive, activeId } = useActiveScroll(ids, {
    overlayHeight: 120,
  })

  const isOpen = ref(false)
  function toggleNav() {
    isOpen.value = !isOpen.value;
  }
</script>

<template>
  <div v-if="props.tocLinks.length > 0">
    <button @click="toggleNav()"
      class="font-bold max-lg:flex max-lg:justify-between max-lg:w-full max-lg:bg-muted max-lg:p-3 max-lg:rounded-md lg:text-sm">
      Table of Contents
      <Icon :class="['lg:hidden transition-transform', isOpen ? 'rotate-[270deg]' : 'rotate-180']" name="chevron" />
    </button>
    <div v-show="isOpen" class="mt-4 md:mt-2 lg:!block text-sm">
      <ul class="space-y-1 text-nav-node">
        <li v-for="(link, index) in props.tocLinks" :key="index">
          <NuxtLink @click="setActive(link.id)" :to="`#${link.id}`"
            :class="{ 'lg:!text-highlight-500': activeId === link.id }">
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>

      <hr class="border-t-contrast mb-0 md:mt-6 lg:hidden">
    </div>
  </div>
</template>

<style scoped>
  a {
    @apply text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white transition-colors;
  }
</style>