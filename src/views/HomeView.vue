<script setup>
import BookmarkList from "../components/BookmarkList.vue";
import TagCloud from "../components/TagCloud.vue";
import bookmarkService from "../services/bookmarkService";

const fetchBookmarks = async () => {
  return await bookmarkService.getBookmarks();
};
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-8">
      <BookmarkList
        title="My Bookmarks"
        :show-add-button="true"
        :fetch-bookmarks="fetchBookmarks"
      />
    </div>
    <div class="col-span-4">
      <TagCloud />
    </div>
  </div>
</template>
