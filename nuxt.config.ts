// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  // devtools: { enabled: true }
  nitro: {
    debug: true,
    hooks: {
      async 'prerender:routes'(routes) {
        const allRoutes = [];

        // Blogs pages routes | only required slug information
        const blogPages = [{ id: 1 }, { id: 2 }, { id: 3 }]
        // we can also make an api call to get the list of all blogs
        if (blogPages) {
          const genericRoutes = blogPages.map((x) => {
            return `/posts/${x.id}`;
          })
          allRoutes.push(...genericRoutes)
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
