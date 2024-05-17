import type { RouteRecordRaw } from "vue-router";
import A from "@/views/a.vue";
import B from "@/views/b.vue";
import Search from "@/views/search.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/b" },
  { path: "/a", component: A },
  { path: "/b", component: B },
  { path: "/search", component: Search },
];

export default routes;
