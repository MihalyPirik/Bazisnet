import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "../views/HomeView.vue";
import ChangerView from "../views/ChangerView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: "/changer",
      component: ChangerView,
    },
  ],
});

export default router;
