import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useAuthStore } from '@/stores/auth';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ErrorView from '@/views/ErrorView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      // meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      // meta: { requiresAuth: false },
    },
    {
      path: '/:catchAll(.*)', // Catch-all route
      component: ErrorView,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Wait until user loading completes if the route requires authentication
  if (to.meta.requiresAuth) {
    await authStore.waitUntilUserLoaded();

    // If not authenticated, redirect to login with the attempted path
    if (!authStore.currentUser) {
      return next({ path: '/login', query: { redirect: to.fullPath } });
    }
  }
  // Allow navigation for authenticated users or public routes
  next();
});

export default router;
