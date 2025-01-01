import { Router } from 'express';
import { userControllers } from './user.controllers';
import authorizeUser from '../../middlewares/authorizeUser';
import { USER_ROLE } from './user.constants';

const router = Router();

router.get(
	'/:email',
	authorizeUser(USER_ROLE.USER, USER_ROLE.ADMIN),
	userControllers.getUser,
);

export const userRoutes = router;
