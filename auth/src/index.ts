import express from 'express';
import morgan from 'morgan';
import { json } from 'body-parser';
import { log } from './utils';

import {
  signinRouter,
  signoutRouter,
  signupRouter,
  currentUserRouter
} from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(morgan('dev'));
app.use(json());

// routes
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(currentUserRouter);

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  log(`Server started on port ${port}`);
});
