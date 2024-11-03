<script setup lang="ts">
import type { NavItem } from '@nuxt/content';

  const { data: craftPlugins } = await useAsyncData(`craftPlugins`, async () => {
    return queryContent('libraries').only(['badge', '_path', 'title', 'icon', 'description']).where({ type: 'craft' }).find()
  }, { default: () => [] });

  const { data: npmPackages } = await useAsyncData(`npmPackages`, async () => {
    return queryContent('libraries').only(['badge', '_path', 'title', 'icon', 'description']).where({ type: 'npm' }).find()
  }, { default: () => [] });

  const nodes = [
    {
      navNodes: npmPackages.value as NavItem[],
      label: 'NPM Packages',
      showChilds: false,
    },
    {
      navNodes: craftPlugins.value as NavItem[],
      label: 'Craft Cms Plugins',
      showChilds: false,
    }
  ]
</script>

<template>
  <NuxtLayout name="sidebar">
    <template v-slot:sidebarleft>
      <SidebarLeft :nodes="nodes" />
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
      <h2 v-if="npmPackages.length > 0" class="text-2xl mb-6 mt-10 md:mt-16">Npm Packages</h2>
      <section v-if="npmPackages.length > 0" id="npm-packages" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card v-for="pkg in npmPackages" :key="pkg.title" :badge="pkg.badge" :link="pkg._path"
          :headline="pkg.title" :icon="pkg.icon" :description="pkg.description" />
      </section>
      <h2 v-if="craftPlugins.length > 0" class="text-2xl mb-6 mt-10">Craft CMS Plugins</h2>
      <section v-if="craftPlugins.length > 0" id="craft-plugins" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card v-for="pkg in craftPlugins" :key="pkg.title" :badge="pkg.badge" :link="pkg._path"
          :headline="pkg.title" :icon="pkg.icon" :description="pkg.description" />
      </section>
    </template>
  </NuxtLayout>
</template>