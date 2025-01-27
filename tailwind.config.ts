import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./content/**/*.{js,vue,ts}",
    "./app.vue",
    "./error.vue",
  ],
  corePlugins: {
    container: false,
  },
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9'
      },
      colors: {
        highlight: {
          '50': '#eff6ff',
          '100': '#dbeafe',
          '200': '#bfdbfe',
          '300': '#93c5fd',
          '400': '#3178C6',
          '500': '#3c83f6',
          '600': '#2563eb',
          '700': '#1d4ed8',
          '800': '#1e40af',
          '900': '#1e3a8a',
          '950': '#172554',
        },
        background: {
          DEFAULT: 'var(--background)',
        },
        muted: {
          DEFAULT: 'var(--muted)'
        },
        contrast: {
          DEFAULT: 'var(--contrast)'
        },
        dimmed: {
          DEFAULT: 'var(--dimmed)'
        }
      }
    },
  }
}