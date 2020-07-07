import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { log } from '../utils';
import { User } from '../models/user';
import { ERROR_MESSAGES } from '../config';
import { RequestValidationError } from '../errors';

const router = express.Router();

// TODO make better - check api docs
const validators = [
  body('email').isEmail().withMessage(ERROR_MESSAGES.EMAIL),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage(ERROR_MESSAGES.PASSWORD),
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
