import { BaseError } from './baseError';
import { ValidationError } from 'express-validator';

export class RequestValidationError extends BaseError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Request validation error');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({ message: error.msg, field: error.param }));
  }
}
