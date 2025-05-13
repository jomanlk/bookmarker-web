<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <img
            src="@/assets/logo-icon.png"
            alt="Bookmarker Logo"
            class="h-8 w-8 object-contain"
          />
        </router-link>

        <!-- App Name -->
        <h1 class="text-2xl font-bold text-gray-900">
          <router-link to="/"> Bookmarker </router-link>
        </h1>

        <div class="flex items-center gap-4">
          <!-- Add Bookmark Button -->
          <router-link
            v-if="isAuthenticated"
            to="/bookmarks/add"
            class="btn btn-primary flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span class="hidden sm:inline ms-2">Add Bookmark</span>
          </router-link>

          <!-- Logout Button -->
          <button
            v-if="isAuthenticated"
            @click="handleLogout"
            class="btn btn-secondary"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { computed } from "vue";

const authStore = useAuthStore();
const router = useRouter();
const isAuthenticated = computed(() => authStore.isAuthenticated);

async function handleLogout() {
  await authStore.logout();
  router.push({ name: "login" });
}
</script>
