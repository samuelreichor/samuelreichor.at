<script setup lang="ts">
  import type { ContentNavigationItem } from '@nuxt/content';

  const props = defineProps({
    navNodes: {
      required: true,
      type: Array as PropType<ContentNavigationItem[] | undefined>
    },
    showParentUrl: {
      type: Boolean,
      default: () => false,
    },
  })

  function openActiveNodeParents() {
    const activeLink = document.querySelector('.router-link-active');
    if (!activeLink) {
      return;
    }
    let currentNode = activeLink.closest('details');
    while (currentNode) {
      currentNode.setAttribute('open', '');
      if (currentNode?.parentElement) {
        currentNode = currentNode?.parentElement?.closest('details');
      }
    }
  }

  const emit = defineEmits(['clickE'])

  function emitClick() {
    emit('clickE')
  }

  onMounted(() => {
    openActiveNodeParents();
  });
</script>

<template>
  <ul class="mt-3 space-y-1 w-full text-lg">
    <li v-for="(node, index) in props.navNodes" :key="index">
      <details v-if="node.children?.length" class="group/node">
        <summary class="flex items-center justify-between cursor-pointer">
          <NuxtLink @click="emitClick()" :href="node.path" v-bind:target="node.target" class="flex gap-2 items-center">
            {{ node.title }}
          </NuxtLink>
          <div>
            <Icon name="chevron"
              class="rotate-180 transition-transform group-open/node:rotate-[270deg] cursor-pointer" />
          </div>
        </summary>
        <ul class="pl-3 border-l-2 border-contrast space-y-1 mt-2 mb-6">
          <li v-for="(child, index) in node.children" :key="index">
            <details v-if="child.children?.length" class="group/child">
              <summary class="flex items-center justify-between cursor-pointer">
                <NuxtLink @click="emitClick()" :href="child.path" v-bind:target="child.target"
                  class="flex gap-2 items-center">
                  {{ child.title }}
                </NuxtLink>
                <div>
                  <Icon name="chevron"
                    class="rotate-180 transition-transform group-open/child:rotate-[270deg] cursor-pointer" />
                </div>
              </summary>
              <ul class="pl-3 border-l-2 border-contrast space-y-1 mt-2 mb-6">
                <li v-for="(childChild, index) in child.children" :key="index">
                  <details v-if="childChild.children?.length" class="group/childChild">
                    <summary class="flex items-center justify-between cursor-pointer">
                      <div class="flex gap-2 items-center cursor-pointer">
                        {{ childChild.title }}
                      </div>
                      <div>
                        <Icon name="chevron"
                          class="rotate-180 transition-transform group-open/childChild:rotate-[270deg] cursor-pointer" />
                      </div>
                    </summary>
                    <ul class="pl-3 border-l-2 border-contrast space-y-1 mt-2 mb-6">
                      <li v-for="(childChildChild, index) in childChild.children" :key="index">
                        <NuxtLink @click="emitClick()" :href="childChildChild.path"
                          v-bind:target="childChildChild.target" class="flex gap-2 items-center">
                          {{ childChildChild.title }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </details>
                  <NuxtLink @click="emitClick()" v-else :href="childChild.path" v-bind:target="childChild.target"
                    class="flex gap-2 items-center">
                    {{ childChild.title }}
                  </NuxtLink>
                </li>
              </ul>
            </details>
            <NuxtLink @click="emitClick()" v-else :href="child.path" v-bind:target="child.target"
              class="flex gap-2 items-center">
              {{ child.title }}
            </NuxtLink>
          </li>
        </ul>
      </details>
      <NuxtLink @click="emitClick()" v-else :href="node.path" v-bind:target="node.target"
        class="flex gap-2 items-center">
        {{ node.title }}
      </NuxtLink>
    </li>
    <li>
      <NuxtLink @click="emitClick()" href="/blogs" class="flex gap-2 items-center">
        Blog
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
  .router-link-active {
    @apply text-highlight-500;
  }
</style>