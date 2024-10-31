<template>
  <section class="flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded shadow-md">
      <h2 class="mb-4 text-2xl font-semibold text-center">Register</h2>

      <form @submit.prevent="handleRegister">
        <!-- Name -->
        <div class="input-div">
          <label for="name" class="label"><FaUserEdit /></label>
          <input
            id="name"
            name="name"
            type="text"
            v-model="user.name"
            @blur="validateName"
            placeholder="Enter your name"
            class="input"
          />
        </div>

        <!-- Email -->
        <div class="input-div">
          <label for="email" class="label"><SiMaildotru /></label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            v-model="user.email"
            @blur="validateEmail"
            class="input"
          />
        </div>

        <!-- Password -->
        <div class="input-div relative">
          <label for="password" class="label"><RiLockPasswordFill /> </label>
          <input
            id="password"
            name="password"
            placeholder="Create your password"
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model="user.password"
            @blur="validatePassword"
            class="input"
          />
          <span
            @click="togglePasswordVisibility"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <FaEye v-if="isPasswordVisible" />
            <FaEyeSlash v-else />
          </span>
        </div>

        <!-- Image File -->
        <div class="input-div">
          <label for="imageFile" class="label"><FaImage /> </label>
          <input
            id="imageFile"
            name="imageFile"
            type="file"
            placeholder="Choose your profile picture"
            @change="handleImageUpload"
            accept="image/png, image/jpeg"
            class="input"
          />
        </div>

        <button type="submit" class="w-full button">Register</button>
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
import { FaEye, FaEyeSlash, FaUserEdit } from 'vue3-icons/fa';
import { FaImage } from 'vue3-icons/fa6';
import { RiLockPasswordFill } from 'vue3-icons/ri';
import { SiMaildotru } from 'vue3-icons/si';
import { toast } from 'vue3-toastify';
import { isValidEmail, isValidPassword } from '@/utilities/validation';

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
  nameError.value = '';
  const name = user.name.trim();
  nameError.value = name ? '' : 'Name is required';

  if (nameError.value) {
    toast.error(nameError.value);
  }
};

// Validation for email
const validateEmail = () => {
  emailError.value = '';
  const email = user.email.trim();
  emailError.value = !email
    ? 'Email is required'
    : !isValidEmail(email)
      ? 'Enter a valid email'
      : '';

  if (emailError.value) {
    toast.error(emailError.value);
  }
};

// Validation for password
const validatePassword = () => {
  passwordError.value = '';

  const password = user.password;
  passwordError.value = !password
    ? 'Password is required'
    : password.length < 8
      ? 'Password must be at least 8 characters long'
      : !isValidPassword(password)
        ? 'Password must contain at least one upper and lower case letters, a number, and a symbol'
        : '';

  if (passwordError.value) {
    toast.error(passwordError.value);
  }
};

// Toggle password visibility
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

// Handle image file selection
const handleImageUpload = (event: Event) => {
  imageError.value = '';

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

  if (imageError.value) {
    toast.error(imageError.value);
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

  if (imageError.value) {
    return toast.error(imageError.value);
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
      if (error instanceof Error) {
        toast.error(error.message);
      }
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
