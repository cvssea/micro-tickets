import mongoose from 'mongoose';
import { DatabaseConnectionError } from '@cvmicro/common';

import app from './app';
import { log } from './utils';

const serve = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT secret not found');
  }

  try {
    await mongoose.connect('mongodb://tickets-mongo-srv:27017', {
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

serve();
