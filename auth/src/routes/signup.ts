import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';

// import { log } from '../utils';
import { User } from '../models/user';
import { signupValidation, validate } from '../middleware/request-validator';

const router = express.Router();

router.post(
  '/api/users/signup',
  signupValidation,
  validate,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = User.build({ email, password });
    await user.save();

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!
    );

    req.session = { jwt: token };
    res.status(201).json(user);
  }
);

export { router as signupRouter };
