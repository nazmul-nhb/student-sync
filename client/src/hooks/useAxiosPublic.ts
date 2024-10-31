import { baseUrl } from '@/utilities/constants';
import axios, { type AxiosInstance } from 'axios';

const axiosPublic: AxiosInstance = axios.create({ baseURL: baseUrl });

export const useAxiosPublic = (): AxiosInstance => axiosPublic;
