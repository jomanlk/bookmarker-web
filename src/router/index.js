import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookmarkEdit from "../components/BookmarkEdit.vue";
import BookmarkAdd from "../components/BookmarkAdd.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/bookmarks/add",
    name: "add-bookmark",
    component: BookmarkAdd,
  },
  {
    path: "/bookmarks/:id/edit",
    name: "edit-bookmark",
    component: BookmarkEdit,
    props: true,
  },
  {
    path: "/bookmarks/tag/:tag",
    name: "TagBookmarks",
    component: () => import("../views/TagBookmarks.vue"),
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  // Only allow unauthenticated access to the login page
  if (to.name !== "login" && !authStore.isAuthenticated) {
    next({ name: "login" });
  } else if (to.name === "login" && authStore.isAuthenticated) {
    // Prevent logged-in users from visiting login page
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
