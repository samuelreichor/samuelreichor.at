<script setup lang="ts">
  import type { NavItem } from '@nuxt/content';
  import removeDuplicateChildren from '~/assets/utils/utils';
  import Card from '~/components/card/card.vue';

  const craftPackages = queryContent('libraries').where({ type: 'craft' })
  const npmPackages = queryContent('libraries').where({ pkg: true, type: 'npm' })

  const { data: navigationCraft } = await useAsyncData('navigationCraft', () => fetchContentNavigation(craftPackages))
  const { data: navigationNpm } = await useAsyncData('navigationNpm', () => fetchContentNavigation(npmPackages))

  if (navigationNpm.value) {
    navigationNpm.value = removeDuplicateChildren(navigationNpm.value);
  }
  if (navigationCraft.value) {
    navigationCraft.value = removeDuplicateChildren(navigationCraft.value);
  }

  const nodes = [
    {
      navNodes: navigationNpm.value?.[0].children,
      label: 'NPM Packages',
      showChilds: false,
    },
    {
      navNodes: navigationCraft.value?.[0].children,
      label: 'Craft Cms Plugins',
      showChilds: false,
    }
  ]
</script>

<template>
  <NuxtLayout name="sidebar">
    <template v-slot:sidebarleft>
      <SidebarLeft :nodes="nodes"/>
    </template>
    <template v-slot:main>
      <div>
        <p class="text-4xl md:text-6xl max-w-font-bold leading-tight">
          Welcome to the <span class="text-highlight-500">Library</span> Hub!
        </p>
        <p class="mt-8 max-w-[750px]">
          Here, you'll discover a comprehensive overview of all the libraries that I actively maintain and continually
          update.
        </p>
      </div>
      <h2 v-if="navigationNpm" class="text-2xl mb-6 mt-10 md:mt-16">Npm Packages</h2>
      <section v-if="navigationNpm" id="npm-packages" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card v-for="pkg in navigationNpm[0].children" :key="pkg.title" :badge="pkg.badge" :link="pkg._path"
          :headline="pkg.title" :icon="pkg.icon" :description="pkg.description" />
      </section>
      <h2 v-if="navigationCraft" class="text-2xl mb-6 mt-10">Craft CMS Plugins</h2>
      <section v-if="navigationCraft" id="craft-plugins" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card v-for="pkg in navigationCraft[0].children" :key="pkg.title" :badge="pkg.badge" :link="pkg._path"
          :headline="pkg.title" :icon="pkg.icon" :description="pkg.description" />
      </section>
    </template>
  </NuxtLayout>
</template>