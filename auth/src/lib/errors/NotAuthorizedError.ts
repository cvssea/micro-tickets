import { CustomError } from './CustomError';
import { ERROR } from '../../config/errors';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(public message = ERROR.NOT_AUTHORIZED) {
    super(message);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serialize() {
    return {
      errorData: [{ msg: this.message }],
    };
  }
}
