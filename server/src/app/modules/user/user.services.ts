import { ErrorWithStatus } from '../../classes/ErrorWithStatus';
import { STATUS_CODES } from '../../constants';
import { User } from './user.model';

const getUserByEmail = async (email?: string) => {
	const user = User.findOne({ email });

	if (!user) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`User not found with email ${email}`,
			STATUS_CODES.NOT_FOUND,
			'user',
		);
	}

	return user;
};

export const userServices = { getUserByEmail };
