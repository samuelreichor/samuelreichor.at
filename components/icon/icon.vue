<script lang="ts" setup>
  const props = defineProps({
    name: {
      required: true,
      type: String,
    },
    size: {
      type: String as PropType<SizeVariants>,
      default: () => 'base'
    }
  });

  const sizes = {
    sm: '',
    md: '',
    base: 'w-5 h-auto',
    lg: 'w-6 h-auto',
    xl: '',
  }

  type SizeVariants = keyof typeof sizes;

  async function loadIconAsComponent(name: string) {
    try {
      // Load module info for all svg icons
      // Note: This uses Vite-specific functionality, see <https://vitejs.dev/guide/features#glob-import>
      const allIconsAsModules = import.meta.glob<Component>('/assets/svg/*.svg', {
        query: 'component', // Import as Vue component - via "vite-svg-loader"
        eager: false, // Lazy-loaded
      });
      const iconComponent = await allIconsAsModules[`/assets/svg/${name}.svg`]();
      return iconComponent;
    } catch {
      console.error(
        `Icon with the name '${name}' does not exist in the '/assets/svg/' folder.`,
      );
    }
  }
  const iconComponent = ref<Component>();
  iconComponent.value = await loadIconAsComponent(props.name);

  watch(
    () => props.name,
    async (newName) => {
      iconComponent.value = await loadIconAsComponent(newName);
    },
  );
</script>

<template>
  <Suspense>
    <component :is="iconComponent" :class="[sizes[props.size], $attrs.class]" />
  </Suspense>
</template>
