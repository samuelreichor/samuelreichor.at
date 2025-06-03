<script setup lang="ts">
  const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-t-contrast">
    <p class="text-center py-4 text-sm text-dimmed">
      Copyright © {{ year }} Samuel Reichör
    </p>
  </footer>
</template>