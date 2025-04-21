<script setup>
import { ref, watch, onMounted } from "vue";
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

const bookmarks = ref([]);
const loading = ref(false);

async function loadBookmarks() {
  loading.value = true;
  try {
    bookmarks.value = await bookmarkService.searchByTag(tagName.value);
  } catch (e) {
    bookmarks.value = [];
  }
  loading.value = false;
}

onMounted(loadBookmarks);

watch(tagName, loadBookmarks);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
    <div class="md:col-span-8 col-span-1">
      <BookmarkList
        :key="tagName"
        :title="'Bookmarks tagged with ' + tagName"
        :show-add-button="false"
        :bookmarks="bookmarks"
        :loading="loading"
      />
    </div>
    <div class="col-span-4 hidden md:block">
      <TagCloud />
    </div>
  </div>
</template>
