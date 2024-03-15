# Generating Dynamic Routes with Nitro Prerender Hooks

This guide explains how to generate dynamic routes using Nitro prerender hooks when running `nuxt generate`. Nitro is a powerful feature in Nuxt.js that allows you to create static pages for your dynamic routes during the build process. This is extremely useful for generating static HTML files that can be served directly via a CDN like AWS CloudFront.

## Prerequisites

- [Nuxt.js](https://nuxtjs.org/) installed in your project.
- Understanding of dynamic routes in Nuxt.js.
- Familiarity with the concept of prerendering.

## Dynamic Post Slug

create a file /posts/[id].vue for rendering dynamic post articles.

```vue
<script>
  const { data: post, error } = await useAsyncData(
    `posts/${route.params.id}`,
    () =>
      $fetch(`${baseApiPath}data.json`, {
        params: {
          id: route.params.id,
        },
      }).catch((error) => {
        error.data
      }),
    {
      transform: (resData) => {
        return resData.find((x) => x.id.toString() === route.params.id);
      },
    },
  )
</script>
```
Here, `posts/${route.params.id}` serves as a unique identifier to fetch the correct `payload.json` for each article after nuxt generate.

## Add articles route list in Nitro prerender hooks

```javascript
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
```

## Run `nuxt generate`:

```bash
nuxt generate
```

## Conclusion
With Nitro prerender hooks, you can efficiently generate dynamic routes during the nuxt generate process, enhancing the SEO and performance of your Nuxt.js application. Make sure to define your prerender hooks correctly and handle dynamic route generation according to your project requirements.
