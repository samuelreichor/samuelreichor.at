export default defineAppConfig({
  ui: {
    primary: 'highlight',
    gray: 'cool',
    strategy: 'override',
    button: {
      font: 'font-base',
      rounded: 'rounded-full',
      base: 'focus-visible:ring-offset-background focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0',
      color: {
        primary: {
          solid: 'bg-highlight-400 hover:bg-highlight-400/90 text-white transition-colors'
        },
        gray: {
          solid: 'bg-muted hover:brightness-95 dark:hover:brightness-125 text-black dark:text-white transition-[filter]'
        }
      },
      padding: {
        sm: 'px-7 py-3'
      },
      size: {
        sm: 'text-lg'
      }
    }
  }
})