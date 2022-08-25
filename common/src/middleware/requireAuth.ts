import { BadRequestError } from './../errors/badRequest';
import { Request, Response, NextFunction } from 'express';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    return next(new BadRequestError('You are not logged in! Please log in to access this page.'));
  }
  next();
};
