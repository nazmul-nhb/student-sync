<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Loader from './components/Loader.vue';
import { useAuthStore } from '@/stores/auth';
import Navbar from './components/Navbar.vue';

const authStore = useAuthStore();
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="min-h[calc(100vh-80px)] mt-28">
    <Loader v-if="authStore.userLoading" />
    <RouterView v-else />
  </main>
</template>

<style scoped></style>
