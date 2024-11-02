<template>
  <section class="flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm p-6 bg-white rounded shadow-md">
      <h2 class="mb-4 text-2xl font-semibold text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="input-div">
          <label for="email" class="label"><SiMaildotru /></label>
          <input
            id="email"
            name="email"
            type="email"
            v-model="user.email"
            placeholder="Enter your email"
            class="input"
          />
        </div>
        <!-- Password -->
        <div class="input-div relative">
          <label for="password" class="label"><RiLockPasswordFill /></label>
          <input
            id="password"
            name="password"
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="user.password"
            placeholder="Enter your password"
            class="input"
          />
          <span
            @click="togglePasswordVisibility"
            class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <FaEye v-if="isPasswordVisible" />
            <FaEyeSlash v-else />
          </span>
        </div>
        <button type="submit" class="w-full button">Login</button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { ICredentials, IStatusResponse } from '@/types/interfaces';
import { useAuthStore } from '@/stores/auth';
import { FaEye, FaEyeSlash } from 'vue3-icons/fa';
import { RiLockPasswordFill } from 'vue3-icons/ri';
import { SiMaildotru } from 'vue3-icons/si';
import { toast } from 'vue3-toastify';
import { validateLoginSchema } from '@/utilities/validation';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import {
  showLoadingSpinnerAlert,
  showStaticAlert,
} from '@/utilities/sweetAlert';

const { loginUser } = useAuthStore();

const router = useRouter();
const route = useRoute();
const redirect = route.query.redirect || '/';

// Define the form state
const user = reactive<ICredentials>({ email: '', password: '' });

const isPasswordVisible = ref(false);

// Toggle password visibility
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

// Handle login logic
const handleLogin = async () => {
  const result = validateLoginSchema.safeParse(user);

  if (!result.success) {
    // Display validation errors
    result.error.errors.forEach(error => {
      toast.error(error.message);
    });
    return;
  }

  try {
    // Show spinner while logging in the user
    showLoadingSpinnerAlert('Logging in...');

    const { success, message } = await loginUser(user);

    // Hide and close loading spinner
    Swal.hideLoading();
    Swal.close();

    if (success) {
      router.push(redirect as string);
    } else {
      toast.error(message);
      showStaticAlert(
        'Login Error!',
        message || 'Something went Wrong!',
        'error',
      );
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<IStatusResponse>;
      if (axiosError.response && axiosError.response.data) {
        showStaticAlert(
          error.message,
          axiosError.response.data.message,
          'error',
        );
      }
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Something went Wrong!');
    }
  }
};
</script>

<style scoped>
.input-div {
  @apply mb-4 flex items-center gap-1.5;
}

.label {
  @apply p-3 rounded text-gray-600 border border-gray-700/15 shadow-md shadow-gray-700;
}

.input {
  @apply w-full px-3 py-2 rounded outline-none border border-gray-700/15 shadow-md shadow-gray-700 transition-all duration-500 ease-in-out;
}

.input:focus {
  @apply bg-gray-200 -translate-y-1;
}

.button {
  @apply font-semibold border bg-blue-900 text-white border-blue-800/15 rounded-lg shadow-md shadow-blue-900 px-3 py-1.5 transition-all duration-500 ease-in-out;
}

.button:hover {
  @apply bg-blue-600 -translate-y-1; /* Lift the button slightly */
}

.button:focus {
  @apply shadow-md shadow-blue-500;
}

/* Add the click effect */
.button:active {
  @apply transform translate-y-1 bg-blue-200 text-blue-800 shadow-sm shadow-blue-800; /* Move down when pressed */
}
</style>
