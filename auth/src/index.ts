import mongoose from 'mongoose';
import { log, DatabaseConnectionError } from '@cvmicro/common';

import app from './app';

const serve = async () => {
  if (!process.env.JWT_KEY) {
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

serve();
