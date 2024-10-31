// src/hooks/useCloudinarySigned.ts
import { cloudinaryApiKey, imageUploadUrl } from '@/utilities/constants';
import axios from 'axios';

interface SignatureData {
  signature: string;
  timestamp: number;
}

export const useCloudinarySigned = () => {
  const uploadImage = async (file: File): Promise<string> => {
    // Request a signed signature for the upload
    const { data: signatureData } = await axios.post<SignatureData>(
      '/api/upload-signature',
    );

    // Prepare form data for the Cloudinary upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', cloudinaryApiKey);
    formData.append('timestamp', signatureData.timestamp.toString());
    formData.append('signature', signatureData.signature);

    try {
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
