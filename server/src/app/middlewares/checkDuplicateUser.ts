import { ErrorWithStatus } from '../classes/ErrorWithStatus';
import { STATUS_CODES } from '../constants';
import { User } from '../modules/user/user.model';
import catchAsync from '../utilities/catchAsync';

/** Check for duplicate user */
export const checkDuplicateUser = catchAsync(async (req, _res, next) => {
	const email = req.body.email as string;

	const user = await User.findOne({ email });

	if (user) {
		throw new ErrorWithStatus(
			'User Exists',
			`User with ${email} already exists!`,
			STATUS_CODES.CONFLICT,
			'user',
		);
	}

	next();
});
