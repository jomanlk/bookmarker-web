<script setup>
import { ref } from "vue";
import bookmarkService from "../services/bookmarkService";

const props = defineProps({
  bookmark: {
    type: Object,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "updated"]);

const editingBookmark = ref({ ...props.bookmark });
const error = ref(null);

const handleSave = async () => {
  try {
    await bookmarkService.updateBookmark(editingBookmark.value);
    emit("updated");
    emit("close");
  } catch (err) {
    error.value = "Failed to update bookmark";
    console.error(err);
  }
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 class="text-xl font-semibold mb-4">Edit Bookmark</h2>

      <div v-if="error" class="mb-4 p-3 bg-red-50 text-red-600 rounded">
        {{ error }}
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Title</label
          >
          <input
            v-model="editingBookmark.title"
            type="text"
            class="input w-full"
            placeholder="Enter title"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >URL</label
          >
          <input
            v-model="editingBookmark.url"
            type="url"
            class="input w-full"
            placeholder="Enter URL"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Description</label
          >
          <textarea
            v-model="editingBookmark.description"
            class="input w-full"
            rows="3"
            placeholder="Enter description"
          ></textarea>
        </div>
      </div>
      <div class="mt-6 flex justify-end space-x-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button @click="handleSave" class="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>
