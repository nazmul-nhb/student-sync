import cloudinary from 'cloudinary';
import {
	cloudinaryApiKey,
	cloudinaryApiSecret,
	cloudName,
} from '../utils/constants';
import { Request, Response } from 'express';

// Configure Cloudinary with environment variables
cloudinary.v2.config({
	cloud_name: cloudName,
	api_key: cloudinaryApiKey,
	api_secret: cloudinaryApiSecret,
});

export const uploadImage = (_req: Request, res: Response) => {
	const timestamp = Math.round(Date.now() / 1000);
	const signature = cloudinary.v2.utils.api_sign_request(
		{ timestamp },
		cloudinaryApiSecret,
	);

	res.json({ signature, timestamp });
};
