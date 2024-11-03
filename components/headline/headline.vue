<template>
    <component :is="props.tag">
        <span :class="computedClass" v-html="highlightedText"></span>
    </component>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps({
        text: {
            type: String,
            default: '',
        },
        target: {
            type: String,
            default: '',
        },
        tag: {
            type: String,
            default: 'h2',
        },
        size: {
            type: String as PropType<Sizes>,
            default: 'h2',
        },
    });

    const sizes = {
        h1: 'text-4xl md:text-5xl !leading-tight font-semibold',
        h1Small: 'text-4xl font-semibold',
        h2: 'text-2xl font-semibold',
    } as const;

    type Sizes = keyof typeof sizes;

    const computedClass = computed(() => sizes[props.size] || '');

    function escapeRegExp(string: string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters
    }

    const highlightedText = computed(() => {
        if (!props.target) return props.text;
        const escapedTarget = escapeRegExp(props.target);
        const regex = new RegExp(escapedTarget, 'gi'); // Case-insensitive match
        return props.text.replace(regex, '<span class="text-highlight-500">$&</span>');
    });
</script>
