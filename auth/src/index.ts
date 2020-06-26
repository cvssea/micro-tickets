import express from 'express';
import morgan from 'morgan';
import { json } from 'body-parser';
import { log } from './utils';

import { currentUserRouter } from './routes/currentUser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(morgan('dev'));
app.use(json());

// routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  log(`Server started on port ${port}`);
});
