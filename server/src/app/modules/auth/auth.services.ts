import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import configs from '../../configs';
import { STATUS_CODES } from '../../constants';
import type { DecodedToken } from '../../types/interfaces';
import { comparePassword, generateToken } from '../../utilities/authUtilities';
import { User } from '../user/user.model';
import type { ICredentials, ITokens, IUserData } from '../user/user.types';

/**
 * Create a new user in MongoDB `user` collection.
 * @param payload User data from `req.body`.
 * @returns User object from MongoDB.
 */
const registerUserInDB = async (payload: IUserData) => {
	const newUser = await User.create(payload);

	return newUser;
};

/**
 * Login user.
 * @param payload Login credentials (`email` and `password`).
 * @returns Token as object.
 */
const loginUser = async (payload: ICredentials): Promise<ITokens> => {
	// * Validate and extract user from DB.
	const user = await User.validateUser(payload.email);

	// * Check if password matches with the saved password in DB.
	const passwordMatched = await comparePassword(
		payload?.password,
		user?.password,
	);

	if (!passwordMatched) {
		throw new ErrorWithStatus(
			'Authorization Error',
			`Invalid credentials!`,
			STATUS_CODES.UNAUTHORIZED,
			'auth',
		);
	}

	// * Create tokens and send to the client.
	const jwtPayload: DecodedToken = {
		email: user.email,
		role: user.role,
	};

	const accessToken = generateToken(
		jwtPayload,
		configs.accessSecret,
		configs.accessExpireTime,
	);

	const refreshToken = generateToken(
		jwtPayload,
		configs.refreshSecret,
		configs.refreshExpireTime,
	);

	return { accessToken, refreshToken };
};

export const authServices = { registerUserInDB, loginUser };
