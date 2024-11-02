
import type { NavItem } from "@nuxt/content";

export default function removeDuplicateChildren(data: NavItem[]) {
    function checkDuplicates(parent: NavItem, children: NavItem[]) {
      return children.filter(child => {
        if (child.title === parent.title && child._path === parent._path) {
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

export function getDuplicateChildren(data: NavItem[]) {
  function checkDuplicates(parent: NavItem, children: NavItem[]) {
    return children.filter(child => {
      if (child.title === parent.title && child._path === parent._path) {
        return parent;
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