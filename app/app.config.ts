export default defineAppConfig({
  ui: {
    primary: 'highlight',
    gray: 'cool',
    strategy: 'override',
    button: {
      font: 'font-base',
      rounded: 'rounded-full',
      base: 'focus-visible:ring-offset-background focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-highlight-500 focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0',
      color: {
        primary: {
          solid: 'bg-highlight-500 hover:bg-highlight-500/90 !text-white font-medium transition-colors'
        },
        gray: {
          solid: 'bg-muted brightness-95 hover:brightness-90 dark:brightness-125 dark:hover:brightness-150 text-black dark:text-white transition-[filter]'
        }
      },
      padding: {
        sm: 'px-6 py-2.5'
      },
      size: {
        sm: 'text-base'
      }
    },
    select: {
      color: {
        white: {
          outline: 'bg-white dark:bg-muted text-gray-900 dark:text-white ring-1 ring-inset ring-contrast focus:ring-white',
        }
      }
    }
  }
})