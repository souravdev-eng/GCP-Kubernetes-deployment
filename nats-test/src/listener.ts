import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { ProductCreatedListener } from './events/listener/ticket-created';

console.clear();

const stan = nats.connect('ecom', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed');
    process.exit();
  });
  new ProductCreatedListener(stan).listen();
});
