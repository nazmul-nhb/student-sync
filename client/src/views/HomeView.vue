<script setup lang="ts">
import StudentForm from '@/components/StudentForm.vue';
import { useAuthStore } from '@/stores/auth';
import html2pdf from 'html2pdf.js';
import { computed } from 'vue';
import Loader from '../components/Loader.vue';

const authStore = useAuthStore();
const currentUser = computed(() => authStore.currentUser);
const isUserLoading = computed(() => authStore.isUserLoading);

const downloadPDF = () => {
  // Select the HTML element you want to export as PDF
  const element = document.getElementById('pdf-section');
  const timestamp = Date.now();
  // Define custom options for the PDF
  const options = {
    margin: 0.5,
    filename: `${currentUser.value ? currentUser.value.name : 'User'}-${timestamp}.pdf`,
    html2canvas: { scale: 2, scrollX: 0, scrollY: 0, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  };

  // Use html2pdf to generate the PDF
  html2pdf().set(options).from(element).save();
};
</script>

<template>
  <Loader v-if="isUserLoading" />
  <section v-else class="flex flex-col items-center justify-center gap-6">
    <button class="button" @click="downloadPDF">Download as PDF</button>
    <div
      v-if="currentUser"
      id="pdf-section"
      class="flex flex-col items-center justify-center gap-4 text-center mb-8"
    >
      <!-- Content you want to download as PDF -->
      <h1>This is Home!</h1>
      <h3>PDF Content</h3>
      <figure class="flex items-center justify-center gap-3 flex-col">
        <img
          class="w-36 border p-1 border-teal-950"
          :src="currentUser.image"
          :alt="currentUser.name"
        />
        <figcaption>{{ currentUser.name }}</figcaption>
      </figure>
      <h4>This section will be downloaded as a PDF.</h4>
    </div>
  </section>
  <StudentForm v-if="currentUser" :currentUser="currentUser" />
</template>

<style scoped>
.button {
  @apply font-semibold border border-gray-700/15 rounded-lg shadow-md shadow-gray-700 px-3 py-1.5 transition-all duration-300 ease-in-out;
}

.button:hover {
  @apply bg-gray-200 -translate-y-1; /* Lift the button slightly */
}

.button:focus {
  @apply shadow-md shadow-gray-600;
}

/* Add the click effect */
.button:active {
  @apply transform translate-y-1 shadow-sm shadow-gray-500; /* Move down when pressed */
}
</style>
