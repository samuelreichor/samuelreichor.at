<template>
  <div class="container min-h-[calc(100vh-var(--nav-height))]">
    <div class="col-span-3 lg:col-span-2 max-md:hidden">
      <div
        class="sticky top-(--nav-height) max-h-[calc(100vh-var(--nav-height))] h-full overflow-y-auto py-8 no-scroll-bar">
        <slot name="sidebarleft" />
      </div>
    </div>
    <div class="col-span-full md:col-span-7 lg:col-span-6">
      <div class="py-8">
        <slot name="main" />
      </div>
    </div>
    <div v-if="$slots.sidebarright" class="col-span-full max-lg:order-first lg:col-span-2">
      <div
        class="sticky top-(--nav-height) max-h-[calc(100vh-var(--nav-height))] overflow-y-auto py-2 lg:py-8 no-scroll-bar h-full">
        <slot name="sidebarright" />
      </div>
    </div>
  </div>
</template>
