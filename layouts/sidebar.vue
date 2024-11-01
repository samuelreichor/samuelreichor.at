<script setup lang="ts">
  const props = defineProps({
    debug: {
      type: Boolean,
      default: () => false,
    }
  })

  const isOpen = ref(false)
  function toggleNav() {
    isOpen.value = !isOpen.value;
  }
</script>

<template>
  <div :class="['container min-h-[calc(100vh-var(--nav-height))]', props.debug && '[&_>div]:border']">
    <div class="col-start-1 md:col-end-4 lg:col-end-3 max-md:hidden">
      <div class="sticky top-[var(--nav-height)] max-h-[calc(100vh-var(--nav-height))] overflow-y-auto py-8">
        <SidebarLeft :nav-nodes="[{ url: 'test', title: 'Hallo' }]" />
      </div>
    </div>
    <div class="col-span-full md:col-start-4 md:col-end-13 lg:col-start-3 lg:col-end-11">
      <div class="py-8 h-[300vh]">
        aöldkjfaölsdk
      </div>
    </div>
    <div class="col-span-full max-lg:order-first lg:col-start-11 lg:col-end-13">
      <div class="sticky top-[var(--nav-height)] max-h-[calc(100vh-var(--nav-height))] overflow-y-auto py-2 lg:py-8">
        <SidebarRight :nav-nodes="[{url: 'test', title: 'Hallo'}]" />
      </div>
    </div>
  </div>
</template>