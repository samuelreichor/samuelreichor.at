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
    link: {
      type: Object as PropType<Link>,
      default: () => undefined,
    }
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
      <p class="mt-8">{{ props.description }}</p>

      <div class="flex gap-4 mt-10">
        <UButton 
          v-for="(link, index) in cta" 
          :key="index"
          :color="index % 2 ? 'gray' : 'primary'" 
          :to="link.url"
        >
        {{ link.text }}
      </UButton>
      </div>

<!--       <NuxtLink 
        v-if="props.link" 
        :href="props.link.url" 
        :target="props.link.target ?? '_self'" 
        class="inline-flex items-start font-semibold text-highlight-500 text-lg mt-10"
        >
        {{ props.link.text }}
        <Icon name="arrow" class="rotate-45 inline" size="base"/>
      </NuxtLink> -->
    </div>
  </div>
</template>
