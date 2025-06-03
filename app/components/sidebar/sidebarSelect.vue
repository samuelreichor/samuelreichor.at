<script setup lang="ts">
  const countries = [{
    name: 'Craft Query API',
    value: 'craft-query-api'
  }, {
    name: 'Canada',
    value: 'CA',
  }, {
    name: 'Mexico',
    value: 'MX'
  }]

  const country = ref('craft-query-api')
</script>

<template>
  <div>
    <USelect v-model="country" :options="countries" option-attribute="name" />
  </div>
</template>
