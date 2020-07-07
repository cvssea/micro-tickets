import mongoose from 'mongoose';
import { BadRequestError } from '../errors';

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
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (params: UserParams) => new User(params);
// userSchema.path('email').validate(async (email: string) => {
//   const emailCount = await mongoose.models.User.countDocuments({ email });
//   return !emailCount;
// }, 'sdafsdfd');

userSchema.post(
  'save',
  (
    err: mongoose.Error,
    doc: mongoose.Document,
    next: mongoose.HookNextFunction
  ) => {
    if (err.name === 'MongoError' && err.code === 11000) {
      next(new BadRequestError('Email already in use'));
    } else {
      next(err);
    }
  }
);

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
