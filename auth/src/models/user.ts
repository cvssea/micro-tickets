import mongodb from 'mongodb';
import mongoose from 'mongoose';

import { emailValidator, log } from '../utils';
import { BadRequestError } from '../errors';
import { ERROR } from '../config';

// describe User schema
interface UserParams {
  email: string;
  password: string;
}

// describe User model
interface UserModel extends mongoose.Model<UserDoc> {
  build(params: UserParams): UserDoc;
}

// describe User document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, ERROR.EMAIL_REQUIRED],
    validate: {
      // sync validation
      // validator: (v: any) => emailValidator.test(v),

      // async validation
      validator: (v: any) => {
        return new Promise<boolean>((resolve) =>
          resolve(emailValidator.test(v))
        );
      },
      message: ERROR.INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (params: UserParams) => new User(params);
userSchema.post('save', function (
  err: mongodb.MongoError,
  doc: mongoose.Document,
  next: mongoose.HookNextFunction
) {
  if (err.name === 'MongoError' && err.code === 11000) {
    const msg = ERROR.EMAIL_EXISTS;
    const errorData = [{ msg, name: err.name }];
    next(new BadRequestError({ errorData }, msg));
  } else {
    next(err);
  }
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
