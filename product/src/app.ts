import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler, currentUser } from '@ecom-micro/common';
import cors from 'cors';
import morgan from 'morgan';
import { productRouter } from './routes/product.routes';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(cors());
app.use(morgan('dev'));

app.use(currentUser);
app.use('/api/product', productRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError(`Can't find ${req.originalUrl} on this server!`);
});

app.use(errorHandler);

export { app };
