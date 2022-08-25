import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/baseError';

export const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);

  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(500).send({ errors: [{ message: 'Something went wrong' }] });
};
