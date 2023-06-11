import express from 'express';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcryptjs';

import User from '../models/User';
import { createJWT } from '../utils/jwt';
import { BadRequest, UnAuthenticated } from '../errors';
import Logger from '../utils/logger';
import { ROLES } from '../utils/enum';
import BranchRepresentative from '../models/BranchRepresentative';
import Investor from '../models/Investor';
import HQRepresentative from '../models/HqRepresentative';

const register = async (req: express.Request, res: express.Response) => {
  const user = await User.create({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({ user: { userId: user._id, name: user.name } });
};

const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  Logger.debug(email);
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
  let userToken;
  if (user.role === ROLES.BRANCH_REP) {
    const branchRep = await BranchRepresentative.findOne({ userId: user._id });
    userToken = {
      name: user.name,
      userId: user._id,
      role: user.role,
      branchId: branchRep?.branchId,
    };
  } else if (user.role === ROLES.INVESTOR) {
    const investor = await Investor.findOne({ userId: user._id });
    userToken = {
      name: user.name,
      userId: user._id,
      role: user.role,
      investorId: investor?._id,
    };
  } else if (user.role === ROLES.HQ_ADMIN) {
    const hq_admin = await HQRepresentative.findOne({ user: user._id });
    userToken = {
      name: user.name,
      userId: user._id,
      role: user.role,
      hqAdminId: hq_admin?._id,
    };
  } else {
    userToken = {
      name: user.name,
      userId: user._id,
      role: user.role,
    };
  }

  const token = createJWT({ payload: userToken });
  res
    .status(StatusCodes.OK)
    .json({ token, user: { userId: user._id, name: user.name } });
};
export { register, login };
