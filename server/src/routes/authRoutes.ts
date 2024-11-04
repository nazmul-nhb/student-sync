import express, { Router } from 'express';
import { checkDuplicateUser, createUser, loginUser } from '../controllers/authControllers';

const router: Router = express.Router();

router.post('/check', checkDuplicateUser);
router.post('/register', createUser);
router.post('/login', loginUser);

export default router;
