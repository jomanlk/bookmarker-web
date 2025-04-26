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
</script>

<template>
  <div class="min-h-screen p-8 bg-gray-50 mt-1">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm p-8">
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
            <input
              v-model="newBookmark.url"
              type="url"
              class="input w-full text-lg py-3 px-4"
              placeholder="Enter URL (required)"
              required
            />
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
