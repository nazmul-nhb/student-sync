import { Router } from 'express';
import { studentControllers } from './student.controllers';
import authorizeUser from '../../middlewares/authorizeUser';
import { USER_ROLE } from '../user/user.constants';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = Router();

router.post(
	'/register',
	authorizeUser(USER_ROLE.ADMIN, USER_ROLE.USER),
	validateRequest(studentValidations.creationSchema),
	studentControllers.registerStudent,
);

router.get(
	'/:id',
	authorizeUser(USER_ROLE.ADMIN, USER_ROLE.USER),
	studentControllers.getStudentData,
);

router.get(
	'/',
	authorizeUser(USER_ROLE.ADMIN),
	studentControllers.getAllStudentData,
);

export const studentRoutes = router;
