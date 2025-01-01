import { User } from '../user/user.model';
import type { IUserData } from '../user/user.types';

// const checkDuplicateUser = async (email: string) => {
// 	const user = await User.findOne({ email });

//     return user;
// };

/**
 * Create a new user in MongoDB `user` collection.
 * @param payload User data from `req.body`.
 * @returns User object from MongoDB.
 */
const registerUserInDB = async (payload: IUserData) => {
	const newUser = await User.create(payload);

	return newUser;
};

export const authServices = {
    // checkDuplicateUser,
    registerUserInDB
};
