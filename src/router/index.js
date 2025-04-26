import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BookmarkEdit from "../components/BookmarkEdit.vue";
import BookmarkAdd from "../components/BookmarkAdd.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
