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
            @blur="validateEmail"
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
            @blur="validatePassword"
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
import type { ICredentials } from '@/types/interfaces';
import { useAuthStore } from '@/stores/auth';
import { FaEye, FaEyeSlash } from 'vue3-icons/fa';
import { RiLockPasswordFill } from 'vue3-icons/ri';
import { SiMaildotru } from 'vue3-icons/si';
import { toast } from 'vue3-toastify';
import { watch } from 'vue';

const { loginUser } = useAuthStore();

const router = useRouter();
const route = useRoute();
const redirect = route.query.redirect || '/';

// Define the form state
const user = reactive<ICredentials>({ email: '', password: '' });

// Define error state
const emailError = ref('');
const passwordError = ref('');

const isPasswordVisible = ref(false);

// Validation functions
const validateEmail = () => {
  const email = user.email.trim();
  if (!email) {
    emailError.value = 'Email is required';
  } else if (!isValidEmail(email)) {
    emailError.value = 'Enter a valid email';
  } else {
    emailError.value = '';
  }
};

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

// Regex function for email validation
const isValidEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Toggle password visibility
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

// Watch for email and password errors
watch(emailError, newError => {
  if (newError) {
    toast.error(newError);
  }
});

watch(passwordError, newError => {
  if (newError) {
    toast.error(newError);
  }
});

// Handle login logic
const handleLogin = async () => {
  validateEmail();
  validatePassword();

  if (!emailError.value && !passwordError.value) {
    const { success } = await loginUser(user);

    if (success) {
      router.push(redirect as string);
    }
  } else {
    if (emailError.value) {
      toast.error(emailError.value);
    } else if (passwordError.value) {
      toast.error(passwordError.value);
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
