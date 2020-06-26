import { Request, Response, NextFunction } from 'express';

import { log } from '../utils';
import { RequestValidationError, DatabaseConnectionError } from '../errors';

const parseRequestValidationErrors = (err: RequestValidationError) => {
  const { errorData } = err;
  return errorData.map((error) => ({
    msg: error.msg,
    field: error.param,
  }));
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const errors = parseRequestValidationErrors(err);
    return res.status(400).json({ errors });
  }

  if (err instanceof DatabaseConnectionError) {
    log('db conn err');
  }

  res.status(400).json({
    err,
  });
};
