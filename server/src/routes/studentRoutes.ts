import express, { Router } from 'express';
import {
	createStudent,
	getStudentData,
} from '../controllers/studentControllers';

const router: Router = express.Router();

router.post('/register', createStudent);
router.get('/:registrationID', getStudentData);

export default router;
