import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useAuthStore } from '@/stores/auth';
import LoginView from '@/views/LoginView.vue';

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
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Only wait for `userLoading` if the route requires authentication
  if (to.meta.requiresAuth) {
    await authStore.waitUntilUserLoaded();

    // Redirect if authentication is required but the user is not logged in
    if (!authStore.currentUser) {
      return next({ path: '/login', query: { redirect: to.fullPath } });
    }
  }

  // Allow navigation for non-authenticated routes or authenticated users
  next();
});

export default router;
