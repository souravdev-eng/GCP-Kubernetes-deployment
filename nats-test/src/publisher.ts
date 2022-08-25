console.clear();

import nats from 'node-nats-streaming';
import { ProductCreatedPublished } from './events/publisher/product-created-published';

const stan = nats.connect('ecom', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new ProductCreatedPublished(stan);
  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20,
    });
  } catch (error) {
    console.error(error);
  }
});
