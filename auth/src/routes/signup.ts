import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { log } from '../utils';
import { ERROR_MESSAGES } from '../config';
import { RequestValidationError, DatabaseConnectionError } from '../errors';

const router = express.Router();

const validators = [
  body('email').isEmail().withMessage(ERROR_MESSAGES.EMAIL),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage(ERROR_MESSAGES.PASSWORD),
];

router.post('/api/users/signup', validators, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  throw new DatabaseConnectionError();

  const { email, password } = req.body;
  log('Creating user!');

  res.status(201).json({});
});

export { router as signupRouter };
