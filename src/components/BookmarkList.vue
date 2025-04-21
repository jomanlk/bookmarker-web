<script setup>
import { defineProps, defineEmits } from "vue";
import BookmarkItem from "./BookmarkItem.vue";

const props = defineProps({
  title: {
    type: String,
    default: "My Bookmarks",
  },
  showAddButton: {
    type: Boolean,
    default: false,
  },
  bookmarks: {
    type: Array,
    required: true,
  },
  pages: {
    type: Number,
    default: 1,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["add-bookmark"]);
</script>

<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900">{{ title }}</h1>
      </div>

      <div v-if="loading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"
        ></div>
      </div>

      <div
        v-else-if="bookmarks.length === 0"
        class="text-center p-8 bg-gray-50 text-gray-500 rounded-lg"
      >
        No bookmarks found
      </div>

      <div v-else class="space-y-4">
        <BookmarkItem
          v-for="bookmark in bookmarks"
          :key="bookmark.id"
          :bookmark="bookmark"
        />
      </div>
    </div>
  </div>
</template>
