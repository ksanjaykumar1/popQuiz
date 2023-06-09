import express from 'express';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcryptjs';

import User from '../models/user';
import { createJWT } from '../utils/jwt';
import { BadRequest, UnAuthenticated } from '../errors';
import Logger from '../utils/logger';
const register = async (req: express.Request, res: express.Response) => {
  const user = await User.create({ ...req.body });
  const userToken = { name: user.name, userId: user._id, role: user.role };
  const token = createJWT({ payload: userToken });
  res
    .status(StatusCodes.CREATED)
    .json({ token, user: { userId: user._id, name: user.name } });
};

const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest('Provide both email and password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest("User doesn't exit");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    Logger.error('Password match ==>', isMatch);
    throw new UnAuthenticated('Invalid Password');
  }
  const userToken = { name: user.name, userId: user._id, role: user.role };
  const token = createJWT({ payload: userToken });
  res
    .status(StatusCodes.CREATED)
    .json({ token, user: { userId: user._id, name: user.name } });
};
export { register, login };
