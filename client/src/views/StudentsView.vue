<template>
  <Loader v-if="isStudentsLoading" />
  <Error
    v-else-if="isError && !isStudentsLoading"
    :heading="errorMessage || 'Something Went Wrong!'"
    :subHeading="error?.message || 'Error Fetching Students Data!'"
  />
  <section v-else class="container">
    <h1 class="text-center">{{ data?.message }}</h1>
    <div class="space-y-8">
      <router-link
        :to="`/download/${student.registrationID}`"
        v-for="student in studentsData"
        :key="student._id"
        class="flex items-center gap-4 justify-between flex-wrap border border-gray-500/25 shadow-md shadow-gray-600 rounded-lg p-4 hover:-translate-y-1 focus:translate-y-1 focus:shadow-sm transition-all duration-300"
      >
        <figure>
          <img
            class="w-20 rounded-full p-1 border aspect-square"
            :src="student?.studentImage"
            :alt="student.studentName"
          />
        </figure>
        <h3>{{ student.studentName }}</h3>
        <h3>{{ student.courseName }}</h3>
        <h3>{{ student.registrationID }}</h3>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import Error from '@/components/Error.vue';
import Loader from '@/components/Loader.vue';
import { useAxiosSecure } from '@/hooks/useAxiosSecure';
import type { IStatusResponse, IStudentsResponse } from '@/types/interfaces';
import { useQuery } from '@tanstack/vue-query';
import type { AxiosError } from 'axios';
import { computed } from 'vue';

const axiosSecure = useAxiosSecure();

const {
  data,
  isLoading: isStudentsLoading,
  isError,
  error,
  // refetch,
} = useQuery({
  queryKey: ['studentsData'],
  queryFn: async () => {
    const { data } = await axiosSecure.get<IStudentsResponse>(`/student`);
    return data;
  },
});

const studentsData = computed(() => data.value?.studentData || []);
const errorMessage = computed(
  () =>
    (error.value as AxiosError<IStatusResponse>)?.response?.data.message || '',
);
</script>

<style scoped></style>
