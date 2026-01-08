export default defineAppConfig({
  ui: {
    colors: {
      primary: 'highlight',
    },
    strategy: 'override',
    button: {
      slots: {
        base: 'text-base focus-visible:ring-offset-background focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-highlight-500 focus:outline-hidden focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 shrink-0',
      },
      variants: {
        color: {
          primary: 'bg-highlight-500 hover:bg-highlight-500/90 text-white! font-medium transition-colors',
          gray: 'bg-muted brightness-95 hover:brightness-90 dark:brightness-125 dark:hover:brightness-150 text-black! dark:text-white! transition-[filter]',
        },
        size: {
          sm: {
            base: 'px-6 py-2.5 text-base',
          }
        },
      defaultVariants: {
        color: 'primary',
        size: 'sm',
      },
      }
    },
    select: {
      variants: {
        color: {
          primary: 'bg-white dark:bg-muted text-gray-900 dark:text-white ring-1 ring-inset ring-contrast focus:ring-white',
        }
      }
    },
    dropdown: {
      item: {
        icon: {
          inactive: 'text-black dark:text-white',
          active: 'text-black dark:text-white'
        }
      }
    },
    prose: {
      badge: {
        base: 'bg-primary text-white'
      }
    }
  }
})
