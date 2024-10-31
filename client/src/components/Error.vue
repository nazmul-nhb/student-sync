<template>
  <div class="mb-6 mt-12 flex flex-col items-center justify-center">
    <div class="relative w-20 h-20 mb-4">
      <div
        class="absolute inset-0 rounded-full border-8 border-red-200 border-t-red-600 animate-spin"
      ></div>
      <span
        class="absolute inset-0 text-5xl font-black text-red-600 flex items-center justify-center animate-pulse"
      >
        !
      </span>
    </div>

    <h3
      class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-red-700 mb-2 animate-pulse"
    >
      {{ heading }}
    </h3>
    <p class="md:text-lg text-red-400 mb-6">{{ subHeading }}</p>
  </div>
</template>

<script setup lang="ts">
const { heading, subHeading } = defineProps<{
  heading: string;
  subHeading: string;
}>();
</script>
