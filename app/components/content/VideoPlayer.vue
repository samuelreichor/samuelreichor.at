<script setup lang="ts">
const props = defineProps<{ src: string; alt?: string }>()
const videoRef = ref<HTMLVideoElement>()

onMounted(() => {
  const el = videoRef.value
  if (!el) return

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
  <video ref="videoRef" :alt="alt" class="w-full overflow-hidden rounded-[6px]" />
</template>
