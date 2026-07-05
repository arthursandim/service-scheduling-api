import { Router } from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Professional from '../models/Professional.js';

const router = Router();

const guard = (_req, res, next) => {
  if (process.env.NODE_ENV !== 'test') return res.status(404).json({ message: 'Not found' });
  next();
};

router.post('/professional', guard, async (req, res) => {
  try {
    const { name = 'Seed User', email = 'seed@test.com', password = 'senha123' } = req.body;

    const existing = await Professional.findOne({ email });

    if (!existing) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Professional.create({ name, email, password: hashedPassword, verified: true });
    }

    res.status(200).json({ email, password });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/reset', guard, async (_req, res) => {
  try {
    await mongoose.connection.collection('appointments').deleteMany({});
    await mongoose.connection.collection('customers').deleteMany({});
    await mongoose.connection.collection('professionals').deleteMany({});
    res.status(200).json({ message: 'Banco de testes limpo' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
