# Generating Dynamic Routes with Nitro Prerender Hooks With or Without the Use of Payloads

This guide explains how to generate dynamic routes, with or without the use of payloads, using Nitro prerender hooks when running `nuxt generate`.

## Prerequisites

- [Nuxt.js](https://nuxtjs.org/) installed in your project.
- Understanding of dynamic routes in Nuxt.js.
- Familiarity with the concept of prerendering.

Let's start with payloads (an experimental feature only available on Nuxt version 3.10.3 or above).

## Add Dynamic Post Slug

Create /posts-with-payload/[id].vue or name it based on your project for rendering dynamic post articles.

```vue
<script>
  const route = useRoute();
  const event = useRequestEvent()

  const { data: post, error } = await useAsyncData(`posts-with-payload/${route.params.id}`,
    async () => {
      if (import.meta.prerender) {
        const allPostItems = event.context.payload.posts
        return allPostItems.find((post) => {
          return post.id.toString() === route.params.id
        })
      }
      return await $fetch(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`)
    }
  )

  if (error.value || !post.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `post with id #${route.params.id} Not Found`
    })
  }
</script>
```
Here, `posts-without-payload/${route.params.id}` serves as a unique identifier to fetch the correct `payload.json` for each post after nuxt generate.

## Create Nitro server payload plugins

Create a file `/server/plugins/payload.ts` to make the data available on Nitro requests using Nitro request hooks.

```typescript
const getPayload = dedupe(cache('payload', async () => ({
  posts: await $fetch('https://jsonplaceholder.typicode.com/posts'),
})))

export default defineNitroPlugin((nitroApp) => {
  // expose payload to each request if we are prerendering
  nitroApp.hooks.hook('request', async (event) => {
    event.context.payload = import.meta.prerender ? await getPayload() : {}
  })
})

// avoid duplicating calls in parallel as prerender process
// calls a number of renders at the same time, before the
//  first payload is initialised
function dedupe<T>(fn: () => Promise<T>) {
  let promise: Promise<T>
  return () => {
    return (promise ||= fn())
  }
}

// cache result in memory by default - though
// we could also cache it in data store:
// 👉 https://github.com/unjs/nitro/pull/1352
function cache<T>(key: string, fn: () => Promise<T>) {
  const data = useStorage()
  return async () => {
    let value = await data.getItem<any>(key)
    if (!value) {
      value = await fn()
      await data.setItem(key, value)
    }
    return value
  }
}

```

## Enable experimental sharedPrerenderData (Only works on Nuxt: "^3.10.3" or above)

```javascript
  experimental: {
    sharedPrerenderData: true
  }
```

## Add post routes with the help of Nitro prerender hooks
Both routes with payload and without payload are added here. You can ignore the postWithoutPayloadRoutes part.

```javascript
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
```

Run `nuxt generate`:

```bash
nuxt generate
```

## Here's an example of generating dynamic routes without payloads

Create a file `/posts-without-payload/[id].vue` or name it according to your project for rendering dynamic post articles.

```vue
<script>
  const { data: post, error } = await useAsyncData(
    `posts-without-payload/${route.params.id}`,
        () =>
        $fetch(`https://jsonplaceholder.typicode.com/posts`, {
            params: {
            id: route.params.id,
            },
        }).catch((error) => {
            error.data
        }),
        {
            transform: (resData) => {
              // no transformation required
              return resData
            }
        },
  )
</script>
```
Here, `posts-without-payload/${route.params.id}` serves as a unique identifier to fetch the correct `payload.json` for each post after nuxt generate.

## Add post routes with the help of Nitro prerender hooks

```javascript
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
```

Run `nuxt generate`:

```bash
nuxt generate
```

## Conclusion
With Nitro prerender hooks, you can efficiently generate dynamic routes during the nuxt generate process, also with help of nuxt sharedPrerenderData, you can now share the payload while nuxt generate.
