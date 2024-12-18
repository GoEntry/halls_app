import { createRouter, createWebHistory } from 'vue-router';
import ScreenList from '../ScreenList.vue';
import Halls from '../components/Halls.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Halls
  },
  {
    path: '/ScreenList',
    name: 'screenList',
    component: ScreenList,
  },
  {
    path: '/Halls',
    name: 'Halls',
    component: Halls,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
