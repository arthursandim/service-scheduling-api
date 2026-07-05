import { Router } from 'express';
import bcrypt from 'bcrypt';
import Professional from '../models/Professional.js';

const router = Router();

router.post('/professional', async (req, res) => {
  if (process.env.NODE_ENV !== 'test') {
    return res.status(404).json({ message: 'Not found' });
  }

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

export default router;
