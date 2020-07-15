import express from 'express';

import { requireAuth, currentUser } from '../middleware';

const router = express.Router();

router.get('/api/users/current', currentUser, requireAuth, (req, res) => {
  res.json({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
