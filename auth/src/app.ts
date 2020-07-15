import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import {
  signinRouter,
  signoutRouter,
  signupRouter,
  currentUserRouter,
} from './routes';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './lib/errors';

const app = express();
app.set('trust proxy', true); // behind ingress

app.use(morgan('dev'));
app.use(json());
app.use(
  cookieSession({
    signed: false, // encryption
    secure: process.env.NODE_ENV !== 'test', // false in test, https only
  })
);

// routes
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(currentUserRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
