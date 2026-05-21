import { Router } from 'express';
import { authLogin, authRegister } from '../controllers/authControllers.js';
import { googleAuthRedirect, googleAuthCallback } from '../controllers/googleAuthControllers.js';

const router = Router();

router.post('/register', authRegister);
router.post('/login', authLogin);
router.get('/google', googleAuthRedirect);
router.get('/google/callback', googleAuthCallback);

export default router;