<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import bookmarkService from "../services/bookmarkService";
import TagInput from "./TagInput.vue";

const router = useRouter();
const newBookmark = ref({
  title: "",
  url: "",
  description: "",
  thumbnail: "",
  tags: [],
});
const error = ref(null);
const loadingPreview = ref(false);

const handleCreate = async () => {
  if (!newBookmark.value.url) {
    error.value = "URL is required";
    return;
  }

  try {
    // Transform tag objects into strings for the API
    const bookmarkToCreate = {
      ...newBookmark.value,
      tags: newBookmark.value.tags.map((tag) => tag.name),
    };
    await bookmarkService.createBookmark(bookmarkToCreate);
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
    newBookmark.value.thumbnail = preview.image || newBookmark.value.thumbnail;
  } catch (err) {
    error.value = "Could not fetch URL details";
  } finally {
    loadingPreview.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen p-4 mt-1">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm p-4 mt-1">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-semibold text-gray-900">Add New Bookmark</h1>
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

        <div
          v-if="error"
          class="p-4 bg-red-50 text-red-600 rounded-lg mb-6 border-l-4 border-red-500"
        >
          {{ error }}
        </div>

        <div class="space-y-8">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">URL *</label>
            <div class="flex">
              <input
                v-model="newBookmark.url"
                type="url"
                class="input w-full text-lg py-3 px-4"
                placeholder="Enter URL (required)"
                required
              />
              <button
                @click="handleFetchPreview"
                class="ml-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
                :disabled="loadingPreview"
                aria-label="Fetch URL Details"
                style="width: 40px; min-width: 40px; min-height: 40px"
              >
                <span
                  v-if="loadingPreview"
                  class="loader"
                  style="width: 20px; height: 20px"
                ></span>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style="
                    width: 20px;
                    height: 20px;
                    display: block;
                    margin: auto;
                  "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="newBookmark.title"
              type="text"
              class="input w-full text-lg py-3 px-4 border-1 border-gray-300 rounded-md"
              placeholder="Enter title (optional)"
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              v-model="newBookmark.description"
              class="input w-full text-lg py-3 px-4 border-1 border-gray-300 rounded-md"
              rows="4"
              placeholder="Enter description (optional)"
            ></textarea>
          </div>

          <TagInput v-model="newBookmark.tags" />

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Thumbnail URL</label
            >
            <input
              v-model="newBookmark.thumbnail"
              type="url"
              class="input w-full text-lg py-3 px-4"
              placeholder="Enter thumbnail URL (optional)"
            />
          </div>
          <div v-if="newBookmark.thumbnail" class="flex space-2">
            <img
              :src="newBookmark.thumbnail"
              alt="Thumbnail preview"
              class="max-w-xs p-2 w-full h-auto object-contain rounded border"
              style="max-height: 90px; max-width: 90px"
            />
          </div>
          <div class="flex justify-end space-x-3 pt-6 border-t">
            <button
              @click="router.push('/')"
              class="px-5 py-2.5 text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
            <button @click="handleCreate" class="btn btn-primary px-5 py-2.5">
              Create Bookmark
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  border: 2px solid transparent;
  border-top-color: white;
  border-right-color: white;
  border-radius: 50%;
  width: 4px;
  height: 4px;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
