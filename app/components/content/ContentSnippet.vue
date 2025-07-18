<script setup lang="ts">
  const props = defineProps({
    slug: {
      type: String,
      required: true
    }
  })

  const { data: snippet, error } = await useAsyncData(props.slug, () =>
    queryCollection('snippets')
      .path(`/_snippets/${props.slug}`)
      .first()
  )

  if(error.value) throw new Error(error.value.message)
</script>

<template>
  <ContentRenderer v-if="snippet" :value="snippet" />
</template>
