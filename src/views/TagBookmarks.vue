<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import bookmarkService from "../services/bookmarkService";
import BookmarkList from "../components/BookmarkList.vue";

const route = useRoute();
const tagName = ref(route.query.tag);

const fetchBookmarksByTag = async () => {
  return await bookmarkService.searchByTag(tagName.value);
};
</script>

<template>
  <BookmarkList
    :title="'Bookmarks tagged with ' + tagName"
    :show-add-button="false"
    :fetch-bookmarks="fetchBookmarksByTag"
  />
</template>
