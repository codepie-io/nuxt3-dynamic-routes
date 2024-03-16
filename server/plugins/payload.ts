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
