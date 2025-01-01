import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { authServices } from './auth.services';
import type { IUserData } from '../user/user.types';

/** Register a new user */
const registerUser = catchAsync(async (req, res) => {
	const userData = req.body as IUserData;

	const result = await authServices.registerUserInDB(userData);

	sendResponse(res, 'User', 'POST', result, 'Registered successfully!');
});

export const authControllers = { registerUser };
