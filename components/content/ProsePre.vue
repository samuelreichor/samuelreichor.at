<template>
  <div class="bg-muted rounded-lg border border-contrast shadow-sm margin-bottom">
    <div v-if="$props.filename"
      class="font-mono text-sm bg-background py-3 px-4 rounded-t-lg text-black dark:text-white !mb-0 !flex w-full items-center justify-between">
      <span>
        {{ $props.filename }}
      </span>
      <button v-if="$props.filename" class="group" @click="copy(code)">
        <span class="sr-only">Copy code to clipboard</span>
        <Icon v-if="!copied" class="group-hover:text-highlight-500 transition-colors" name="copy" size="sm" />
        <Icon v-else class="group-hover:text-highlight-500 transition-colors" name="copy-complete" size="sm" />
      </button>
    </div>
    <div class="!mb-0 relative">
      <button v-if="!$props.filename" class="group absolute top-4 right-4" @click="copy(code)">
        <span class="sr-only">Copy code to clipboard</span>
        <Icon v-if="!copied" class="group-hover:text-highlight-500 transition-colors" name="copy" size="sm" />
        <Icon v-else class="group-hover:text-highlight-500 transition-colors" name="copy-complete" size="sm" />
      </button>
      <pre :class="{
        'p-4 mt-0 overflow-scroll': true,
        [$props.class as string]: true,
        'rounded-t-none': $props.filename,
      }"><slot /></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useClipboard } from '@vueuse/core';
  const { copy, copied } = useClipboard();

  const props = defineProps({
    code: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: null,
    },
    filename: {
      type: String,
      default: null,
    },
    highlights: {
      type: Array as () => number[],
      default: () => [],
    },
    meta: {
      type: String,
      default: null,
    },
    class: {
      type: String,
      default: null,
    },
  });
</script>

<style>
  pre code .line {
    display: block;
  }
</style>
