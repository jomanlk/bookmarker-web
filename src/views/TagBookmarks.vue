<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import bookmarkService from "../services/bookmarkService";
import BookmarkList from "../components/BookmarkList.vue";
import TagCloud from "../components/TagCloud.vue";

const route = useRoute();
const tagName = ref(route.params.tag);

watch(
  () => route.params.tag,
  (newTag) => {
    tagName.value = newTag;
  }
);

const fetchBookmarksByTag = async () => {
  return await bookmarkService.searchByTag(tagName.value);
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
    <div class="md:col-span-8 col-span-1">
      <BookmarkList
        :key="tagName"
        :title="'Bookmarks tagged with ' + tagName"
        :show-add-button="false"
        :fetch-bookmarks="fetchBookmarksByTag"
      />
    </div>
    <div class="col-span-4 hidden md:block">
      <TagCloud />
    </div>
  </div>
</template>
