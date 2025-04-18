<script setup>
import { ref, onMounted } from "vue";
import bookmarkService from "../services/bookmarkService";

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
  <div>
    <h1>My Bookmarks</h1>

    <div v-if="loading">Loading...</div>

    <div v-else-if="error">
      {{ error }}
    </div>

    <div v-else-if="bookmarks.length === 0">No bookmarks found</div>

    <div v-else>
      <div v-for="bookmark in bookmarks" :key="bookmark.id">
        <div>
          <h2>
            <a :href="bookmark.url" target="_blank">
              {{ bookmark.title }}
            </a>
          </h2>
          <p>{{ bookmark.description }}</p>
          <div>
            <span
              >Created:
              {{ new Date(bookmark.created_at).toLocaleDateString() }}</span
            >
            <span
              >Updated:
              {{ new Date(bookmark.updated_at).toLocaleDateString() }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
