<template>
  <div class="main max-w-7xl mx-auto py-16">
    <h1 class="md:my-6 font-700 text-center text-3xl md:text-5xl">Post list without using payload</h1>
    <div class="md:py-14 py-5">
      <div class="grid grid-cols-12 md:gap-x-12 md:gap-y-14 gap-y-8 gap-x-0">
        <article class="md:col-span-6 col-span-12" v-for="post in posts" :key="post.id">
          <h4 class="md:text-8 text-3xl md:line-height-8 text-on-primary font-700 md:text-4xl mt-6 mb-4">
            {{ post.title }}
          </h4>
          <p>{{ post.body }}</p>
          <NuxtLink class="text-blue-600" :to="`/posts-without-payload/${post.id}`">Read more</NuxtLink>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: posts, error } = await useAsyncData(
  `posts-without-payload`,
  () =>
    $fetch(`https://jsonplaceholder.typicode.com/posts`, {}).catch((error) => {
      error.data
    }),
  {
    transform: (resData) => {
      // no transformation required
      return resData
    },
  },
)

if (error.value || !posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post list Not Found'
  })
}

</script>
