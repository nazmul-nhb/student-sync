<template>
  <div>Hello!{{ id }}</div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
const id = route.params.id;

onMounted(() => {
  console.log('Download ID:', id);
});
</script>
<style scoped></style>
