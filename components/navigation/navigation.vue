<script setup lang="ts">
  import type { NavItem } from '@nuxt/content';
  const colorMode = useColorMode()
  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  })

  const navigation = inject<NavItem[]>('navigationObj');
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
  <header class="sticky top-0 left-0 right-0 z-[1000] flex justify-between py-6 bg-background">
    <NuxtLink to="/" class="font-bold z-20" @click="closeNavigation()">
      SR
    </NuxtLink>
    <div v-if="isOpen"
      class="w-full bg-background fixed bottom-0 left-0 right-0 top-[var(--nav-height)] min-h-[calc(100vh-var(--nav-height))] overflow-y-auto overscroll-contain z-10 md:hidden">
      <div class="outside-container">
        <LazyNavigationNodeTree :nav-nodes="navigation" @click-e="closeNavigation()" />
      </div>
    </div>
    <div v-else class="mx-auto hidden md:block">
      <ul class="flex gap-6">
        <li v-for="node in navigation">
          <NuxtLink :href="node._path">
            {{ node.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="absolute right-0 bottom-0 top-0 z-20 flex gap-4 items-center">
      <NuxtLink href="https://github.com/samuelreichor" :external="true" target="_blank">
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
        <Icon name="hamburger" size="lg" />
      </button>
    </div>
  </header>
</template>

<style>
  .router-link-active {
    color: theme('colors.highlight.500');
  } 

  :root {
    --nav-height: 72px;

    @screen md {
      --nav-height: 72px;
    }
  }
</style>
