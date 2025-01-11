<script setup lang="ts">
const props = defineProps({
  headline: {
    type: String,
    default: '',
  },
  badge: {
    type: Boolean,
    default: () => false,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
  readingTime: {
    type: String,
    default: '',
  },
  datePublished: {
    type: String,
    default: '',
  },
})

function formatDate(date: string) {
  const dateObj = new Date(date);

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(dateObj);

}
</script>

<template>
  <component :is="props.link ? 'a' : 'div'" v-bind:href="props.link"
    class="bg-muted rounded-md p-4 md:px-6 md:py-8 relative">
    <span v-if="props.badge"
      class="absolute right-4 md:right-6 top-4 md:top-8 text-white text-xs uppercase bg-highlight-500 px-2 py-1 rounded">New</span>
    <div v-if="props.icon" class="w-10 h-10 rounded-md bg-contrast flex items-center justify-center mb-6">
      <Icon :name="props.icon" size="lg" />
    </div>
    <h3 class="text-lg !font-medium leading-tight inline" v-if="props.headline">{{ props.headline }}</h3>
    <p class="mt-3 text-slate-700 dark:text-slate-300 font-normal">
      {{ props.description }}
    </p>
    <div v-if="props.readingTime && props.datePublished" class="mt-6 text-sm text-slate-700 dark:text-slate-300">
      <span>{{ formatDate(props.datePublished) }} - {{ props.readingTime }}</span>
    </div>
  </component>
</template>