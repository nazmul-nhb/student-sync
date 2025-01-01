import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { authServices } from './auth.services';
import type { IUserData } from '../user/user.types';

/** Check for duplicate user */
// const checkDuplicateUser = catchAsync(async (req, res) => {
// 	const email = req.body.email as string;

// 	const result = await authServices.checkDuplicateUser(email);

// 	if (result) {
// 		res.status(200).send({
// 			success: true,
// 			message: `User with ${email} already exists!`,
// 		});
// 	} else {
// 		res.status(200).send({
// 			success: false,
// 			message: `You can proceed!`,
// 		});
// 	}
// });

/** Register a new user */
const registerUser = catchAsync(async (req, res) => {
	const userData = req.body as IUserData;

	const result = await authServices.registerUserInDB(userData);

	sendResponse(res, 'User', 'POST', result, 'Registered successfully!');
});

export const authControllers = {
    // checkDuplicateUser,
    registerUser
};
