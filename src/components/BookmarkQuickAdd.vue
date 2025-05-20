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
});
const error = ref(null);

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
          <input
            v-model="newBookmark.url"
            type="url"
            class="input w-full px-3 py-2"
          />
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
