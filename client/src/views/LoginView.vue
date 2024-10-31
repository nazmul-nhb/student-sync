<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white rounded shadow-md">
      <h2 class="mb-4 text-2xl font-semibold text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block mb-1 text-gray-600">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            v-model="form.email"
            @blur="validateEmail"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <div v-if="emailError" class="text-sm text-red-600">
            {{ emailError }}
          </div>
        </div>
        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block mb-1 text-gray-600"
            >Password</label
          >
          <input
            id="password"
            name="password"
            type="password"
            v-model="form.password"
            @blur="validatePassword"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <div v-if="passwordError" class="text-sm text-red-600">
            {{ passwordError }}
          </div>
        </div>
        <button
          type="submit"
          class="w-full px-3 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { ICredentials } from '@/types/interfaces';

// Define the form state
const form = reactive<ICredentials>({ email: '', password: '' });

// Define error state
const emailError = ref('');
const passwordError = ref('');

// Validation functions
const validateEmail = () => {
  const email = form.email.trim();
  if (!email) {
    emailError.value = 'Email is required';
  } else if (!isValidEmail(email)) {
    emailError.value = 'Enter a valid email';
  } else {
    emailError.value = '';
  }
};

const validatePassword = () => {
  const password = form.password;
  if (!password) {
    passwordError.value = 'Password is required';
  } else if (password.length < 8) {
    passwordError.value = 'Password must be at least 8 characters long';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
    passwordError.value =
      'Password must contain at least 6 characters, upper and lower case letters, a number, and a symbol';
  } else {
    passwordError.value = '';
  }
};

// Regex function for email validation
const isValidEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Handle login logic
const handleLogin = () => {
  validateEmail();
  validatePassword();

  if (!emailError.value && !passwordError.value) {
    // Handle successful login
    console.log('Form is valid, proceed with login', form);
  } else {
    console.log('Validation failed', {
      emailError: emailError.value,
      passwordError: passwordError.value,
    });
  }
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
