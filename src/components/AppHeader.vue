<template>
  <header class="fixed top-0 left-0 w-full bg-white shadow-sm h-16 z-50">
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
        <h1 class="text-2xl font-bold text-gray-900 hidden sm:block">
          <router-link to="/"> Bookmarker </router-link>
        </h1>

        <!-- Dropdown Menu Button -->
        <div class="relative flex items-center gap-2">
          <router-link
            v-if="isAuthenticated"
            to="/bookmarks/add"
            class="btn btn-primary flex items-center mr-2"
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
            <span class="hidden sm:inline ms-2">New</span>
          </router-link>
          <div class="relative">
            <button
              @click="menuOpen = !menuOpen"
              class="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div
              v-if="menuOpen"
              class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50"
            >
              <div class="flex flex-col py-2">
                <router-link
                  to="/get-bookmarklet"
                  class="px-4 py-2 hover:bg-gray-100 flex items-center"
                  @click="closeMenu"
                >
                  <span>Get Bookmarklet</span>
                </router-link>
                <button
                  v-if="isAuthenticated"
                  @click="handleLogout"
                  class="px-4 py-2 text-left hover:bg-gray-100 flex items-center w-full"
                >
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";

const authStore = useAuthStore();
const router = useRouter();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const menuOpen = ref(false);

async function handleLogout() {
  await authStore.logout();
  menuOpen.value = false;
  router.push({ name: "login" });
}

function closeMenu() {
  menuOpen.value = false;
}

// Add event listener to close dropdown on outside click
import { onMounted, onBeforeUnmount } from "vue";
function handleClickOutside(event) {
  const menu = document.querySelector(".relative");
  if (menu && !menu.contains(event.target)) {
    menuOpen.value = false;
  }
}
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
