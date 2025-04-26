<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-primary-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </router-link>

        <!-- App Name -->
        <h1 class="text-2xl font-bold text-gray-900">
          <router-link to="/"> Bookmarker </router-link>
        </h1>

        <!-- Add Bookmark Button -->
        <router-link
          to="/bookmarks/add"
          class="btn btn-primary flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span class="hidden sm:inline ms-2">Add Bookmark</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
// No additional logic needed for now
</script>
