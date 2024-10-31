// src/stores/useAuthStore.js
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import { watchEffect } from 'vue';
import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'vue3-toastify';
import { useAxiosPublic } from '@/hooks/useAxiosPublic';
import type {
  ICredentials,
  ILoginResponse,
  IStatusResponse,
  IErrorResponse,
  IUserRegister,
} from '@/types/interfaces';

const axiosPublic = useAxiosPublic();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null,
    userLoading: false,
  }),

  actions: {
    async initializeUser() {
      const token = localStorage.getItem('student-token');
      if (token) {
        this.currentUser = jwtDecode(token);
      }
      this.userLoading = false;
    },

    waitUntilUserLoaded() {
      return new Promise<void>(resolve => {
        const unwatch = watchEffect(() => {
          if (!this.userLoading) {
            unwatch();
            resolve();
          }
        });
      });
    },

    async registerUser(
      user: IUserRegister,
    ): Promise<IStatusResponse | IErrorResponse> {
      try {
        const { data } = await axiosPublic.post<IStatusResponse>(
          '/auth/register',
          user,
        );

        return data;
      } catch (error) {
        console.error(error);

        this.userLoading = false;

        let message: string = 'Something Went Wrong!',
          status: number = 500;

        if (error instanceof AxiosError) {
          message = error.response?.data?.message || 'Registration Error!';
          status = error.response?.status || 500;
        }
        return { success: false, message, status };
      }
    },

    async loginUser(
      user: ICredentials,
    ): Promise<ILoginResponse | IErrorResponse> {
      this.userLoading = true;
      try {
        const { data } = await axiosPublic.post<ILoginResponse>(
          '/auth/login',
          user,
        );

        if (data.success) {
          localStorage.setItem('student-token', data.accessToken);
          this.currentUser = jwtDecode(data.accessToken);
        }

        this.userLoading = false;

        return data;
      } catch (error) {
        console.error(error);

        this.userLoading = false;

        let message: string = 'Something Went Wrong!',
          status: number = 500;

        if (error instanceof AxiosError) {
          message = error.response?.data?.message || 'Login Error!';
          status = error.response?.status || 500;
        }
        return { success: false, message, status };
      }
    },

    logOut() {
      if (this.currentUser) {
        Swal.fire({
          title: 'Are You Sure?',
          text: 'Want to Log Out Now?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#ff0000',
          cancelButtonColor: '#2a7947',
          confirmButtonText: 'Log Out!',
        }).then(result => {
          if (result.isConfirmed) {
            localStorage.removeItem('student-token');
            this.currentUser = null;
            toast.success('Logged Out!');
          }
        });
      } else {
        // In case there is no user logged in (dev purpose)
        toast.error('No User Logged In!');
      }
    },
  },
});
