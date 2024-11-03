<script setup lang="ts">
  import type { NavItem } from '@nuxt/content';
  import removeDuplicateChildren from './utils/utils';
  
  const { data: nav } = await useAsyncData('navigation', () => fetchContentNavigation())

  if (nav.value) {
    provide('navigationObj', removeDuplicateChildren(nav.value))
  }

  const socialMediaObj: NavItem[] = [
    {
      _path: 'https://github.com/samuelreichor',
      title: 'Github',
      target: '_blank',
      icon: 'github'
    },
    {
      _path: 'https://discordapp.com/users/samuelreichoer',
      title: 'Discord',
      target: '_blank',
      icon: 'discord'
    },
    {
      _path: 'https://medium.com/@samuelreichor',
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
    <div id="main">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>
