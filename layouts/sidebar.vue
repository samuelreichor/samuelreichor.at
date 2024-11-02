<template>
  <div :class="['container min-h-[calc(100vh-var(--nav-height))]']">
    <div class="col-start-1 md:col-end-4 lg:col-end-3 max-md:hidden">
      <div class="sticky top-[var(--nav-height)] max-h-[calc(100vh-var(--nav-height))] h-full overflow-y-auto py-8">
        <slot name="sidebarleft" />
      </div>
    </div>
    <div class="col-span-full md:col-start-4 md:col-end-11 lg:col-start-3 lg:col-end-9">
      <div class="py-8">
        <slot name="main" />
      </div>
    </div>
    <div class="col-span-full max-lg:order-first lg:col-start-9 lg:col-end-11">
      <div class="sticky top-[var(--nav-height)] max-h-[calc(100vh-var(--nav-height))] overflow-y-auto py-2 lg:py-8">
        <slot name="sidebarright" />
      </div>
    </div>
  </div>
</template>