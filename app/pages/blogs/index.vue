<script setup lang="ts">
  import type { ContentNavigationItem } from '@nuxt/content';

  const { data: blogs } = await useAsyncData('blog', async () => {
    return queryCollection('blog')
      .select('tags', 'title', 'description', 'datePublished', 'readingTime', 'imgPath', 'path')
      .order('datePublished', 'DESC')
      .all()
  }, { default: () => [] })

  const blogs2026 = computed(() => blogs.value.filter(b => new Date(b.datePublished).getFullYear() === 2026))
  const blogs2025 = computed(() => blogs.value.filter(b => new Date(b.datePublished).getFullYear() === 2025))

  useHead({
    title: 'Samuel Reichör | Blog Articles',
    meta: [
      {
        name: 'description',
        content:
          'Samuel Reichör`s writing hub featuring opinions on tech topics, tutorials, and latest news about the fast moving tech space.',
      },
    ],
  })

  const socialNodes = inject<ContentNavigationItem[]>('socialMediaObj')
</script>

<template>
  <NuxtLayout name="sidebar">
    <template v-slot:sidebarleft>
      <aside class="flex items-end h-full">
        <SidebarNav v-if="socialNodes" label="Find me here" :nav-nodes="socialNodes" />
      </aside>
    </template>
    <template v-slot:main>
      <div>
        <Headline text="Welcome to the Blog Hub!" target="Blog" size="h1" />
        <p class="mt-6 md:mt-8 max-w-[750px]">
          Here you can find blogs featuring opinions on tech topics, tutorials, and latest news about the fast moving
          tech space.
        </p>
      </div>

      <Headline v-if="blogs2026.length > 0" text="2026" size="h2" class="mb-6 mt-10" />
      <section v-if="blogs2026.length > 0" class="grid gap-4">
        <Card v-for="blog in blogs2026" :key="blog.title" :link="blog.path" :headline="blog.title"
          :description="blog.description" :datePublished="blog.datePublished" :readingTime="blog.readingTime"
          :imgPath="blog.imgPath" />
      </section>

      <Headline v-if="blogs2025.length > 0" text="2025" size="h2" class="mb-6 mt-10" />
      <section v-if="blogs2025.length > 0" class="grid gap-4">
        <Card v-for="blog in blogs2025" :key="blog.title" :link="blog.path" :headline="blog.title"
          :description="blog.description" :datePublished="blog.datePublished" :readingTime="blog.readingTime"
          :imgPath="blog.imgPath" />
      </section>
    </template>
  </NuxtLayout>
</template>