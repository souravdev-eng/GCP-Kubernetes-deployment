import { NextFunction, Request, Response } from 'express';
import { ProductCreateEvent } from '../events/publisher/productCreatedPublisher';
import { Product } from '../models/productModel';
import { natsWrapper } from '../natsWrapper';

export const newProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { name, price } = req.body;

  const product = Product.build({ name, price, userId: req.currentUser!.id });

  await product.save();

  new ProductCreateEvent(natsWrapper.client).publish({
    id: product.id,
    name: product.name,
    price: product.price,
    userId: product.userId,
  });

  res.status(201).send(product);
};
