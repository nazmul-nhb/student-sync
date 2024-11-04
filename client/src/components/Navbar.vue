<template>
  <nav
    class="bg-gray-800/85 w-full h-20 p-4 text-white fixed top-0 z-50 backdrop-blur-sm backdrop-filter"
  >
    <div class="container mx-auto flex justify-start items-center">
      <!-- Logo and Site Title -->
      <figure class="w-full flex items-center gap-2">
        <img :src="logo" alt="Cricket Carnival Logo" class="w-10" />
        <h1 class="text-xl font-bold">Student Sync</h1>
      </figure>
      <div class="w-full flex items-center justify-between gap-8">
        <!-- Nav Links -->
        <div
          v-if="!isUserLoading && currentUser"
          class="flex items-center justify-between gap-8"
        >
          <RouterLink to="/" active-class="active-link" class="inactive-link"
            >Home</RouterLink
          >
          <RouterLink
            v-if="userRole === 'admin'"
            to="/students"
            active-class="active-link"
            class="inactive-link"
            >Students</RouterLink
          >
        </div>
        <!-- Profile -->
        <div v-if="isUserLoading">Loading...</div>
        <div v-else class="flex items-center gap-4">
          <span v-if="currentUser">{{ currentUser.name }}</span>
          <img
            v-if="currentUser"
            class="w-12 aspect-square rounded-full p-1 border"
            :src="currentUser.image"
            :alt="currentUser.name"
          />
          <button v-if="currentUser" @click="handleLogout">Log Out</button>
          <RouterLink
            v-if="!currentUser"
            to="/login"
            active-class="active-link"
            class="inactive-link"
            >Login</RouterLink
          >
          <RouterLink
            v-if="!currentUser"
            to="/register"
            active-class="active-link"
            class="inactive-link"
            >Register</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import logo from '../assets/icons/logo.png';

const router = useRouter();

const authStore = useAuthStore();

const userRole = authStore.getUserRole();

const currentUser = computed(() => authStore.currentUser);
const isUserLoading = computed(() => authStore.isUserLoading);

const handleLogout = async () => {
  const loggedOut = await authStore.logOut();
  if (loggedOut) {
    router.push('/login');
  }
};
</script>

<style scoped>
/* Styles for active link */
.active-link {
  @apply text-blue-500 font-bold border-b border-blue-500 pb-1; /* Example active styles */
}

/* Styles for inactive link */
.inactive-link {
  @apply text-gray-200 font-semibold pb-1; /* Example inactive styles */
}
</style>
