<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded shadow-md">
      <h2 class="mb-4 text-2xl font-semibold text-center">Register</h2>

      <form @submit.prevent="handleRegister">
        <!-- Name -->
        <div class="mb-4">
          <label for="name" class="block mb-1 text-gray-600">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            v-model="user.name"
            @blur="validateName"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <div v-if="nameError" class="text-sm text-red-600">
            {{ nameError }}
          </div>
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block mb-1 text-gray-600">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            v-model="user.email"
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
            v-model="user.password"
            @blur="validatePassword"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <div v-if="passwordError" class="text-sm text-red-600">
            {{ passwordError }}
          </div>
        </div>

        <!-- Image -->
        <div class="mb-4">
          <label for="image" class="block mb-1 text-gray-600">Image URL</label>
          <input
            id="image"
            name="image"
            type="text"
            v-model="user.image"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <button
          type="submit"
          class="w-full px-3 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { IUserRegister } from '@/types/interfaces';
import { useAuthStore } from '@/stores/auth';

const { registerUser } = useAuthStore();

const router = useRouter();

// Define the form state
const user = reactive<IUserRegister>({
  name: '',
  email: '',
  password: '',
  image: '',
});

// Define error state
const nameError = ref('');
const emailError = ref('');
const passwordError = ref('');

// Validation for name
const validateName = () => {
  const name = user.name.trim();
  if (!name) {
    nameError.value = 'Name is required';
  } else {
    nameError.value = '';
  }
};

// Validation for email
const validateEmail = () => {
  const email = user.email.trim();
  if (!email) {
    emailError.value = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.value = 'Enter a valid email';
  } else {
    emailError.value = '';
  }
};

// Validation for password
const validatePassword = () => {
  const password = user.password;
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

// Handle registration logic
const handleRegister = async () => {
  validateName();
  validateEmail();
  validatePassword();

  if (!nameError.value && !emailError.value && !passwordError.value) {
    const { success } = await registerUser(user);

    if (success) {
      router.push('/login');
    }
  } else {
    console.log('Validation failed');
  }
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
