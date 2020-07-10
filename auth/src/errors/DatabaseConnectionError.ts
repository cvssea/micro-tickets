import { CustomError } from './CustomError';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  msg = 'DB connection error';

  constructor(public originalError: Error) {
    super('DB connection error');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serialize() {
    return {
      errorData: [{ msg: this.msg }],
      originalError: this.originalError,
    };
  }
}
