import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { authServices } from './auth.services';
import type { ICredentials, IUserData } from '../user/user.types';
import configs from '../../configs';

/** Register a new user */
const registerUser = catchAsync(async (req, res) => {
	const userData = req.body as IUserData;

	await authServices.registerUserInDB(userData);

	sendResponse(res, 'User', 'POST', 'Registered successfully!');
});

/** Login a user */
const loginUser = catchAsync(async (req, res) => {
	const credentials = req.body as ICredentials;

	const tokens = await authServices.loginUser(credentials);

	const { refreshToken, accessToken } = tokens;

	res.cookie('refreshToken', refreshToken, {
		secure: configs.NODE_ENV === 'production',
		httpOnly: true,
	});

	sendResponse(res, 'User', 'OK', { accessToken }, 'Login successful!');
});

export const authControllers = { registerUser, loginUser };
