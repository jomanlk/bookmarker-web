<script setup>
import BookmarkList from "./components/BookmarkList.vue";
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <router-view />
    </div>
  </div>
</template>
