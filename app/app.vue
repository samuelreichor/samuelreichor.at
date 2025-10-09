<script setup lang="ts">
  import type { ContentNavigationItem } from '@nuxt/content';
  import removeDuplicateChildren from './utils/utils';
  
  const { data: nav } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))

  if (nav.value) {
    provide('navigationObj', removeDuplicateChildren(nav.value))
  }

  const socialMediaObj: ContentNavigationItem[] = [
    {
      path: 'https://github.com/samuelreichor',
      title: 'Github',
      target: '_blank',
      icon: 'github'
    },
    {
      path: 'https://discordapp.com/users/samuelreichoer',
      title: 'Discord',
      target: '_blank',
      icon: 'discord'
    },
    {
      path: 'https://medium.com/@Coderabbit',
      title: 'Blog',
      target: '_blank',
      icon: 'medium'
    },
  ]

  provide('socialMediaObj', socialMediaObj)
</script>

<template>
  <NuxtLayout>
    <Navigation />
    <div id="main" class="min-h-[calc(100vh-var(--nav-height))]">
      <NuxtPage />
    </div>
    <Footer />
  </NuxtLayout>
</template>
