<template>
  <div class="main max-w-7xl mx-auto py-16">
    <article class="mb-8">
      <h4 class="md:text-8 text-3xl md:line-height-8 text-on-primary font-700 md:text-4xl mt-6 mb-4">
        {{ post.title }}
      </h4>
      <p>Status : {{ post.completed ? 'Completed' : 'Pending' }}</p>
    </article>
    <NuxtLink class="text-blue-600" to="/posts-with-payload">Back to all posts</NuxtLink>
  </div>
</template>

<script setup>
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
