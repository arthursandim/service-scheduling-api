import { Router } from 'express';
import { customerCreate } from '../controllers/customerControllers.js';
import { tokenVerification } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(tokenVerification);
router.post('/', customerCreate);

export default router;
