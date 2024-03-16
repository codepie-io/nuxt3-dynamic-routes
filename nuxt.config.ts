// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  experimental: {
    sharedPrerenderData: true
  },
  // devtools: { enabled: true }
  nitro: {
    debug: true,
    hooks: {
      async 'prerender:routes'(routes) {
        const allRoutes = [];

        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const postPages = await response.json()

        if (postPages) {
          const postWithPayloadRoutes = postPages.map((x: { id: number }) => {
            return `/posts-with-payload/${x.id}`
          })

          const postWithoutPayloadRoutes = postPages.map((x: { id: number }) => {
            return `/posts-without-payload/${x.id}`
          })

          allRoutes.push(...postWithPayloadRoutes, ...postWithoutPayloadRoutes)
        }

        if (allRoutes.length) {
          for (const route of allRoutes) {
            routes.add(route)
          }
        }
      }
    }
  }
})
