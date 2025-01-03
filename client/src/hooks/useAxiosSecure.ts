import axios from 'axios';
import router from '@/router';
import { baseUrl } from '@/utilities/constants';

const axiosSecure = axios.create({ baseURL: baseUrl });

export const useAxiosSecure = () => {
  // Add request interceptor to include authorization headers
  axiosSecure.interceptors.request.use(
    config => {
      const token = localStorage.getItem('student-token');

      if (!token) {
        console.warn('Missing Access Token! Redirecting to Login Page...');

        router.push({
          path: '/login',
          query: { redirect: router.currentRoute.value.fullPath },
        });

        return Promise.reject(new Error('Missing Access Token!'));
      }
      // proceed if token is found
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    },

    // Handle request errors
    error => {
      return Promise.reject(error);
    },
  );

  // Add response interceptor for handling 401/403 errors
  axiosSecure.interceptors.response.use(
    response => response,
    async error => {
      const status = error.response ? error.response.status : null;

      // If the token is invalid or expired, redirect to 403
      if (status === 401 || status === 403) {
        console.error('Unauthorized or Forbidden Access: ', status);

        // localStorage.removeItem('student-token');

        router.push({ path: '/403' });
      }

      return Promise.reject(error);
    },
  );

  return axiosSecure;
};
