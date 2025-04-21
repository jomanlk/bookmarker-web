<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import bookmarkService from "../services/bookmarkService";
import BookmarkList from "../components/BookmarkList.vue";
import TagCloud from "../components/TagCloud.vue";

const route = useRoute();
const tagName = ref(route.query.tag);

const fetchBookmarksByTag = async () => {
  return await bookmarkService.searchByTag(tagName.value);
};
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-8">
      <BookmarkList
        :title="'Bookmarks tagged with ' + tagName"
        :show-add-button="false"
        :fetch-bookmarks="fetchBookmarksByTag"
      />
    </div>
    <div class="col-span-4">
      <TagCloud />
    </div>
  </div>
</template>
