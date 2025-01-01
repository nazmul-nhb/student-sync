import type { Document } from 'mongoose';
import type { Model, Types } from 'mongoose';
import type { USER_ROLES } from './user.constants';

/** User Roles */
export type TUserRole = (typeof USER_ROLES)[number];

/** Login credentials (email and password) */
export interface ICredentials {
	email: string;
	password: string;
}

/** User Data in Request Body */
export interface IUserData extends ICredentials {
	name: string;
	image: string;
}

/** User interface for Mongoose Schema */
export interface IUser extends IUserData, Document {
	_id: Types.ObjectId;
	role: TUserRole;
}

/** Interface for User model with static methods */
export interface IUserModel extends Model<IUser> {
	validateUser(email?: string): Promise<IUser>;
}

export interface ITokens {
	accessToken: string;
	refreshToken: string;
}
