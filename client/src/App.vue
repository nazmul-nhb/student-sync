<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main class="min-h[calc(100vh-80px)] mt-28 px-6 md:px-12 xl:px-20">
    <RouterView />
  </main>
</template>

<style scoped></style>
