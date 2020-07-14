import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import { ERROR } from '../config/errors';
import { RequestValidationError } from '../lib/errors';

// middleware
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};

// specific route validators
// TODO make better - check api doc express-validator
export const signupValidation = [
  body('email').isEmail().withMessage(ERROR.INVALID_EMAIL),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage(ERROR.INVALID_PASSWORD),
];

export const signinValidation = [
  body('email').isEmail().withMessage(ERROR.INVALID_EMAIL),
  body('password').trim().notEmpty().withMessage(ERROR.PASSWORD_REQUIRED),
];
