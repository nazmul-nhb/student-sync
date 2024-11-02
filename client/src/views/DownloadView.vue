<template>
  <!-- Show loader if user or student data is loading -->
  <Loader v-if="isUserLoading || isStudentLoading" />

  <!-- Show student data if loaded successfully -->
  <div v-else-if="studentData">Hello! {{ studentData.studentName }}</div>

  <!-- Show error if query has an error and data is not loaded -->
  <Error
    v-else
    heading="Student Not Found"
    subHeading="Please, register first!"
  />
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useQuery } from '@tanstack/vue-query';
import { useAxiosSecure } from '@/hooks/useAxiosSecure';
import type { IStudentResponse } from '@/types/interfaces';
import Error from '@/components/Error.vue';
import Loader from '@/components/Loader.vue';

const route = useRoute();
const { id } = route.params;

const authStore = useAuthStore();
const axiosSecure = useAxiosSecure();

const studentData = ref<IStudentResponse['studentData'] | null>(null);

// const currentUser = computed(() => authStore.currentUser);
const isUserLoading = computed(() => authStore.isUserLoading);

const {
  data,
  isLoading: isStudentLoading,
  // refetch,
} = useQuery({
  queryKey: ['studentData', id],
  queryFn: async () => {
    const { data } = await axiosSecure.get<IStudentResponse>(`/student/${id}`);
    return data;
  },
});

watch(data, newData => {
  if (newData) {
    studentData.value = newData.studentData;
  }
});
</script>
<style scoped></style>
