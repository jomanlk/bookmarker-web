<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import bookmarkService from "../services/bookmarkService";
import { format } from "timeago.js";

const router = useRouter();
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
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900">My Bookmarks</h1>
        <router-link
          to="/bookmarks/add"
          class="btn btn-primary flex items-center space-x-2"
        >
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add Bookmark</span>
        </router-link>
      </div>

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
          class="card p-6 border rounded-lg border-l-4 border-primary-200 hover:border-primary-400 transition-colors duration-200 relative group"
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
          <router-link
            :to="`/bookmarks/${bookmark.id}/edit`"
            class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
