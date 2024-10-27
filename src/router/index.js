import { createRouter, createWebHistory } from "vue-router";
import UrlShortener from "../views/UrlShortener.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "urlshortener",
    component: UrlShortener,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not_found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
