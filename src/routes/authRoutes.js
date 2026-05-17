import { Router } from 'express';
import { authLogin, authRegister } from '../controllers/authControllers.js';

const router = Router();

router.post('/register', authRegister);
router.post('/login', authLogin);

export default router;