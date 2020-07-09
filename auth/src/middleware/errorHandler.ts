import { Request, Response, NextFunction } from 'express';

import { log } from '../utils';
import { CustomError } from '../errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    log(err.message);
    return res.status(err.statusCode).json(err.serialize()).end();
  }

  res.status(400).json(err);
};
