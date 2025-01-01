import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { userServices } from './user.services';

const getUser = catchAsync(async (req, res) => {
	const result = await userServices.getUserByEmail(req.params?.email);

	sendResponse(res, 'User', 'GET', result);
});

export const userControllers = { getUser };
