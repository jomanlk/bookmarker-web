<script setup>
import BookmarkList from "../components/BookmarkList.vue";
import TagCloud from "../components/TagCloud.vue";
import bookmarkService from "../services/bookmarkService";
import { ref, watch, onMounted } from "vue";
import searchService from "../services/searchService";

const searchQuery = ref("");
const listTitle = ref("My Bookmarks");
const bookmarks = ref([]);
const loading = ref(false);

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

onMounted(loadBookmarks);

watch(searchQuery, loadBookmarks);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
    <div class="md:col-span-8 col-span-1">
      <div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search bookmarks..."
          class="w-full mt-8 text-2xl font-bold px-2 py-2 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none shadow"
        />
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
