import { z } from 'zod';
import { isFirstLetterCapital } from '../../utilities/validationUtils';
import { authValidations } from '../auth/auth.validation';

/** Zod schema to validate name and image url. */
const nameImageSchema = z.object({
	name: z
		.string({ required_error: 'Name is required!' })
		.trim()
		.min(3)
		.max(255)
		.refine((value) => isFirstLetterCapital(value), {
			message: 'Name must start with a capital letter!',
		}),
	image: z
		.string({ required_error: 'Image url is required!' })
		.trim()
		.url({ message: 'Invalid URL format!' }),
});

const creationSchema = nameImageSchema.merge(authValidations.loginSchema);

export const userValidations = { creationSchema };
