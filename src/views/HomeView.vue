<script setup>
import BookmarkList from "../components/BookmarkList.vue";
import bookmarkService from "../services/bookmarkService";

const fetchBookmarks = async () => {
  return await bookmarkService.getBookmarks();
};
</script>

<template>
  <BookmarkList
    title="My Bookmarks"
    :show-add-button="true"
    :fetch-bookmarks="fetchBookmarks"
  />
</template>
