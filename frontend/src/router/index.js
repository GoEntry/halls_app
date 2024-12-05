import { createRouter, createWebHistory } from 'vue-router';
import ScreenList from '../ScreenList.vue';
import Halls from '../components/Halls.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'screenList',
      component: ScreenList,
    },
    {
      path: '/Halls',
      name: 'Halls',
      component: Halls,
    },
  ],
});

export default router;
