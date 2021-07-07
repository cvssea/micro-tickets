import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@cvmicro/common';

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

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
