import express from 'express';
import cors from 'cors';
import appointmentsRouter from './routes/appointmentRoutes.js';
import authRouter from './routes/authRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/appointments', appointmentsRouter);
app.use('/auth', authRouter);
app.use(errorHandler);

export default app;
