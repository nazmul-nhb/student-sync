import { Schema, model } from 'mongoose';
import { IUser } from '../types/model';

export const UserSchema = new Schema<IUser>({
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
	created: { type: Date, default: Date.now },
});

export const User = model<IUser>('User', UserSchema);
