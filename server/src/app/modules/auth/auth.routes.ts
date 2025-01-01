import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../user/user.validation';
import { authControllers } from './auth.controllers';

const router = Router();

router.post(
	'/register',
	validateRequest(userValidations.creationSchema),
	authControllers.registerUser,
);

export const authRoutes = router;
