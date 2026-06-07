import express from 'express';
import cors from 'cors';
import appointmentsRouter from './routes/appointmentRoutes.js';
import authRouter from './routes/authRoutes.js';
import botRouter from './routes/botRoutes.js';
import whatsappRouter from './routes/whatsappRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/appointments', appointmentsRouter);
app.use('/auth', authRouter);
app.use('/chat', botRouter);
app.use('/whatsapp', whatsappRouter);
app.use(errorHandler);

export default app;
