import { createRouter, createWebHistory } from "vue-router";
import BookmarkList from "../components/BookmarkList.vue";
import BookmarkEdit from "../components/BookmarkEdit.vue";

const routes = [
  {
    path: "/",
    name: "bookmarks",
    component: BookmarkList,
  },
  {
    path: "/bookmarks/:id/edit",
    name: "edit-bookmark",
    component: BookmarkEdit,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
