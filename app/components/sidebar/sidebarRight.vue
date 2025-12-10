<script lang="ts" setup>
  import type { TocLink } from '@nuxt/content';
  import { useActiveScroll } from 'vue-use-active-scroll'

  type AddLink = {
    icon: string;
    text: string;
    url: string;
    target?: string;
  }
  const props = defineProps({
    tocLinks: {
      type: Array as PropType<TocLink[]>,
      required: true,
    },
    addLinks: {
      type: Array as PropType<AddLink[]>,
      default: () => [],
    },
    pageTitle: {
      type: String,
      default:  '',
    },
  })

  const ids = computed(() =>
    props.tocLinks.flatMap(({ id, children = [] }) => [
      id,
    ])
  )

  const { setActive, activeId } = useActiveScroll(ids, {
    overlayHeight: 120,
  })

  const isOpen = ref(false)
  function toggleNav() {
    isOpen.value = !isOpen.value;
  }

  function constructFeedbackUrl(title: string) {
    const currentGHUrl = getCurrentGHBaseUrl();
    return currentGHUrl + '/issues/new?template=feature_request.yaml&title=[Docs]: ' + title
  }
</script>

<template>
  <div v-if="props.tocLinks.length > 0">
    <button @click="toggleNav()"
      class="font-bold max-lg:flex max-lg:justify-between max-lg:w-full max-lg:bg-muted max-lg:p-3 max-lg:rounded-md lg:text-sm">
      On this page
      <Icon :class="['lg:hidden transition-transform my-auto', isOpen ? 'rotate-270' : 'rotate-180']" name="chevron" />
    </button>
    <div v-show="isOpen" class="mt-4 md:mt-2 lg:block! text-sm">
      <ul class="space-y-1 text-nav-node">
        <li v-for="(link, index) in props.tocLinks" :key="index">
          <NuxtLink @click="setActive(link.id)" :to="`#${link.id}`"
            :class="{ 'lg:text-highlight-500!': activeId === link.id }">
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>

      <hr class="border-t-contrast mb-0! md:mt-6! lg:hidden">
    </div>
  </div>
  <div v-if="(props.addLinks && props.addLinks.length > 0) || props.pageTitle" class="max-lg:hidden">
    <hr class="border-t-contrast mt-6! mb-6!">
    <p class="font-bold text-sm">Useful links</p>
    <ul class="flex flex-col gap-1 text-sm mt-2">
      <li v-for="(node, index) in props.addLinks" :key="index">
        <NuxtLink :href="node.url" v-bind:target="node.target" class="flex gap-2 items-center">
          <Icon v-if="node.icon" :name="node.icon" size="sm" class="shrink-0" />
          {{ node.text }}
        </NuxtLink>
      </li>
      <li v-if="props.pageTitle">
        <NuxtLink :href="constructFeedbackUrl(props.pageTitle)" target="_blank" class="flex gap-2 items-center">
          <Icon name="github" size="sm" class="shrink-0" />
          Provide Feedback to this Page
        </NuxtLink>
      </li>
      <li v-if="getCurrentGHBaseUrl() !== 'https://github.com/samuelreichor'">
        <NuxtLink :href="getCurrentGHBaseUrl()" target="_blank" class="flex gap-2 items-center group">
          <Icon name="star" size="sm" class="shrink-0 [&_path]:fill-transparent transition-colors [&_path]:transition-colors group-hover:text-[#FFFF00] [&_path]:group-hover:fill-[#FFFF00]" />
          Star on GitHub
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  @reference "~/assets/css/tailwind.css";
  a {
    @apply text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white transition-colors;
  }
</style>
