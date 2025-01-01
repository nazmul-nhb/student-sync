import { Schema, model } from 'mongoose';
import type { IUser, IUserModel } from './user.types';
import { STATUS_CODES } from '../../constants';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';

export const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, 'User Must Provide Name!'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'User Must Provide Email!'],
			unique: true,
			trim: true,
			validate: {
				validator: (value: string) => {
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					return emailRegex.test(value);
				},
				message: 'Provide a valid email address!',
			},
		},
		image: {
			type: String,
			required: [true, 'User Must Provide Image!'],
		},
		password: {
			type: String,
			required: [true, 'User Must Provide Password!'],
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
	},
	{ timestamps: true },
);

/** Static method to check if user exists */
userSchema.statics.validateUser = async function (email?: string) {
	if (!email) {
		throw new ErrorWithStatus(
			'Authentication Error',
			'Please provide a valid email!',
			STATUS_CODES.BAD_REQUEST,
			'user',
		);
	}

	const user: IUser = await this.findOne({ email }).select('+password');

	if (!user) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`No user found with email: ${email}!`,
			STATUS_CODES.NOT_FOUND,
			'user',
		);
	}

	return user;
};

export const User = model<IUser, IUserModel>('User', userSchema);

