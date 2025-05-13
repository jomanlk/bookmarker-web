<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-1"
  >
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block mb-1 font-semibold">Username</label>
          <input
            v-model="username"
            type="text"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block mb-1 font-semibold">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          :disabled="loading"
        >
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
        <div v-if="error" class="text-red-600 mt-4 text-center">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(null);
const router = useRouter();
const authStore = useAuthStore();

async function handleLogin() {
  loading.value = true;
  error.value = null;
  await authStore.login(username.value, password.value);
  loading.value = false;
  if (authStore.isAuthenticated) {
    router.replace({ name: "home" });
  } else {
    error.value = authStore.error || "Login failed";
  }
}
</script>
