<template>
  <div class="main max-w-7xl mx-auto py-16">
    <article class="mb-8">
      <h4 class="md:text-8 text-3xl md:line-height-8 text-on-primary font-700 md:text-4xl mt-6 mb-4">
        {{ post.title }}
      </h4>
      <p>{{ post.body }}</p>
    </article>
    <NuxtLink class="text-blue-600" to="/posts-without-payload">Back to all posts</NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute();

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
    },
  },
)

if (error.value || !post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `post with id #${route.params.id} Not Found`
  })
}
</script>
