import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  res.send('You have reached the signout route!')
});

export { router as signoutRouter }