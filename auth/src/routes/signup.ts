import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { log } from '../utils';
import { ERROR } from '../config';
import { User } from '../models/user';
import { RequestValidationError } from '../errors';

const router = express.Router();

// TODO make better - check api docs
const validators = [
  body('email').isEmail().withMessage(ERROR.INVALID_EMAIL),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage(ERROR.INVALID_PASSWORD),
];

router.post(
  '/api/users/signup',
  validators,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const user = User.build({ email, password });
    await user.save();

    res.status(201).json(user);
  }
);

export { router as signupRouter };
