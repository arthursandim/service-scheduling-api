import { Router } from 'express';
import { appointmentList, appointmentListById, appointmentCreate, appointmentUpdate, appointmentDelete } from '../controllers/appointmentsControllers.js';

const router = Router();

router.get('/', appointmentList);        
router.get('/:id', appointmentListById);
router.post('/', appointmentCreate);         
router.put('/:id', appointmentUpdate);   
router.delete('/:id', appointmentDelete);  

export default router;