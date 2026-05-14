import { Router } from 'express';
import { appointmentsList, appointmentListById, appointmentCreate, appointmentUpdate, appointmentDelete } from '../controllers/appointmentsControllers.js';
import { validateBody } from '../middlewares/validateBody.js'


const router = Router();

router.get('/', appointmentsList);        
router.get('/:id', appointmentListById);
router.post('/', validateBody, appointmentCreate);         
router.put('/:id', validateBody, appointmentUpdate);   
router.delete('/:id', appointmentDelete);  

export default router;