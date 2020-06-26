import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
  res.send('You have reached the signin route!')
});

export { router as signinRouter }