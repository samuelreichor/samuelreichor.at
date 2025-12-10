<script setup lang="ts">
defineProps<{
  link: string
}>()
</script>

<template>
  <UButton :href="link" target="_blank">
    Plugin Store 
    <Icon name="external-tab"/>
  </UButton>
</template>
