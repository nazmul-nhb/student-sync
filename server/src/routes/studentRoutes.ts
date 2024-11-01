import express, { Router } from 'express';
import { createStudent } from '../controllers/studentControllers';

const router: Router = express.Router();

router.post('/register', createStudent);

export default router;
