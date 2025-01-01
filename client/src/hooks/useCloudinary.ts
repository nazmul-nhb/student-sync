import type { ISignatureData } from '@/types/interfaces';
import { cloudinaryApiKey, imageUploadUrl } from '@/utilities/constants';
import axios from 'axios';
import { useAxiosPublic } from './useAxiosPublic';

export const useCloudinary = () => {
  const axiosPublic = useAxiosPublic();

  const uploadImage = async (file: File, email:string): Promise<string> => {
    try {
      // Request a signed signature for the upload
      const { data: signatureData } =
        await axiosPublic.post<ISignatureData>('/uploads/image', {email});

      // Prepare form data for the Cloudinary upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', cloudinaryApiKey);
      formData.append('timestamp', signatureData.timestamp.toString());
      formData.append('signature', signatureData.signature);

      const response = await axios.post<{ secure_url: string }>(
        imageUploadUrl,
        formData,
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  };

  return { uploadImage };
};
