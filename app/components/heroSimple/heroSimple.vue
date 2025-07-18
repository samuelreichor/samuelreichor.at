<script setup lang="ts">
  import type { Link } from '~/types/types';

  const props = defineProps({
    headline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: () => '',
    },
    label: {
      type: String,
      default: () => '',
    },
    link: {
      type: Object as PropType<Link>,
      default: () => undefined,
    },
    showBtns: {
      type: Boolean,
      default: () => true,
    }
  });

  const route = useRoute()
  const copyStatus = ref<'idle' | 'copying' | 'copied'>('idle')
  const items = ref([
    [{
      label: 'Copy Markdown Link',
      icon: 'link',
      click() {
        navigator.clipboard.writeText(`${window.location.origin}/raw${route.path}.md`)
      },
    }],
    [{
      label: 'View as Markdown',
      icon: 'markdown',
      target: '_blank',
      click() {
        window.open(`${window.location.origin}/raw${route.path}.md`, '_blank')
      },
    }],
    [{
      label: 'Open in ChatGPT',
      icon: 'chat-gpt',
      target: '_blank',
      click() {
        window.open(`https://chatgpt.com/?hints=search&q=${encodeURIComponent(`Read ${window.location.origin}/raw${route.path}.md so I can ask questions about it.`)}`, '_blank')
      },
    }],
    [{
      label: 'Open in Claude',
      icon: 'claude',
      target: '_blank',
      click() {
        window.open(`https://claude.ai/new?q=${encodeURIComponent(`Read ${window.location.origin}/raw${route.path}.md so I can ask questions about it.`)}`, '_blank')
      },
    }],
  ])

  const copyPage = async () => {
    copyStatus.value = 'copying'
    const markdown = await $fetch<string>(`${window.location.origin}/raw${route.path}.md`)
    await navigator.clipboard.writeText(markdown)
    copyStatus.value = 'copied'
    setTimeout(() => {
      copyStatus.value = 'idle'
    }, 2000)
  }

</script>

<template>
  <div v-if="props.headline">
    <div class="flex justify-between">
      <span class="text-base text-highlight-500 mb-4 block">{{ props.label }}</span>
      <UButtonGroup v-if="props.showBtns">
        <UButton :label="`${copyStatus === 'copied' ? 'Copied' : 'Copy Page'}`"
          :icon="`copy${copyStatus === 'copied' ? '-complete' : ''}`" color="white" variant="outline"
          class="text-sm px-3 transition-[filter] hover:brightness-95 dark:hover:brightness-125 bg-white dark:bg-muted text-gray-900 dark:text-white ring-1 ring-inset ring-contrast"
          :loading="copyStatus === 'copying'" @click="copyPage" />
        <UDropdown :items="items" :content="{
              align: 'end',
              side: 'bottom',
              sideOffset: 8,
  
            }" :ui="{
              content: 'w-48',
            }">
          <UButton icon="chevron-down" color="white" variant="outline"
            class="bg-white transition-[filter] hover:brightness-95 dark:hover:brightness-125 dark:bg-muted text-gray-900 dark:text-white ring-1 ring-inset ring-contrast" />
        </UDropdown>
      </UButtonGroup>
    </div>
    <Headline tag="h1" size="h1Small" :text="props.headline" />
    <p class="mt-6 text-lg text-dimmed">{{ props.description }}</p>
    <hr class="mt-8 mb-6 md:my-10">
  </div>
</template>
