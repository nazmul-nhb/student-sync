import { Router } from 'express';
import { userControllers } from './user.controllers';

const router = Router();

router.get('/:email', userControllers.getUser);

export const userRoutes = router;
