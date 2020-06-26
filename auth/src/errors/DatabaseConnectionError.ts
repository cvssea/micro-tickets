export class DatabaseConnectionError extends Error {
  msg = 'Error connecting to DB!';

  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
