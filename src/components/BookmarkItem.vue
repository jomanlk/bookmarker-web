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
  router.push({ path: "/bookmarks/tag", query: { tag: tagName } });
};
</script>

<template>
  <div
    class="card p-4 border rounded-lg border-l-4 border-primary-200 hover:border-primary-400 transition-colors duration-200 relative group"
  >
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
        v-for="tag in bookmark.tags"
        :key="tag.id"
        @click="handleTagClick(tag.name)"
        class="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
      >
        {{ tag.name }}
      </button>
    </div>
    <div class="text-xs text-gray-500">
      Added {{ format(bookmark.created_at * 1000) }}
    </div>
    <router-link
      :to="`/bookmarks/${bookmark.id}/edit`"
      class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-full hover:bg-gray-100"
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
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </router-link>
  </div>
</template>
