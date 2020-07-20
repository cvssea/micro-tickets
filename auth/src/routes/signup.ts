import express, { Request, Response } from 'express';
import { signJwt, validate, signupValidation } from '@cvmicro/common';

import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  signupValidation,
  validate,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = User.build({ email, password });
    await user.save();

    req.session = await signJwt(user.id, user.email);
    res.status(201).json(user);
  }
);

export { router as signupRouter };
