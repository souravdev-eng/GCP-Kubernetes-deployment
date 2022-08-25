import { BaseError } from './baseError';
import { ValidationError } from 'express-validator';
export declare class RequestValidationError extends BaseError {
    errors: ValidationError[];
    statusCode: number;
    constructor(errors: ValidationError[]);
    serializeErrors(): {
        message: any;
        field: string;
    }[];
}
