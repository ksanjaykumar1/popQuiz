import express from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import { BadRequest } from '../errors';
import Investor from '../models/Investor';
import Logger from '../utils/logger';

const onboarding = async (req: any, res: express.Response) => {
  const { email } = req.body;

  //  find if investor has signed up or not
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest(`Investor hasn't signed up`);
  }
  const investor = await Investor.create({
    ...req.body,
    branchId: req.user.branchId,
    userId: user._id,
  });

  res.status(StatusCodes.CREATED).json({ msg: 'Investor oboarded ', investor });
};

const verifyKYC = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const getAllOnboarding = async (
  req: express.Request,
  res: express.Response
) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const getAllOnboardingByBranch = async (
  req: express.Request,
  res: express.Response
) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const getOnboardingById = async (
  req: express.Request,
  res: express.Response
) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

export { onboarding };
