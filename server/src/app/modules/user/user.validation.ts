import { z } from 'zod';
import { isFirstLetterCapital } from '../../utilities';

const creationSchema = z.object({
	name: z
		.string({ required_error: 'Name is required!' })
		.trim()
		.min(3)
		.max(255)
		.refine((value) => isFirstLetterCapital(value), {
			message: 'Name must start with a capital letter',
		}),
	email: z.string({ required_error: 'Email is required!' }).trim().email(),
	image: z.string({ required_error: 'Image is required!' }).trim(),
	password: z.string({ required_error: 'Password is required!' }).trim(),
});

export const userSchema = { creationSchema };
