import express from 'express';

const router = express.Router();

router.get('/api/users/current', (req, res) => {
  res.send('You have reached the currentuser route!');
});

export { router as currentUserRouter };
