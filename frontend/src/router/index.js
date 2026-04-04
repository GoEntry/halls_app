import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import TrainingsView from '../views/TrainingsView.vue';
import TrainingFormView from '../views/TrainingFormView.vue';
import NutritionView from '../views/NutritionView.vue';
import VideosView from '../views/VideosView.vue';
import GoalsView from '../views/GoalsView.vue';
import ProfileView from '../views/ProfileView.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/trainings',
    name: 'Trainings',
    component: TrainingsView
  },
  {
    path: '/trainings/new',
    name: 'NewTraining',
    component: TrainingFormView
  },
  {
    path: '/trainings/:id',
    name: 'EditTraining',
    component: TrainingFormView
  },
  {
    path: '/nutrition',
    name: 'Nutrition',
    component: NutritionView
  },
  {
    path: '/videos',
    name: 'Videos',
    component: VideosView
  },
  {
    path: '/goals',
    name: 'Goals',
    component: GoalsView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
