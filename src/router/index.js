import { createRouter, createWebHistory } from "vue-router";
import BookmarkList from "../components/BookmarkList.vue";
import BookmarkEdit from "../components/BookmarkEdit.vue";
import BookmarkAdd from "../components/BookmarkAdd.vue";

const routes = [
  {
    path: "/",
    name: "bookmarks",
    component: BookmarkList,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
