import { Router } from 'express';
import { authLogin, authRegister, authVerify, authResendVerification } from '../controllers/authControllers.js';
import { googleAuthRedirect, googleAuthCallback } from '../controllers/googleAuthControllers.js';

const router = Router();

router.post('/register', authRegister);
router.post('/login', authLogin);
router.get('/google', googleAuthRedirect);
router.get('/google/callback', googleAuthCallback);
router.get('/verify/:token', authVerify);
router.post('/resend-verification', authResendVerification);


export default router;