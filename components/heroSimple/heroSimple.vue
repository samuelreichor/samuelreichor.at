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
    }
  });

</script>

<template>
  <div v-if="props.headline">
    <span class="text-base text-highlight-500 mb-4 block">{{ props.label }}</span>
    <Headline tag="h1" size="h1Small" :text="props.headline" />
    <p class="mt-6 text-lg text-dimmed">{{ props.description }}</p>
    <hr class="mt-8 mb-6 md:my-10">
  </div>
</template>
