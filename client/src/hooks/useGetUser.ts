import type { IUser, IUserResponse } from '@/types/interfaces';
import { useAxiosPublic } from './useAxiosPublic';

export const useGetUser = () => {
  const axiosPublic = useAxiosPublic();

  const getUser = async (email:string) => {
    try {
      const { data } = await axiosPublic.get<IUserResponse<IUser>>(`/users/${email}`);
      return data.data;
    } catch (error) {
      console.error('Failed to get user:', error);
      throw error;
    }
  };

  return { getUser };
};
