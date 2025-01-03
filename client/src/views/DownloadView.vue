<template>
  <!-- Show loader if user or student data is loading -->
  <Loader v-if="isUserLoading || isStudentLoading" />

  <!-- Show student data if loaded successfully -->
  <section v-else-if="studentData" class="mx-auto w-1/2">
    <div class="">
      <b>Registered Course: </b>
      <span>{{ studentData.courseName }}</span>
    </div>
    <div class="">
      <b>Registration ID: </b>
      <span>{{ studentData.registrationID }}</span>
    </div>
    <div class="">
      <b>Training Location: </b>
      <span>{{ studentData.trainingLocation }}</span>
    </div>
    <div class="">
      <b>Student's Name: </b>
      <span>{{ studentData.user.name }}</span>
    </div>
    <div class="">
      <b>Father's Name: </b>
      <span>{{ studentData.fatherName }}</span>
    </div>
    <div class="">
      <b>Mother's Name: </b>
      <span>{{ studentData.motherName }}</span>
    </div>
    <!-- Birth Date & Current Age -->
    <div class="flex justify-between items-center flex-wrap gap-4">
      <span class="">
        <b>Date of Birth: </b>
        <span v-if="studentData.dateOfBirth">{{
          formatDateOnly(studentData.dateOfBirth) || 'Not Available'
        }}</span>
      </span>
      <span class="">
        <b>Current Age: </b>
        <span v-if="studentData.dateOfBirth">{{
          getCurrentAge(studentData.dateOfBirth) || 'Not Available'
        }}</span>
      </span>
    </div>
    <!-- Marital Status & Gender -->
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <span class="">
        <b>Marital Status: </b>
        <span>{{ studentData.maritalStatus }}</span>
      </span>
      <span class="">
        <b>Gender: </b>
        <span>{{ studentData.gender }}</span>
      </span>
    </div>
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <span class="">
        <b>Educational Qualification: </b>
        <span>{{ studentData.highestEducation }}</span>
      </span>
      <span class="">
        <b>Occupation: </b>
        <span>{{ studentData.occupation }}</span>
      </span>
    </div>
    <div class="">
      <b>Current Institution: </b>
      <span>{{ studentData.instituteName }}</span>
    </div>
    <!-- Address -->
    <h3>Address</h3>
    <div class="">
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <span class="">
          <b>Village/Area: </b>
          <span>{{ studentData.address.village }}</span>
        </span>
        <span class="">
          <b>Ward: </b>
          <span>{{ studentData.address.ward }}</span>
        </span>
      </div>
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <span class="">
          <b>Union/Municipality: </b>
          <span>{{ studentData.address.union }}</span>
        </span>
        <span class="">
          <b>Post Office: </b>
          <span>{{ studentData.address.postOffice }}</span>
        </span>
      </div>
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <span class="">
          <b>Upazila: </b>
          <span>{{ studentData.address.upazila }}</span>
        </span>
        <span class="">
          <b>District: </b>
          <span>{{ studentData.address.district }}</span>
        </span>
      </div>
    </div>
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <span class="">
        <b>Blood Group: </b>
        <span>{{ studentData.bloodGroup || 'Not Available' }}</span>
      </span>
      <span class="">
        <b>NID: </b>
        <span>{{ studentData.NID || 'Not Available' }}</span>
      </span>
    </div>
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <span class="">
        <b>Student's Mobile: </b>
        <span>{{ studentData.studentMobile }}</span>
      </span>
      <span class="">
        <b>Guardian's Mobile: </b>
        <span>{{ studentData.guardianMobile || 'Not Available' }}</span>
      </span>
    </div>
    <div class="">
      <b>Student's Email: </b>
      <span>{{ studentData.user.email }}</span>
    </div>
    <!-- JSC/SSC/HSA/Equivalent -->
    <h3>JSC/SSC/Equivalent</h3>
    <div class="">
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <span class="">
          <b>Roll: </b>
          <span>{{
            studentData.minimumEducation.roll || 'Not Available'
          }}</span>
        </span>
        <span class="">
          <b>Registration No.: </b>
          <span>{{
            studentData.minimumEducation.registration || 'Not Available'
          }}</span>
        </span>
        <span class="">
          <b>Examination: </b>
          <span>{{
            studentData.minimumEducation.examination || 'Not Available'
          }}</span>
        </span>
      </div>
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <span class="">
          <b>GPA: </b>
          <span>{{ studentData.minimumEducation.GPA || 'Not Available' }}</span>
        </span>
        <span class="">
          <b>Board: </b>
          <span>{{
            studentData.minimumEducation.board || 'Not Available'
          }}</span>
        </span>
        <span class="">
          <b>Passing Year: </b>
          <span>{{
            studentData.minimumEducation.passingYear || 'Not Available'
          }}</span>
        </span>
      </div>
    </div>
    <div class="">
      <b>Registered at: </b>
      <span>{{ formatDateTimeStatic(studentData.createdAt) }}</span>
    </div>
    <div class="">
      <b>Updated at: </b>
      <span>{{ formatDateTimeStatic(studentData.updatedAt) }}</span>
    </div>
  </section>

  <!-- Show error if query has an error and data is not loaded -->
  <Error
    v-else-if="isError || !studentData"
    :heading="downLoadError.name || 'Student Not Found!'"
    :subHeading="downLoadError.message || 'Please, register first!'"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useQuery } from '@tanstack/vue-query';
import { useAxiosSecure } from '@/hooks/useAxiosSecure';
import type {
  IErrorResponse,
  IStudent,
  IServerResponse,
} from '@/types/interfaces';
import Error from '@/components/Error.vue';
import Loader from '@/components/Loader.vue';
import type { AxiosError } from 'axios';
import {
  formatDateOnly,
  formatDateTimeStatic,
  getCurrentAge,
} from '@/utilities/formatDate';

const route = useRoute();
const { id } = route.params;

const authStore = useAuthStore();
const axiosSecure = useAxiosSecure();

// const currentUser = computed(() => authStore.currentUser);
const isUserLoading = computed(() => authStore.isUserLoading);

const {
  data,
  isLoading: isStudentLoading,
  isError,
  error,
  // refetch,
} = useQuery({
  queryKey: ['studentData', id],
  enabled: !!id,
  queryFn: async () => {
    const { data } = await axiosSecure.get<IServerResponse<IStudent>>(
      `/students/${id}`,
    );
    return data;
  },
});

const studentData = computed(() => data.value?.data || null);

const downLoadError = computed(() => {
  const axiosError = error.value as AxiosError<IErrorResponse>;

  return {
    name: axiosError?.response?.data?.error.name || axiosError?.name,
    message: axiosError?.response?.data?.message || axiosError?.message
  };
});
</script>

<style scoped></style>
