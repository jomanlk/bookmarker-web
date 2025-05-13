import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);
app.use(createPinia());

// Check authentication state before mounting the app
const authStore = useAuthStore();
authStore.checkAuth().finally(() => {
  app.use(router);
  app.mount("#app");
});
