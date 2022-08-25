import { BaseError } from './baseError';
export declare class NotFoundError extends BaseError {
    statusCode: number;
    constructor(message: string);
    serializeErrors(): {
        message: string;
    }[];
}
