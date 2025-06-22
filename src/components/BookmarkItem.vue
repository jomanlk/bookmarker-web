<script setup>
import { format } from "timeago.js";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  bookmark: {
    type: Object,
    required: true,
  },
});

const handleTagClick = (tagName) => {
  router.push({ name: "TagBookmarks", params: { tag: tagName } });
};
</script>

<template>
  <div
    class="card p-4 border rounded-lg border-l-4 border-primary-200 hover:border-primary-400 transition-colors duration-200 relative group flex items-start"
  >
    <div class="flex-1 min-w-0">
      <h2 class="text-lg font-semibold mb-1">
        <a
          :href="bookmark.url"
          target="_blank"
          class="text-primary-600 hover:text-primary-700 transition-colors duration-200"
        >
          {{ bookmark.title }}
        </a>
      </h2>
      <p class="text-gray-600 text-sm mb-2">{{ bookmark.description }}</p>
      <div class="flex flex-wrap gap-1 mb-2 min-h-[24px]">
        <button
          v-for="tag in bookmark.tags || []"
          :key="tag.id"
          @click="handleTagClick(tag.name)"
          class="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
        >
          {{ tag.name }}
        </button>
      </div>
      <div class="text-xs text-gray-500">
        Added {{ format(bookmark.created_at) }}
      </div>

      <router-link
        :to="`/bookmarks/${bookmark.id}/edit`"
        class="absolute bottom-2 right-2 transition-opacity duration-200 p-1.5 rounded text-gray-300 hover:text-gray-800 text-xs font-medium"
      >
        (edit)
      </router-link>
    </div>
    <div v-if="bookmark.thumbnail" class="ml-4 flex-shrink-0">
      <img
        :src="bookmark.thumbnail"
        :alt="bookmark.title + ' thumbnail'"
        class="w-[100px] h-auto object-cover rounded-md border min-h-[50px] bg-gray-100"
      />
    </div>
  </div>
</template>
