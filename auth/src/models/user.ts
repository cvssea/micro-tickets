import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import { ERROR, emailValidator, BadRequestError } from '@cvmicro/common';

import { Password } from '../lib';

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

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.hash(this.get('password'));
    this.set('password', hashedPassword);
  }

  done();
});

userSchema.post('save', function (
  err: MongoError,
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

userSchema.set('toJSON', {
  transform: (doc: mongoose.Document, ret: any) => {
    ret.id = ret._id;

    delete ret._id;
    delete ret.password;
  },
  versionKey: false,
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
