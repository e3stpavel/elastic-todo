import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  theme: {
    fontSize: {
      '4xl': '2.5em',
      '3xl': '2em',
      '2xl': '1.5em',
      'xl': '1.25em',
      'base': '1em',
      'sm': '0.75em',
    },
    colors: {
      blue: '#0D62D2',
      white: '#fff',
      dark: '#000',
      gray: {
        100: '#F2F2F7',
        200: '#E5E5EA',
        300: '#D1D1D6',
        400: '#C7C7CC',
        500: '#AEAEB2',
        600: '#8E8E93',
        700: '#666666',
      },
      transparent: 'rgba(0,0,0,0)',
      red: '#FF3B30',
    },
  },
})
