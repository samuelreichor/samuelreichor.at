<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  badge?: string
}>(), {
  title: 'Samuel Reichör',
  description: '',
  badge: '',
})
</script>

<template>
  <div
    class="w-full h-full flex flex-col"
    style="background: #020817; color: white; padding: 72px; font-family: Inter, sans-serif;"
  >
    <div class="flex items-center" style="margin-bottom: 32px;">
      <div class="flex" style="font-size: 28px; color: #94a3b8; font-weight: 500;">
        samuelreichor.at
      </div>
    </div>

    <div class="flex flex-col" style="flex: 1; justify-content: center;">
      <div class="flex items-center" style="margin-bottom: 28px;">
        <div
          class="flex"
          style="font-size: 72px; font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; max-width: 1000px;"
        >
          {{ title }}
        </div>
        <div
          v-if="badge"
          class="flex"
          style="margin-left: 24px; padding: 8px 20px; background: #3c83f6; color: white; border-radius: 999px; font-size: 26px; font-weight: 600;"
        >
          {{ badge }}
        </div>
      </div>
      <div
        v-if="description"
        class="flex"
        style="font-size: 32px; color: #cbd5e1; max-width: 1000px; line-height: 1.35; font-weight: 400;"
      >
        {{ description }}
      </div>
    </div>

    <div class="flex items-center" style="margin-top: 32px;">
      <div class="flex" style="font-size: 24px; color: #94a3b8; font-weight: 500;">
        Samuel Reichör · Fullstack Developer
      </div>
    </div>
  </div>
</template>
