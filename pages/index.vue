<template>
  <div class="main max-w-7xl mx-auto py-16">
    <h1 class="md:my-6 font-700 text-center text-3xl md:text-5xl">Blog posts</h1>
    <div class="md:py-14 py-5">
      <div class="grid grid-cols-12 md:gap-x-12 md:gap-y-14 gap-y-8 gap-x-0">
        <article class="md:col-span-6 col-span-12" v-for="post in posts.slice(0, 5)" :key="post.id">
          <h4 class="md:text-8 text-3xl md:line-height-8 text-on-primary font-700 md:text-4xl mt-6 mb-4">
            {{ post.name }}
          </h4>
          <p>{{ post.body }}</p>
          <NuxtLink class="text-blue-600" :to="`/posts/${post.id}`">Read more</NuxtLink>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseApiPath = "https://www.codepie.io/";
const { data: posts, error } = await useAsyncData(
  `/`,
  () =>
    $fetch(`${baseApiPath}data.json`, {}).catch((error) => {
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
