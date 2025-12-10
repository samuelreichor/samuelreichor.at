
import type { ContentNavigationItem } from "@nuxt/content";

export default function removeDuplicateChildren(data: ContentNavigationItem[]) {
    function checkDuplicates(parent: ContentNavigationItem, children: ContentNavigationItem[]) {
      return children.filter(child => {
        if (child.title === parent.title && child.path === parent.path) {
          return false;
        }
        if (child.children) {
          child.children = checkDuplicates(child, child.children);
        }
        return true;
      });
    }

    data.forEach(item => {
      if (item.children) {
        item.children = checkDuplicates(item, item.children);
      }
    });

    return data;
  }

export function formatNavDir(str: string) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getCurrentGhUrl(){
  const path = useRoute().path;
  const ghMap = {
    'craft-query-api': 'https://github.com/samuelreichor/craft-query-api',
    'craft-loanwords': 'https://github.com/samuelreichor/craft-loanwords',
    'craft-quick-edit': 'https://github.com/samuelreichor/craft-quick-edit',
    'craft-llmify': 'https://github.com/samuelreichor/craft-llmify',
    'craft-genesis': 'https://github.com/samuelreichor/craft-genesis',
    'nuxt-craftcms': 'https://github.com/samuelreichor/query-api/tree/main/packages/nuxt',
    'vue-craftcms': 'https://github.com/samuelreichor/query-api/tree/main/packages/vue',
    'js-craftcms-api': 'https://github.com/samuelreichor/query-api/tree/main/packages/js',
    'query-api-react': 'https://github.com/samuelreichor/query-api/tree/main/packages/react',
    'query-api-next': 'https://github.com/samuelreichor/query-api/tree/main/packages/next',
  }
  const match = path.match(/\/libraries\/([^/]+)/);

  if (!match) {
    return 'https://github.com/samuelreichor'
  }

  if (match[1] && match[1] in ghMap) {
    const typesMatch = match[1] as keyof typeof ghMap;
    return ghMap[typesMatch]
  }
}

export function getCurrentGHBaseUrl(){
  const path = useRoute().path;
  const ghMap = {
    'craft-query-api': 'https://github.com/samuelreichor/craft-query-api',
    'craft-loanwords': 'https://github.com/samuelreichor/craft-loanwords',
    'craft-quick-edit': 'https://github.com/samuelreichor/craft-quick-edit',
    'craft-llmify': 'https://github.com/samuelreichor/craft-llmify',
    'craft-genesis': 'https://github.com/samuelreichor/craft-genesis',
    'nuxt-craftcms': 'https://github.com/samuelreichor/query-api',
    'vue-craftcms': 'https://github.com/samuelreichor/query-api',
    'js-craftcms-api': 'https://github.com/samuelreichor/query-api',
    'query-api-react': 'https://github.com/samuelreichor/query-api',
    'query-api-next': 'https://github.com/samuelreichor/query-api',
  }
  const match = path.match(/\/libraries\/([^/]+)/);

  if (!match) {
    return 'https://github.com/samuelreichor'
  }

  if (match[1] && match[1] in ghMap) {
    const typesMatch = match[1] as keyof typeof ghMap;
    return ghMap[typesMatch]
  }
}

export function getCurrentPluginStoreLink(){
  const path = useRoute().path;
  const ghMap = {
    'craft-query-api': 'https://plugins.craftcms.com/query-api',
    'craft-loanwords': 'https://plugins.craftcms.com/loanwords',
    'craft-quick-edit': 'https://plugins.craftcms.com/quick-edit',
    'craft-llmify': 'https://plugins.craftcms.com/llmify',
    'craft-genesis': 'https://plugins.craftcms.com/genesis',
  }
  const match = path.match(/\/libraries\/([^/]+)/);

  if (!match) {
    return ''
  }

  if (match[1] && match[1] in ghMap) {
    const typesMatch = match[1] as keyof typeof ghMap;
    return ghMap[typesMatch]
  }
}
