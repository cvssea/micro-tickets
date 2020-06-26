import express from 'express';
import morgan from 'morgan';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/currentuser';

const app = express();
const log = (...args: any[]): void => console.log(`AuthService: `, ...args);

app.use(morgan('dev'));
app.use(json());

// routes
app.use(currentUserRouter);

const port = 3000;
app.listen(port, () => {
  log(`Server started on port ${port}`);
});
