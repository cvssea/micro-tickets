import { CustomError } from './CustomError';
import { ERROR } from '../../config';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('404 Not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize() {
    return {
      errorData: [{ msg: ERROR.NOT_FOUND }],
    };
  }
}
