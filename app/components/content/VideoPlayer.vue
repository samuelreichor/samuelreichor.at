<script setup lang="ts">
const props = withDefaults(defineProps<{ src: string; alt?: string; aspect?: string }>(), {
  aspect: '838/540',
})

const videoRef = ref<HTMLVideoElement>()
const loaded = ref(false)

onMounted(() => {
  const el = videoRef.value
  if (!el) return

  el.addEventListener('playing', () => { loaded.value = true }, { once: true })

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        el.muted = true
        el.loop = true
        el.playsInline = true
        el.src = props.src
        el.play()
        observer.disconnect()
      }
    },
    { rootMargin: '200px' }
  )

  observer.observe(el)
})
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-[6px] bg-muted" :style="{ aspectRatio: aspect }">
    <div v-if="!loaded" class="absolute inset-0 flex items-center justify-center">
      <Icon name="loading" class="text-dimmed w-6 h-6" />
    </div>
    <video ref="videoRef" :alt="alt" class="w-full" />
  </div>
</template>
