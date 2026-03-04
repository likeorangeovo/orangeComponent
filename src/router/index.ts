import { createRouter,createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from '../view/Home.vue';
import Container from '../components/container/src/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Container',
    component: Container,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/directory-tree',
        name: 'DirectoryTree',
        component: () => import('../view/directoryTree/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;