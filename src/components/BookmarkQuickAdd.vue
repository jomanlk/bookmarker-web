<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import bookmarkService from "../services/bookmarkService";
import TagInput from "./TagInput.vue";

const router = useRouter();
const newBookmark = ref({
  title: "",
  url: "",
  description: "",
  tags: [],
  image: "", // Add image field for thumbnail
});
const error = ref(null);
const loadingPreview = ref(false);

// Helper to get URL params
function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || "";
}

onMounted(() => {
  newBookmark.value.title = getParam("title");
  newBookmark.value.url = getParam("url");
  newBookmark.value.description = getParam("description");
});

const handleCreate = async () => {
  if (!newBookmark.value.url) {
    error.value = "URL is required";
    return;
  }
  try {
    const bookmarkToCreate = {
      ...newBookmark.value,
      tags: newBookmark.value.tags.map((tag) => tag.name),
    };
    await bookmarkService.createBookmark(bookmarkToCreate);
    window.close(); // Try to close the popup
    router.push("/");
  } catch (err) {
    error.value = "Failed to create bookmark";
    console.error(err);
  }
};

const handleFetchPreview = async () => {
  if (!newBookmark.value.url) {
    error.value = "Enter a URL first";
    return;
  }
  error.value = null;
  loadingPreview.value = true;
  try {
    const preview = await bookmarkService.fetchUrlPreview(
      newBookmark.value.url
    );
    newBookmark.value.title = preview.title || newBookmark.value.title;
    newBookmark.value.description =
      preview.description || newBookmark.value.description;
    newBookmark.value.image = preview.image || "";
  } catch (err) {
    error.value = "Could not fetch URL details";
  } finally {
    loadingPreview.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-xl bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Quick Add Bookmark</h2>
      <div
        v-if="error"
        class="p-2 bg-red-50 text-red-600 rounded mb-4 border-l-4 border-red-500"
      >
        {{ error }}
      </div>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input
            v-model="newBookmark.title"
            type="text"
            class="input w-full px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">URL *</label>
          <div class="flex items-center space-x-2">
            <input
              v-model="newBookmark.url"
              type="url"
              class="input w-full px-3 py-2"
            />
            <button
              type="button"
              class="btn btn-secondary px-3 py-2"
              @click="handleFetchPreview"
              :disabled="loadingPreview"
            >
              <span v-if="loadingPreview">Fetching...</span>
              <span v-else>Fetch URL Details</span>
            </button>
          </div>
        </div>
        <div v-if="newBookmark.image" class="mb-2 flex items-center">
          <img
            :src="newBookmark.image"
            alt="Preview"
            class="w-12 h-12 rounded mr-2 border"
          />
          <span class="text-xs text-gray-500">Preview image</span>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <textarea
            v-model="newBookmark.description"
            class="input w-full px-3 py-2"
            rows="3"
          ></textarea>
        </div>
        <TagInput v-model="newBookmark.tags" />
        <div class="flex justify-end space-x-2 pt-4">
          <button @click="handleCreate" class="btn btn-primary px-4 py-2">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
}
</style>
