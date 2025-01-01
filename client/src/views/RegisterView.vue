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
            @change="handleImageChange"
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
import type { IStatusResponse, IUserRegister } from '@/types/interfaces';
import { useAuthStore } from '@/stores/auth';
import { useCloudinary } from '@/hooks/useCloudinary';
import { FaEye, FaEyeSlash, FaUserEdit } from 'vue3-icons/fa';
import { FaImage } from 'vue3-icons/fa6';
import { RiLockPasswordFill } from 'vue3-icons/ri';
import { SiMaildotru } from 'vue3-icons/si';
import { toast } from 'vue3-toastify';
import {
  isValidImageType,
  validateRegistrationSchema,
} from '@/utilities/validation';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import {
  showConfirmDialogue,
  showLoadingSpinnerAlert,
  showStaticAlert,
} from '@/utilities/sweetAlert';
// import { useAxiosPublic } from '@/hooks/useAxiosPublic';

const { registerUser } = useAuthStore();
const { uploadImage } = useCloudinary();

const router = useRouter();
// const axiosPublic = useAxiosPublic();

// Define the form state
const user = reactive<IUserRegister>({
  name: '',
  email: '',
  password: '',
  image: '',
});

const imageError = ref('');
const selectedFile = ref<File | null>(null);
const isPasswordVisible = ref(false);

// Toggle password visibility
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

// Handle image file selection
const handleImageChange = (event: Event) => {
  imageError.value = '';

  const files = (event.target as HTMLInputElement).files;
  if (files && files[0]) {
    const file = files[0];

    if (isValidImageType(file)) {
      selectedFile.value = file;
      imageError.value = '';
    } else {
      imageError.value = 'Only JPG and PNG files are allowed!';
      selectedFile.value = null;
    }
  } else {
    imageError.value = 'Image is required!';
    selectedFile.value = null;
  }

  if (imageError.value) {
    toast.error(imageError.value);
  }
};

// Handle registration logic
const handleRegister = async () => {
  const result = validateRegistrationSchema.safeParse(user);

  if (!result.success) {
    // Display validation errors
    result.error.errors.forEach(error => {
      toast.error(error.message);
    });
    return;
  }

  // Check if the image file is selected
  if (!selectedFile.value) {
    imageError.value = 'Image is required!';
    toast.error(imageError.value);
    return;
  } else {
    imageError.value = '';
  }

  // Only proceed if there are no errors
  try {
    // Show spinner while registering new user
    showLoadingSpinnerAlert('Registering...');

    // Upload the selected image file if available
    if (selectedFile.value) {
      user.image = await uploadImage(selectedFile.value, user.email);
    }

    const { success, message } = await registerUser(user);

    // Hide and close loading spinner
    Swal.hideLoading();
    Swal.close();

    if (success) {
      toast.success(message);

      // Ask permission to go to the login page
      const proceed = await showConfirmDialogue(
        'Registered',
        message,
        'success',
        'Login Now!',
        'Login Later!',
      );

      // Proceed to the login page
      if (proceed.isConfirmed) {
        router.push('/login');
      }
    } else {
      toast.error(message);
      showStaticAlert(
        'Registration Failed!',
        message || 'Something went Wrong!',
        'error',
      );
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<IStatusResponse>;
      if (axiosError.response && axiosError.response.data) {
        showStaticAlert(
          "Registration Failed!",
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
