<template>
  <div v-if="studentData">Hello! {{ studentData.studentName }}</div>
  <Error v-else heading="Student Not Found" subHeading="Please, register first!" />
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useQuery } from '@tanstack/vue-query';
import { useAxiosSecure } from '@/hooks/useAxiosSecure';
import type { IStudentResponse } from '@/types/interfaces';
import Error from '@/components/Error.vue';

const route = useRoute();
const { id } = route.params;

const authStore = useAuthStore();
const axiosSecure = useAxiosSecure();

const studentData = ref<IStudentResponse['studentData'] | null>(null);

const currentUser = computed(() => authStore.currentUser);

const { data, refetch } = useQuery({
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
