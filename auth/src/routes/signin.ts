import express, { Request, Response } from 'express';
import {
  ERROR,
  signJwt,
  validate,
  BadRequestError,
  signinValidation,
} from '@cvmicro/common';

import { User } from '../models/user';
import { Password } from '../lib/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  signinValidation,
  validate,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      const errorData = BadRequestError.create(ERROR.INVALID_CREDENTIALS);
      throw new BadRequestError(errorData);
    }

    const isMatch = await Password.compare(foundUser.password, password);
    if (!isMatch) {
      const errorData = BadRequestError.create(ERROR.INVALID_CREDENTIALS);
      throw new BadRequestError(errorData);
    }

    req.session = await signJwt(foundUser.id, foundUser.email);
    res.json(foundUser);
  }
);

export { router as signinRouter };
