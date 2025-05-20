<script setup>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const showHeader = computed(() => route.path !== "/bookmarks/quick-add");
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader v-if="showHeader" />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 mt-1 lg:px-8">
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>
