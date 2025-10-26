<script setup lang="ts">
  type VariantKey = 'note' | 'tip' | 'important' | 'warning' | 'caution';

  type Variant = {
    icon: string
    label: string
    class: string
  }

  defineProps({
    variant: {
      type: String as PropType<VariantKey>,
      default: () => 'note',
    }
  });

  const variants: Record<VariantKey, Variant> = {
    note: {
      icon: 'note',
      label: 'Note',
      class: 'text-highlight-500',
    },
    tip: {
      icon: 'tip',
      label: 'Tip',
      class: 'text-green-500',
    },
    important: {
      icon: 'important',
      label: 'Important',
      class: 'text-violet-500',
    },
    warning: {
      icon: 'warning',
      label: 'Warning',
      class: 'text-orange-400',
    },
    caution: {
      icon: 'caution',
      label: 'Caution',
      class: 'text-red-500',
    },
  };
</script>

<template>
  <div :class="[variants[variant].class, 'border-l-[3px] pl-4 py-1.5 border-l-current margin-bottom']">
    <div class="mb-0! flex gap-3 items-center">
      <Icon :name="variants[variant].icon" size="base" />
      <span class="font-medium">
        {{ variants[variant].label }}
      </span>
    </div>
    <div class="text-black dark:text-white **:mb-0! mt-1">
      <slot />
    </div>
  </div>
</template>
