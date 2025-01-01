import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../user/user.validation';
import { authControllers } from './auth.controllers';
import { authValidations } from './auth.validation';

const router = Router();

router.post(
	'/check',
	validateRequest(authValidations.emailSchema),
	authControllers.checkDuplicateUser,
);

router.post(
	'/register',
	validateRequest(userValidations.creationSchema),
	authControllers.registerUser,
);

export const authRoutes = router;
