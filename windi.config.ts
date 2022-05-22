import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  theme: {
    fontSize: {
      '4xl': '2.5em',
      '2xl': '1.5em',
      'xl': '1.25em',
    },
    colors: {
      blue: '#0D62D2',
      white: '#fff',
      gray: {
        100: '#F2F2F7',
      },
    },
  },
})
