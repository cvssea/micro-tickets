import express from 'express';
import { json } from 'body-parser';

const app = express();
const log = (...args: any[]): void => console.log(`AuthService: `, ...args);

app.use(json());

const port = 3000;
app.listen(port, () => {
  log(`Server started on port ${port}`);
});
