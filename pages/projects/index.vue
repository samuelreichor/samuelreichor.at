<script setup lang="ts">
  const { page } = await useCustomNavs('/projects')
</script>

<template>
  <NuxtLayout name="full">
    <HeroSimple :headline="page?.title ?? 'Not Implemented'" :description="page?.description" />
    <div class="markdown-rte max-w-text">
      <ContentDoc />
    </div>
  </NuxtLayout>
</template>