<script setup>
import { useHead } from '#app'

useHead({
  htmlAttrs: {
    'data-theme': 'light',
  },
})
</script>

<template>
  <div class="min-h-svh relative flex flex-col">
    <div
      class="navbar bg-white flex items-center justify-center fixed top-0 left-0 right-0 bg-base-100 h-14 border border-b-grey-500 z-50"
    >
      <div class="max-w-7xl w-full flex mx-auto justify-between items-center">
        <div class="self-start">
          <a href="/" class="btn btn-ghost text-xl pl-0">Home</a>
        </div>
        <div class="self-end">
          <button class="btn btn-ghost btn-circle w-8 h-8 inline-flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button class="btn btn-ghost btn-circle w-8 h-8 inline-flex items-center justify-center">
            <span class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span class="badge badge-xs badge-primary indicator-item"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <NuxtPage />
    <div class="flex-1"></div>
  </div>
</template>

<style>
html,
body {
  box-sizing: border-box;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
