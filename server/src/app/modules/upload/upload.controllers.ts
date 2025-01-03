import cloudinary from 'cloudinary';
import configs from '../../configs';
import type { Request, Response } from 'express';

// Configure Cloudinary with environment variables
cloudinary.v2.config({
	cloud_name: configs.cloudName,
	api_key: configs.cloudinaryApiKey,
	api_secret: configs.cloudinaryApiSecret,
});

const uploadImage = (_req: Request, res: Response) => {
	const timestamp = Math.round(Date.now() / 1000);
	const signature = cloudinary.v2.utils.api_sign_request(
		{ timestamp },
		configs.cloudinaryApiSecret,
	);

	res.status(201).json({ signature, timestamp });
};

export const uploadControllers = { uploadImage };
