import {
  createRouter,
  createWebHistory,
  type RouteMeta,
  type RouteRecordRaw,
} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useAuthStore } from '@/stores/auth';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import type { IRouteMeta } from '@/types/interfaces';
import DownloadView from '@/views/DownloadView.vue';

const routes: Array<RouteRecordRaw & { meta: IRouteMeta }> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true, roles: ['user', 'admin'] },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true, roles: ['admin'] },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { requiresAuth: false },
  },
  {
    path: '/download/:id',
    name: 'Download',
    component: DownloadView,
    meta: { requiresAuth: true, roles: ['user', 'admin'] },
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('../views/ForbiddenView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/:catchAll(.*)', // Catch-all route
    name: 'Error',
    component: NotFoundView,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  const title = (to.name as string) || 'Student Sync';
  document.title = `${title} - Student Sync`;

  // Wait until user loading completes if the route requires authentication
  if (to.meta.requiresAuth) {
    await authStore.waitUntilUserLoaded();

    // If not authenticated, redirect to login with the attempted path
    if (!authStore.currentUser) {
      return next({ path: '/login', query: { redirect: to.fullPath } });
    }

    // Role-based access
    const userRole = authStore.getUserRole();

    if (
      to.meta.roles &&
      Array.isArray(to.meta.roles) &&
      !to.meta.roles.includes(userRole)
    ) {
      return next({ path: '/403' });
    }
  }
  // Allow navigation for authenticated users or public routes
  next();
});

export default router;
