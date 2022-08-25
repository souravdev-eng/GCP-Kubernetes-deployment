import 'express-async-errors';
import express from 'express';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@ecom-micro/common';
import { authRoute } from './routes/routes';

const app = express();
app.use(express.json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use('/api/users', authRoute);

app.all('*', async (req, res) => {
  throw new NotFoundError(`${req.originalUrl} not found to the server`);
});

app.use(errorHandler);

export { app };
