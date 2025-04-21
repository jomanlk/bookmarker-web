<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import tagService from "../services/tagService";

const router = useRouter();
const tags = ref([]);

const fetchTags = async () => {
  try {
    tags.value = await tagService.getTags();
  } catch (error) {
    console.error("Error loading tags:", error);
  }
};

onMounted(fetchTags);
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h2 class="text-lg font-semibold mb-4">Tags</h2>
    <div class="flex flex-wrap gap-2">
      <router-link
        v-for="tag in tags"
        :key="tag.id"
        :to="{ name: 'TagBookmarks', query: { tag: tag.name } }"
        class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 cursor-pointer no-underline"
      >
        {{ tag.name }}
      </router-link>
    </div>
  </div>
</template>
