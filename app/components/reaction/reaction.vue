<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  slug: string
}>()

type ReactionKey = 'thumbsUp' | 'thumbsDown' | 'thinking' | 'rocket'
type ReactionState = Record<ReactionKey, number>

const loading = ref(false)
const counts = ref({
  reactions: {
    thumbsUp: 0,
    thinking: 0,
    rocket: 0,
    thumbsDown: 0,
  }
})
async function react(which: ReactionKey) {
  if (loading.value) return
  loading.value = true
  try {
    counts.value = await $fetch<{ reactions: ReactionState }>(`/reactions/${props.slug}`, {
      method: 'POST',
      body: { reaction: which }
    })
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  counts.value = await $fetch<{ reactions: ReactionState }>(`/reactions/${props.slug}`)
})

const classes = {
  btn: 'grow max-w-[88px] p-2 aspect-square bg-muted rounded-md border border-transparent hover:border-contrast transition-colors disabled:cursor-wait',
  emojiContainer: 'flex h-[calc(100%-28px)] items-center justify-center grow',
}
</script>

<template>
  <div class="mt-10">
    <Headline size="h2" text="Share your thoughts"/>

    <div class="flex gap-2 text-sm mt-6">
      <button
        :class="classes.btn"
        :disabled="loading"
        @click="react('thumbsUp')"
        aria-label="React with Thumbs Up"
      >
        <span :class="classes.emojiContainer">
          <span class="block md:scale-150">
            👍
          </span>
        </span>
        <span class="block">
          {{ counts?.reactions.thumbsUp ?? 0 }}
        </span>
      </button>
  
      <button
        :class="classes.btn"
        :disabled="loading"
        @click="react('rocket')"
        aria-label="React with rocket"
      >
        <span :class="classes.emojiContainer">
          <span class="block md:scale-150">
            🚀
          </span>
        </span> 
        <span class="block">
          {{ counts?.reactions.rocket ?? 0 }}
        </span>
      </button>
  
      <button
        :class="classes.btn"
        :disabled="loading"
        @click="react('thinking')"
        aria-label="React with thinking"
      >
        <span :class="classes.emojiContainer">
          <span class="block md:scale-150">
            🤔
          </span>
        </span> 
        <span class="block">
          {{ counts?.reactions.thinking ?? 0 }}
        </span>
      </button>
  
      <button
        :class="classes.btn"
        :disabled="loading"
        @click="react('thumbsDown')"
        aria-label="React with Thumbs Down"
      >
        <span :class="classes.emojiContainer">
          <span class="block md:scale-150">
            👎
          </span>
        </span> 
        <span class="block">
          {{ counts?.reactions.thumbsDown ?? 0 }}
        </span>
      </button>
    </div>
  </div>
</template>
