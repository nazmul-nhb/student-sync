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
  IUser,
} from '@/types/interfaces';
import { showConfirmDialogue } from '@/utilities/sweetAlert';

const axiosPublic = useAxiosPublic();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null as IUser | null,
    isUserLoading: false as boolean,
  }),

  actions: {
    async initializeUser() {
      this.isUserLoading = true;
      const token = localStorage.getItem('student-token');
      if (token) {
        this.currentUser = jwtDecode(token);
      } else {
        this.currentUser = null;
      }
      this.isUserLoading = false;
    },

    waitUntilUserLoaded() {
      let unwatch: (() => void) | null = null;
      return new Promise<void>(resolve => {
        unwatch = watchEffect(() => {
          if (!this.isUserLoading) {
            if (unwatch) unwatch();
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

        this.isUserLoading = false;

        let message: string = 'Something Went Wrong!',
          status: number = 500;

        if (error instanceof AxiosError) {
          message = error.response?.data?.message || 'Registration Error!';
          status = error.response?.status || 500;
        }
        return { success: false, message, status };
      }
    },

    getUserRole() {
      return this.currentUser ? this.currentUser.role : null;
    },

    async loginUser(
      user: ICredentials,
    ): Promise<ILoginResponse | IErrorResponse> {
      this.isUserLoading = true;
      try {
        const { data } = await axiosPublic.post<ILoginResponse>(
          '/auth/login',
          user,
        );

        if (data.success) {
          localStorage.setItem('student-token', data.accessToken);
          this.currentUser = jwtDecode(data.accessToken);
        }

        this.isUserLoading = false;

        return data;
      } catch (error) {
        console.error(error);

        this.isUserLoading = false;

        let message: string = 'Something Went Wrong!',
          status: number = 500;

        if (error instanceof AxiosError) {
          message = error.response?.data?.message || 'Login Error!';
          status = error.response?.status || 500;
        }
        return { success: false, message, status };
      }
    },

    async logOut(): Promise<boolean> {
      if (this.currentUser) {
        const proceed = await showConfirmDialogue(
          'Are You Sure?',
          'Want to Log Out Now?',
          'question',
          'Log Out!',
          'Cancel!',
        );

        if (proceed.isConfirmed) {
          localStorage.removeItem('student-token');
          this.currentUser = null; // Clear the current user
          toast.success('Logged Out!');
          return true; // Logout confirmed
        }
        return false; // Logout canceled
      } else {
        // In case there is no user logged in (dev purpose)
        toast.error('No User Logged In!');
        return false; // No user was logged in
      }
    },
  },
});
