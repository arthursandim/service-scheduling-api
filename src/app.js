import express from 'express';
import cors from 'cors';
import appointmentsRouter from './routes/appointmentRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/appointments', appointmentsRouter);

export default app;
