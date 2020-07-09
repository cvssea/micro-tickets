export interface SerializedError {
  errorData: {
    msg: string;
    name?: string;
    field?: string;
  }[];
}

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serialize(): SerializedError;
}
