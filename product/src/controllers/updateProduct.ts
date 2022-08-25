import { NotFoundError } from '@ecom-micro/common';
import { Request, Response, NextFunction } from 'express';
import { ProductUpdatedPublisher } from '../events/publisher/productUpdatedPublisher';
import { Product } from '../models/productModel';
import { natsWrapper } from '../natsWrapper';

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { price, name } = req.body;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { price, name },
    {
      runValidators: true,
      new: true,
    }
  );

  if (!product) {
    return next(new NotFoundError('Product not found'));
  }

  res.status(200).send(product);

  new ProductUpdatedPublisher(natsWrapper.client).publish({
    id: product.id,
    price: product.price,
    name: product.name,
    userId: product.userId,
  });
};
