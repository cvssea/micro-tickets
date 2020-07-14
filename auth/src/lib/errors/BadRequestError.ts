import { CustomError, SerializedError } from './CustomError';
import { ERROR } from '../../config';

export class BadRequestError extends CustomError {
  statusCode = 400;

  static create(msg: string, name?: string): SerializedError {
    const errorData = {
      errorData: [{ msg, name }],
    };

    return errorData;
  }

  constructor(
    public errorData: SerializedError,
    public message: string = ERROR.BAD_REQUEST
  ) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serialize() {
    return this.errorData;
  }
}
