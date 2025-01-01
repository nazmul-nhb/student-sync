import type { IUser, IServerResponse } from '@/types/interfaces';
import { useAxiosSecure } from './useAxiosSecure';

export const useGetUser = () => {
  const axiosSecure = useAxiosSecure();

  const getUser = async (email: string) => {
    try {
      const { data } = await axiosSecure.get<IServerResponse<IUser>>(
        `/users/${email}`,
      );
      return data?.data;
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  };

  return { getUser };
};
