<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Loader from './components/Loader.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <Loader v-if="authStore.userLoading" />
  <RouterView v-else />
</template>

<style scoped></style>
