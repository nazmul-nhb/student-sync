<template>
  <section class="flex items-center justify-center bg-gray-100">
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
        <div class="mb-4 relative">
          <label for="password" class="block mb-1 text-gray-600"
            >Password</label
          >
          <input
            id="password"
            name="password"
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="user.password"
            @blur="validatePassword"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <span
            @click="togglePasswordVisibility"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <FaEye v-if="isPasswordVisible" />
            <FaEyeSlash v-else />
          </span>
          <div v-if="passwordError" class="text-sm text-red-600">
            {{ passwordError }}
          </div>
        </div>

        <!-- Image File -->
        <div class="mb-4">
          <label for="imageFile" class="block mb-1 text-gray-600"
            >Profile Image</label
          >
          <input
            id="imageFile"
            name="imageFile"
            type="file"
            @change="handleImageUpload"
            accept="image/png, image/jpeg"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <div v-if="imageError" class="text-sm text-red-600">
            {{ imageError }}
          </div>
        </div>

        <button
          type="submit"
          class="w-full px-3 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { IUserRegister } from '@/types/interfaces';
import { useAuthStore } from '@/stores/auth';
import { useCloudinary } from '@/hooks/useCloudinary';
import { FaEye, FaEyeSlash } from 'vue3-icons/fa';

const { registerUser } = useAuthStore();
const { uploadImage } = useCloudinary();

const router = useRouter();

// Define the form state
const user = reactive<IUserRegister>({
  name: '',
  email: '',
  password: '',
  image: '',
});

// Define error states
const nameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const imageError = ref('');
const selectedFile = ref<File | null>(null);
const isPasswordVisible = ref(false);

// Validation for name
const validateName = () => {
  const name = user.name.trim();
  nameError.value = name ? '' : 'Name is required';
};

// Validation for email
const validateEmail = () => {
  const email = user.email.trim();
  emailError.value = !email
    ? 'Email is required'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? 'Enter a valid email'
      : '';
};

// Validation for password
const validatePassword = () => {
  const password = user.password;
  passwordError.value = !password
    ? 'Password is required'
    : password.length < 8
      ? 'Password must be at least 8 characters long'
      : !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)
        ? 'Password must contain upper/lower case letters, a number, and a symbol'
        : '';
};

// Toggle password visibility
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

// Handle image file selection
const handleImageUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files[0]) {
    const file = files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      selectedFile.value = file;
      imageError.value = ''; // Clear error if file type is valid
    } else {
      imageError.value = 'Only JPG and PNG files are allowed';
      selectedFile.value = null; // Reset selected file
    }
  } else {
    imageError.value = 'Image is required'; // Set error if no file is selected
    selectedFile.value = null; // Reset selected file
  }
};

// Handle registration logic
const handleRegister = async () => {
  validateName();
  validateEmail();
  validatePassword();

  // Check if an image file is selected
  if (!selectedFile.value) {
    imageError.value = 'Image is required';
  } else {
    imageError.value = ''; // Clear image error if file is present
  }

  // Only proceed if there are no errors
  if (
    !nameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !imageError.value
  ) {
    try {
      // Upload the selected image file if available
      if (selectedFile.value) {
        user.image = await uploadImage(selectedFile.value);
      }

      const { success } = await registerUser(user);

      if (success) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Image upload or registration failed:', error);
    }
  } else {
    console.log('Validation failed');
  }
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
