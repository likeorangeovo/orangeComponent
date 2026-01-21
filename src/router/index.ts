import { createRouter,createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from '../view/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;