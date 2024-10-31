import express, { Router } from 'express';
import { uploadImage } from '../controllers/uploadControllers';

const router: Router = express.Router();

router.post('/image', uploadImage);

export default router;
