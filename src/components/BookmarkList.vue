<script setup>
import { ref, onMounted } from "vue";
import bookmarkService from "../services/bookmarkService";
import { format } from "timeago.js";

const bookmarks = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await bookmarkService.getBookmarks();
    bookmarks.value = response;
  } catch (err) {
    error.value = "Failed to load bookmarks";
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">My Bookmarks</h1>

      <div v-if="loading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"
        ></div>
      </div>

      <div
        v-else-if="error"
        class="text-center p-8 bg-red-50 text-red-600 rounded-lg"
      >
        {{ error }}
      </div>

      <div
        v-else-if="bookmarks.length === 0"
        class="text-center p-8 bg-gray-50 text-gray-500 rounded-lg"
      >
        No bookmarks found
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          class="card p-6 border rounded-lg border-l-4 border-primary-200 hover:border-primary-400 transition-colors duration-200"
        >
          <h2 class="text-xl font-semibold mb-2">
            <a
              :href="bookmark.url"
              target="_blank"
              class="text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              {{ bookmark.title }}
            </a>
          </h2>
          <p class="text-gray-600 mb-4">{{ bookmark.description }}</p>
          <div class="text-sm text-gray-500">
            Added {{ format(bookmark.created_at) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
