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
    class="card p-6 border rounded-lg border-l-4 border-primary-200 hover:border-primary-400 transition-colors duration-200 relative group"
  >
    <h2 class="text-xl font-semibold mb-2">
      <a
        :href="bookmark.url"
        target="_blank"
        class="text-primary-600 hover:text-primary-700 transition-colors duration-200"
      >
        {{ bookmark.title }}
      </a>
    </h2>
    <p class="text-gray-600 mb-4">{{ bookmark.description }}</p>
    <div
      v-if="bookmark.tags && bookmark.tags.length > 0"
      class="flex flex-wrap gap-2 mb-4"
    >
      <button
        v-for="(tag, index) in bookmark.tags.slice(0, 2)"
        :key="tag.id"
        @click="handleTagClick(tag.name)"
        class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors duration-200"
      >
        {{ tag.name }}
      </button>
      <span v-if="bookmark.tags.length > 2" class="py-1 text-gray-400 text-sm">
        and {{ bookmark.tags.length - 2 }} more
      </span>
    </div>
    <div class="text-sm text-gray-500">
      Added {{ format(bookmark.created_at * 1000) }}
    </div>
    <router-link
      :to="`/bookmarks/${bookmark.id}/edit`"
      class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-full hover:bg-gray-100"
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
