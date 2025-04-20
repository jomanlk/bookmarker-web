<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import bookmarkService from "../services/bookmarkService";

const route = useRoute();
const router = useRouter();
const bookmark = ref(null);
const error = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await bookmarkService.getBookmark(route.params.id);
    bookmark.value = response;
  } catch (err) {
    error.value = "Failed to load bookmark";
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const handleSave = async () => {
  try {
    await bookmarkService.updateBookmark(bookmark.value);
    router.push("/");
  } catch (err) {
    error.value = "Failed to update bookmark";
    console.error(err);
  }
};
</script>

<template>
  <div class="min-h-screen p-8 bg-gray-50">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-semibold text-gray-900">Edit Bookmark</h1>
          <button
            @click="router.push('/')"
            class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div v-if="loading" class="flex justify-center items-center h-64">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"
          ></div>
        </div>

        <div
          v-else-if="error"
          class="p-4 bg-red-50 text-red-600 rounded-lg mb-6 border-l-4 border-red-500"
        >
          {{ error }}
        </div>

        <div
          v-else-if="!bookmark"
          class="text-center p-8 bg-gray-50 text-gray-500 rounded-lg"
        >
          Bookmark not found
        </div>

        <div v-else class="space-y-8">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">URL</label>
            <input
              v-model="bookmark.url"
              type="url"
              class="input w-full text-lg py-3 px-4"
              placeholder="Enter URL"
            />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="bookmark.title"
              type="text"
              class="input w-full text-lg py-3 px-4 border-1 border-gray-300 rounded-md"
              placeholder="Enter title"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              v-model="bookmark.description"
              class="input w-full text-lg py-3 px-4 border-1 border-gray-300 rounded-md"
              rows="4"
              placeholder="Enter description"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-3 pt-6 border-t">
            <button
              @click="router.push('/')"
              class="px-5 py-2.5 text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
            <button @click="handleSave" class="btn btn-primary px-5 py-2.5">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
