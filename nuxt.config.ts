import { defineNuxtConfig } from 'nuxt'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: [
    'nuxt-windicss',
  ],
  components: {
    global: true,
    dirs: ['~/components'],
  },
  css: [
    '~/assets/css/styles.css',
  ],
  vite: {
    plugins: [
      Icons({
        autoInstall: true,
        compiler: 'vue3',
        customCollections: {
          basil: FileSystemIconLoader(
            './assets/icons/basil/',
            svg => svg.replace(/^<svg /, '<svg fill="currentColor" '),
          ),
        },
      }),
    ],
  },
})
