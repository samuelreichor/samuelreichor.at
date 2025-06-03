<script setup lang="ts">
  import type { Headline, Link } from '~/types/types';

  const props = defineProps({
    headline: {
      type: Object as PropType<Headline>,
      required: true,
    },
    description: {
      type: String,
      default: () => '',
    },
    cta: {
      type: Array as PropType<Link[]>,
      default: () => undefined,
    },
  });

</script>

<template>
  <div v-if="props.headline" class="container">
    <div class="col-span-full md:col-span-8">
      <Headline 
        tag="h1" 
        size="h1" 
        :text="props.headline.text" 
        :target="props.headline.target" 
      />
      <p class="mt-6 md:mt-8">{{ props.description }}</p>

      <div class="flex gap-4 mt-8 md:mt-10">
        <UButton 
          v-for="(link, index) in cta" 
          :key="index"
          :color="index % 2 ? 'gray' : 'primary'" 
          :to="link.url"
        >
        {{ link.text }}
      </UButton>
      </div>
    </div>
  </div>
</template>
