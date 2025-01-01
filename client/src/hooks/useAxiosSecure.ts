// useAxiosSecure.js
import { useAuthStore } from '@/stores/auth';
import { baseUrl } from '@/utilities/constants';
import axios from 'axios';
import { useRouter } from 'vue-router';

const axiosSecure = axios.create({ baseURL: baseUrl });

export const useAxiosSecure = () => {
  const router = useRouter();
  const { logOut } = useAuthStore();

  // Add request interceptor to include authorization headers
  axiosSecure.interceptors.request.use(
    config => {
      const token = localStorage.getItem('student-token');
      
      if (!token) {
        console.warn('Missing Access Token! Redirecting to Login Page...');

        router.push('/login');

        return Promise.reject(new Error('Missing Access Token!'));
      }
      // proceed if token is found
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    error => {
      // Handle request errors
      return Promise.reject(error);
    },
  );

  // Add response interceptor for handling 401/403 errors
  axiosSecure.interceptors.response.use(
    response => response,
    async error => {
      const status = error.response ? error.response.status : null;

      // If the token is invalid or expired, log out and redirect
      if (status === 401 || status === 403) {
        console.error('Unauthorized or Forbidden Access: ', status);

        logOut();
        router.push('/login');
      }

      return Promise.reject(error);
    },
  );

  return axiosSecure;
};
