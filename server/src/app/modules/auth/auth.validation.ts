import { z } from 'zod';

/** Zod schema to validate email. */
const emailSchema = z.object({
	email: z.string({ required_error: 'Email is required!' }).trim().email(),
});

/** Zod schema to validate login credentials. */
const loginSchema = emailSchema.merge(
	z.object({
		password: z
			.string({ required_error: 'Password is required!' })
			.trim()
			.min(6, { message: 'Password must be at least 6 characters long!' })
			.max(20, {
				message: 'Password cannot be more than 20 characters!',
			}),
	}),
);

export const authValidations = { emailSchema, loginSchema };
