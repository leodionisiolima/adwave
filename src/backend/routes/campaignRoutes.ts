import { Router } from 'express';

const router = Router();

router.get('/campaigns', (req, res) => {
  res.json({ message: 'List of campaigns' });
});

router.post('/campaigns', (req, res) => {
  // Lógica para criar uma nova campanha
  res.json({ message: 'New campaign created' });
});

export default router;

