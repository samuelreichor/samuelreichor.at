import type { NavItem, ParsedContent } from '@nuxt/content';

export const useSurroundHelper = async () => {
  const route = useRoute();
  const routePath = route.path;
  const queryContentFunc = queryContent().where({ _extension: 'md', navigation: { $ne: false } })
      .only(['title', 'description', '_path'])
      .findSurround(routePath.endsWith('/') ? routePath.slice(0, -1) : routePath);

  const { data: surround } = await useAsyncData(`${routePath}-surround`, () => {
    return queryContentFunc
  }, { default: () => [] });

  return { surround };
}

export const useCustomNavs = async (path: string) => {
  const route = useRoute();
  const { navDirFromPath } = useContentHelpers();

  const navigation = inject<NavItem[]>('navigationObj');
  if (!navigation) {
    throw createError({ statusCode: 500, statusMessage: 'Navigation data not found', fatal: true });
  }

  const navNodes = navDirFromPath(path, navigation);

  const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne());
  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
  }

  return { page, navNodes };
}