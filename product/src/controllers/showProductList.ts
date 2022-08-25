import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/productModel';

export const showProductList = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.currentUser);
  const product = await Product.find({});

  res.status(200).send(product);
};
