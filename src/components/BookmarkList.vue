<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import bookmarkService from "../services/bookmarkService";
import BookmarkItem from "./BookmarkItem.vue";

const props = defineProps({
  title: {
    type: String,
    default: "My Bookmarks",
  },
  showAddButton: {
    type: Boolean,
    default: true,
  },
  fetchBookmarks: {
    type: Function,
    required: true,
  },
});

const router = useRouter();
const bookmarks = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await props.fetchBookmarks();
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
        <h1 class="text-4xl font-bold text-gray-900">{{ title }}</h1>
        <router-link
          v-if="showAddButton"
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
        <BookmarkItem
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          :bookmark="bookmark"
        />
      </div>
    </div>
  </div>
</template>
