<script setup lang="ts">
  import type { ContentNavigationItem } from '@nuxt/content';

  const { data: craftPlugins } = await useAsyncData(`craftPlugins`, async () => {
    return queryCollection('docs').select('badge', 'path', 'title', 'icon', 'description').where('type', '=', 'craft').all()
  }, { default: () => [] });

  const { data: npmPackages } = await useAsyncData(`npmPackages`, async () => {
    return queryCollection('docs').select('badge', 'path', 'title', 'icon', 'description').where('type', '=', 'npm').all()
  }, { default: () => [] });

  const nodes = [
    {
      navNodes: craftPlugins.value as ContentNavigationItem[],
      label: 'Craft CMS Plugins',
      showChilds: false,
    },
    {
      navNodes: npmPackages.value as ContentNavigationItem[],
      label: 'NPM Packages',
      showChilds: false,
    },
  ]

  useHead({
    title: 'Samuel Reichör | Libraries',
    meta: [
      {
        name: 'description',
        content:
          'Explore a complete list of libraries actively maintained and regularly updated by Samuel Reichör, covering the latest in frontend development tools and best practices.',
      },
    ],
  })
</script>

<template>
  <NuxtLayout name="sidebar">
    <template v-slot:sidebarleft>
      <SidebarLeft :nodes="nodes" :show-select="false" />
    </template>
    <template v-slot:main>
      <div>
        <Headline text=" Welcome to the Library Hub!" target="Library" size="h1" />

        <p class="mt-6 md:mt-8 max-w-[750px]">
          Here, you'll discover a comprehensive overview of all the libraries that I actively maintain and continually
          update.
        </p>
      </div>
      <h2 v-if="craftPlugins.length > 0" class="text-2xl mb-6 mt-10">Craft CMS Plugins</h2>
      <section v-if="craftPlugins.length > 0" id="craft-plugins" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card v-for="pkg in craftPlugins" :key="pkg.title" :badge="pkg.badge" :link="pkg.path" :headline="pkg.title"
          :icon="pkg.icon" :description="pkg.description" />
      </section>
      <h2 v-if="npmPackages.length > 0" class="text-2xl mb-6 mt-10 md:mt-16">Npm Packages</h2>
      <section v-if="npmPackages.length > 0" id="npm-packages" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card v-for="pkg in npmPackages" :key="pkg.title" :badge="pkg.badge" :link="pkg.path" :headline="pkg.title"
          :icon="pkg.icon" :description="pkg.description" />
      </section>
    </template>
  </NuxtLayout>
</template>