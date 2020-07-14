import express, { Request, Response } from 'express';

import { signinValidation, validate } from '../middleware/request-validator';

const router = express.Router();

router.post(
  '/api/users/signin',
  signinValidation,
  validate,
  (req: Request, res: Response) => {
    res.send('You have reached the signin route!');
  }
);

export { router as signinRouter };
