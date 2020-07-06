import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errorData: ValidationError[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serialize() {
    const data = this.errorData.map(({ msg, param }) => ({
      msg,
      field: param,
    }));

    return {
      errorData: data,
    };
  }
}
