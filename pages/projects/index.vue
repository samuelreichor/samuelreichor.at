<script setup lang="ts">
  const { page } = await useCustomNavs('/projects')

  useHead({
    title: 'Samuel Reichör | Projects',
    meta: [
      {
        name: 'description',
        content:
          'Browse a selection of website projects crafted by Samuel Reichör, showcasing expertise in frontend development, seamless user experiences, and modern web design.',
      },
    ],
  })
</script>

<template>
  <NuxtLayout name="full">
    <HeroSimple :headline="page?.title ?? 'Not Implemented'" :description="page?.description" />
    <div class="markdown-rte max-w-text">
      <ContentDoc />
    </div>
  </NuxtLayout>
</template>