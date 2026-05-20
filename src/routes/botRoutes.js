import { Router } from 'express';
import { sendMessage } from '../controllers/botControllers.js';

const router = Router();

router.post('/', sendMessage);

export default router;

