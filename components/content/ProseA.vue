<template>
  <NuxtLink class="text-highlight-500 underline underline-offset-[3px] decoration-transparent hover:decoration-inherit"
    :href="props.href" :target="props.target">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue'

  const props = defineProps({
    href: {
      type: String,
      default: ''
    },
    target: {
      type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
      default: undefined,
      required: false
    }
  })
</script>