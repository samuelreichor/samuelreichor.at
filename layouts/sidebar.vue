<template>
  <div :class="['container min-h-[calc(100vh-var(--nav-height))]']">
    <div class="col-start-1 md:col-end-4 sidebar:col-end-3 max-md:hidden">
      <div class="sticky top-[var(--nav-height)] max-h-[calc(100vh-var(--nav-height))] h-full overflow-y-auto py-8">
        <slot name="sidebarleft" />
      </div>
    </div>
    <div class="col-span-full md:col-start-4 md:col-end-13 sidebar:col-start-3 sidebar:col-end-11">
      <div class="py-8">
        <slot name="main" />
      </div>
    </div>
    <div class="col-span-full max-sidebar:order-first sidebar:col-start-11 sidebar:col-end-13">
      <div class="sticky top-[var(--nav-height)] max-h-[calc(100vh-var(--nav-height))] overflow-y-auto py-2 lg:py-8">
        <slot name="sidebarright" />
      </div>
    </div>
  </div>
</template>