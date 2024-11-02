<script setup lang="ts">
  const colorMode = useColorMode()
  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  })

  const isOpen = ref(false)
  function toggleNav() {
    isOpen.value = !isOpen.value
  }

  function closeOnEsc() {
    window.addEventListener('keydown', (e) => { 
      if (e.key === 'Escape') {
        isOpen.value = false;
      }
    })
  }
  onMounted(() => {
    closeOnEsc();
  })
</script>

<template>
  <div v-if="isOpen" class="h-[var(--nav-height)]"></div>
  <header
    :class="['flex top-0 left-0 right-0 gap-8 justify-between w-full py-6 max-md:flex-wrap bg-background z-[1000]', isOpen ? 'fixed outside-container' : 'sticky']">
    <a href="#main"
      class="absolute h-full left-0 right-0 -top-[20rem] focus:top-0 inline-flex items-center justify-center bg-muted opacity-95 font-bold">
      Skip Navigation
    </a>
    <NuxtLink to="/" class="font-bold">
      SR
    </NuxtLink>
    <div :class="['flex gap-3 md:gap-10 max-md:w-full max-md:flex-col', !isOpen && 'max-md:hidden']">
      <NuxtLink to="/blog">
        Blog
      </NuxtLink>
      <NuxtLink to="/projects">
        Projects
      </NuxtLink>
      <NuxtLink to="/libraries">
        Libraries
      </NuxtLink>
    </div>
    <div class="flex gap-4 md:gap-8 items-center">
      <div :class="['flex gap-8 items-center', !isOpen && 'max-md:hidden']">
        <NuxtLink href="https://github.com/samuelreichor" :external="true" target="_blank">
          <Icon name="github" size="lg" />
        </NuxtLink>
      </div>
      <div :class="['flex gap-8 items-center max-md:absolute max-md:top-5', isOpen ? 'max-md:right-5' : 'right-0' ]">
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
    </div>
  </header>
</template>

<style lang="postcss">
  :root {
    --nav-height: 72px;

    @screen md {
      --nav-height: 80px;
    }
  }
</style>
