import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import {
  signinRouter,
  signoutRouter,
  signupRouter,
  currentUserRouter,
} from './routes';
import { log } from './utils';
import { errorHandler } from './middleware/errorHandler';
import { NotFoundError, DatabaseConnectionError } from './lib/errors';

const app = express();
app.set('trust proxy', true); // behind ingress

app.use(morgan('dev'));
app.use(json());
app.use(
  cookieSession({
    signed: false, // encryption
    secure: true, // https only
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

const runApp = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret not found');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    log('DB Connected');

    const port = 3000;
    app.listen(port, () => {
      log(`Server started on port ${port}`);
    });
  } catch (e) {
    throw new DatabaseConnectionError(e);
  }
};

runApp();
