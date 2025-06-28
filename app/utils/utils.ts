
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