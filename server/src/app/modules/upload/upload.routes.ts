import { Router } from 'express';
import { checkDuplicateUser } from '../../middlewares/checkDuplicateUser';
import { uploadControllers } from './upload.controllers';

const router = Router();

router.post('/image', checkDuplicateUser, uploadControllers.uploadImage);

export const uploadRoutes = router;
