<script setup lang="ts">
  import type { NavItem } from '@nuxt/content';

  type nodes = {
    navNodes: NavItem[] | undefined;
    label?: string;
    showParentUrl?: boolean;
    defaultOpen?: boolean;
    showChilds?: boolean;
  }

  const props = defineProps({
    nodes: {
      required: true,
      type: Array as PropType<nodes[]>,
    },
    showSelect: {
      type: Boolean,
      default: () => true,
    },
    preSelectedValue: {
      type: String as PropType<PackageValue>,
      default: () => 'craft-query-api'
    }
  })

  const socialNodes = inject<NavItem[]>('socialMediaObj')

  const packages = [
    {
      name: 'Craft Query API',
      path: '/libraries/craft-query-api',
      value: 'craft-query-api' as const
    },
    {
      name: 'Craft Loanwords',
      path: '/libraries/craft-loanwords',
      value: 'craft-loanwords' as const
    },
    {
      name: 'Craft Quick Edit',
      path: '/libraries/craft-quick-edit',
      value: 'craft-quick-edit' as const
    },
    {
      name: '@query-api/nuxt',
      path: '/libraries/nuxt-craftcms',
      value: 'nuxt-craftcms' as const
    },
    {
      name: '@query-api/vue',
      path: '/libraries/vue-craftcms',
      value: 'vue-craftcms' as const
    },
    {
      name: '@query-api/js',
      path: '/libraries/js-craftcms-api',
      value: 'js-craftcms-api' as const
    },
  ];

  type PackageValue = typeof packages[number]['value'];

  const selectedPackage = ref(props.preSelectedValue)

  watch(selectedPackage, async (newSelectedPkg: string) => {
    const path = findPathByValue(newSelectedPkg)
    if (path) {
      await navigateTo({ path })
    }
  })

  function findPathByValue(targetValue: string): string | null {
    const foundPackage = packages.find(pkg => pkg.value === targetValue);
    return foundPackage ? foundPackage.path : null;
  }
</script>

<template>
  <aside class="flex flex-col justify-between h-full">
    <nav class="space-y-14">
      <div v-if="props.showSelect" class="mx-0.5">
        <USelect v-model="selectedPackage" :options="packages" option-attribute="name" size="lg" />
      </div>
      <SidebarNav v-for="nodeObj in props.nodes" :label="nodeObj.label" :nav-nodes="nodeObj.navNodes"
        :default-open="nodeObj.defaultOpen" :show-parent-url="nodeObj.showParentUrl"
        :show-childs="nodeObj.showChilds" />
    </nav>
    <SidebarNav v-if="socialNodes" label="Find me here" :nav-nodes="socialNodes" />
  </aside>
</template>

<style>
  select {
    appearance: none;
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
  }


  select::after {
    content: "";
    position: absolute;
    width: 0.8em;
    height: 0.5em;
    background-color: white;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
</style>