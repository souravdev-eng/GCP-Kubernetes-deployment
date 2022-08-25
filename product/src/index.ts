import mongoose from 'mongoose';

import { app } from './app';
import { natsWrapper } from './natsWrapper';

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be defined');
    }
    if (!process.env.USER_PASSWORD) {
      throw new Error('password must be defined');
    }
    if (!process.env.USER_NAME) {
      throw new Error('username must be defined');
    }

    await natsWrapper.connect('ecom', 'product', 'http://nats-srv:4222');
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI!, {
      user: process.env.USER_NAME!,
      pass: process.env.USER_PASSWORD!,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
    process.exit();
  }

  app.listen(4000, () => console.log('Server started at port 4000...'));
};

start();
