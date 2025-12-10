<script setup lang="ts">
  import type { ContentNavigationItem } from '@nuxt/content';
  const colorMode = useColorMode()
  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
      const themeColorMetaTags = [...document.querySelectorAll("#theme-color-meta")] as HTMLMetaElement[];

      if(colorMode.value === 'dark') {
        themeColorMetaTags.forEach(metaTag => {
          metaTag.content = '#fff'
        });
      } else {
        themeColorMetaTags.forEach(metaTag => {
          metaTag.content = '#020817'
        });
      }
    }
  })

  const { data: files } = await useAsyncData('search', () => queryCollectionSearchSections('docs'))
  const searchTerm = ref('')
  const route = useRoute()

  const isLibraryRoute = computed(() => route.path.startsWith('/libraries/'))

  // Filter files basierend auf aktueller Library
  const filteredFiles = computed(() => {
    if (!files.value) return []

    const libraryMatch = route.path.match(/^\/libraries\/([^\/]+)/)
    if (!libraryMatch) return files.value

    const currentLibrary = libraryMatch[1]
    return files.value.filter(file => file.id?.startsWith(`/libraries/${currentLibrary}`))
  })

  const navigation = inject<ContentNavigationItem[]>('navigationObj');
  const isOpen = ref(false)

  function toggleNav() {
    isOpen.value = !isOpen.value

    if(isOpen.value === true) {
      openNavigation()
    }

    if (isOpen.value === false) {
      closeNavigation()
    }
  }

  function closeNavigation() {
    isOpen.value = false;
    document.documentElement.classList.remove('overflow-hidden')
  }

  function openNavigation() {
    isOpen.value = true;
    document.documentElement.classList.add('overflow-hidden')
  }

  function closeOnEsc() {
    window.addEventListener('keydown', (e) => { 
      if (e.key === 'Escape') {
        closeNavigation()
      }
    })
  }

  onMounted(() => {
    closeOnEsc();
  })
</script>

<template>
  <header class="sticky top-0 left-0 right-0 z-1000 flex items-center justify-between py-6 bg-background">
    <div class="flex items-center gap-6 md:gap-8">
      <NuxtLink to="/" class="font-bold z-20" @click="closeNavigation()">
        SR
      </NuxtLink>
      <template v-if="isLibraryRoute">
        <UContentSearchButton
          :collapsed="false"
          class="w-40"
        />
        <ClientOnly>
          <UContentSearch
            v-model:search-term="searchTerm"
            :files="filteredFiles"
            :navigation="navigation"
            :color-mode="false"
            :fuse="{ resultLimit: 42 }"
          />
        </ClientOnly>
      </template>
    </div>
    <div v-if="isOpen"
      class="w-full bg-background fixed bottom-0 left-0 right-0 top-(--nav-height) min-h-[calc(100vh-var(--nav-height))] overflow-y-auto overscroll-contain z-10 md:hidden">
      <div class="outside-container">
        <LazyNavigationNodeTree :nav-nodes="navigation" @click-e="closeNavigation()" />
      </div>
    </div>
    <div v-else class="mx-auto hidden md:block">
      <ul class="flex gap-6">
        <li>
          <NuxtLink href="/blogs">
            Blog
          </NuxtLink>
        </li>
        <li v-for="node in navigation">
          <NuxtLink :href="node.path">
            {{ node.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="z-20 flex gap-4 items-center">
      <CraftBtn class="max-md:hidden" v-if="getCurrentPluginStoreLink()" :link="getCurrentPluginStoreLink() ?? ''"/>
      <NuxtLink :href="getCurrentGhUrl()" :external="true" target="_blank">
        <span class="sr-only">Click to open github profile</span>
        <Icon name="github" size="xl" />
      </NuxtLink>
      <ClientOnly>
        <UButton :icon="isDark ? 'moon' : 'sun'" color="gray" aria-label="Change Color Theme"
          @click="isDark = !isDark" />
        <template #fallback>
          <div class="w-8 h-8" />
        </template>
      </ClientOnly>
      <button @click="toggleNav()" class="md:hidden">
        <span class="sr-only">Click to toggle navigation</span>
        <Icon name="hamburger" size="lg" />
      </button>
    </div>
  </header>
</template>

<style>
  .router-link-active {
    color: var(--color-highlight-500);
  } 

  :root {
    --nav-height: 80px;
  }
</style>
