<script setup>
const route = useRoute();
const baseApiPath = "https://www.codepie.io/";

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

if (error.value || !post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post Not Found'
  })
}
</script>

<template>
  <div class="main max-w-7xl mx-auto py-16">
    <article class="mb-8">
      <h4 class="md:text-8 text-3xl md:line-height-8 text-on-primary font-700 md:text-4xl mt-6 mb-4">
        {{ post.name }}
      </h4>
      <p>{{ post.body }}</p>
    </article>
    <NuxtLink class="text-blue-600" to="/">Back Home</NuxtLink>
  </div>
</template>
