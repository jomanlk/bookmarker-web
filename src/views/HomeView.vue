<script setup>
import BookmarkList from "../components/BookmarkList.vue";
import TagCloud from "../components/TagCloud.vue";
import bookmarkService from "../services/bookmarkService";
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import searchService from "../services/searchService";

const searchQuery = ref("");
const listTitle = ref("My Bookmarks");
const bookmarks = ref([]);
const loading = ref(false);

const showSearch = ref(false);
const searchInputRef = ref(null);

function toggleSearch() {
  showSearch.value = !showSearch.value;
  if (showSearch.value) {
    nextTick(() => {
      searchInputRef.value?.focus();
    });
  }
}

async function loadBookmarks() {
  loading.value = true;
  if (searchQuery.value.length > 0) {
    listTitle.value = "Search Results";
    bookmarks.value = await searchService.search(searchQuery.value);
  } else {
    listTitle.value = "My Bookmarks";
    bookmarks.value = await bookmarkService.getBookmarks();
  }
  loading.value = false;
}

onMounted(() => {
  loadBookmarks();
  const handler = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "/") {
      e.preventDefault();
      toggleSearch();
    }
  };
  window.addEventListener("keydown", handler);
  // Clean up
  onUnmounted(() => {
    window.removeEventListener("keydown", handler);
  });
});

watch(searchQuery, loadBookmarks);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
    <div class="md:col-span-8 col-span-1">
      <div class="relative">
        <div
          class="flex items-center cursor-pointer select-none mt-4 mb-2 text-lg font-semibold text-primary-700 hover:text-primary-900 transition-colors"
          @click="toggleSearch"
        >
          <span>🔍 Search <span>(ctrl + /)</span></span>
          <svg
            :class="[
              showSearch ? 'rotate-180' : '',
              'ml-2 transition-transform duration-200',
            ]"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <transition name="slide-fade">
          <input
            v-if="showSearch"
            ref="searchInputRef"
            v-model="searchQuery"
            type="text"
            placeholder="Search bookmarks..."
            class="w-full text-2xl font-bold px-2 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none shadow"
            @keyup.esc="showSearch = false"
          />
        </transition>
      </div>
      <BookmarkList
        :title="listTitle"
        :show-add-button="true"
        :bookmarks="bookmarks"
        :loading="loading"
      />
    </div>
    <div class="col-span-4 hidden md:block">
      <TagCloud />
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 100px;
  opacity: 1;
  transform: translateY(0);
}
</style>
