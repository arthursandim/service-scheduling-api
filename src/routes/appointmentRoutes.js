import { Router } from 'express';
import { appointmentsList, appointmentListById, appointmentCreate, appointmentUpdate, appointmentDelete } from '../controllers/appointmentsControllers.js';
import { validateBody } from '../middlewares/validateBody.js';
import { tokenVerification } from '../middlewares/authMiddleware.js';


const router = Router();

router.use(tokenVerification);
router.get('/', appointmentsList);        
router.get('/:id', appointmentListById);
router.post('/', validateBody, appointmentCreate);         
router.put('/:id', appointmentUpdate);
router.delete('/:id', appointmentDelete);  

export default router;