import { createRouter, createWebHistory } from 'vue-router';
import Halls from '../components/Halls.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Halls
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
