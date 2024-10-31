import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4242;

export const mongoURI = process.env.MONGO_CONNECTION_STRING as string;

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

export const cloudName = process.env.CLOUD_NAME as string;
export const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY as string;
export const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET as string;
