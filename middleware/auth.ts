export default defineNuxtRouteMiddleware(async () => {
  try {
    const { base64 }: { base64: string } = await $fetch('/api/auth')

    return navigateTo(`/list-${base64}`)
  }
  catch (e) {
    return abortNavigation('Could not assign the url for you! Try one more time later:)')
  }
})
