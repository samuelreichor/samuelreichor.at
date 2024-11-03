<script setup lang="ts">
  export type Relation = {
    _path: string,
    title: string,
    description: string,
  }
  const props = defineProps({
    relations: {
      type: Array as PropType<Relation[]>,
      required: true,
    }
  })
</script>
<template>
  <hr class="border-t-contrast my-default">
  <div v-if="props.relations" class="grid md:grid-cols-2 gap-4 md:gap-8">
    <div v-for="(relation, index) in props.relations" :key="index">
      <a v-if="relation" :href="relation._path"
        :class="['bg-muted rounded-md p-4 md:px-6 md:py-8 group block ml-auto', index === 1 && 'text-right']">
        <div
          class="h-10 w-10 bg-contrast border border-contrast rounded-full inline-flex justify-center items-center transition-colors group-hover:bg-highlight-500/10 group-hover:border-highlight-500">
          <Icon name="chevron"
            :class="[index === 1 && 'rotate-180', 'transition-colors group-hover:text-highlight-500']" size="lg" />
        </div>
        <p class="text-xl mt-5 text-black dark:text-white">
          {{ relation.title }}
        </p>

        <p :class="['text-sm mt-3 text-dimmed max-w-[75%]', index === 1 && 'ml-auto'] ">
          {{ relation.description }}
        </p>
      </a>
    </div>
  </div>
</template>