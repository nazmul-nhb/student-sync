import { Schema, model } from 'mongoose';
import type { IUser, IUserModel } from './user.types';
import { STATUS_CODES } from '../../constants';
import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { USER_ROLES } from './user.constants';
import { hashPassword } from '../../utilities/authUtilities';

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
		},
		image: {
			type: String,
			required: [true, 'User Must Provide Image!'],
		},
		password: {
			type: String,
			trim: true,
			required: [true, 'User Must Provide Password!'],
			select: false,
		},
		role: {
			type: String,
			enum: USER_ROLES,
			default: 'user',
		},
	},
	{ timestamps: true },
);

userSchema.pre('save', async function (next) {
	this.password = await hashPassword(this.password);

	next();
});

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
