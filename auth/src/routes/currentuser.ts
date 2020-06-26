import express from 'express';

const router = express.Router();

router.get('/api/users/current', (req, res) => {
  res.send('using routers')
});

export { router as currentUserRouter }