import express from 'express';
import { StatusCodes } from 'http-status-codes';
import Investor from '../models/Investor';
import Branch from '../models/Branch';
import { BadRequest } from '../errors';
import { getTodayAndTomorrowDate } from '../utils/mongo';

const getAllOnboarding = async (
  req: express.Request,
  res: express.Response
) => {
  const onboardings = await Investor.find();
  res
    .status(StatusCodes.OK)
    .json({ msg: 'All onboarded investors', onboardings });
};

const getAllOnboardingByBranch = async (
  req: express.Request,
  res: express.Response
) => {
  const { branchName } = req.params;
  const branch = await Branch.findOne({ name: branchName });
  if (!branch) {
    throw new BadRequest(`${branchName} doesn't exist`);
  }
  const onboardings = await Investor.find({ branchId: branch._id });
  res
    .status(StatusCodes.OK)
    .json({ msg: 'All onboarded investors', onboardings });
};

const getAllOnboardingByBranchToday = async (
  req: express.Request,
  res: express.Response
) => {
  const { branchName } = req.params;
  const branch = await Branch.findOne({ name: branchName });
  if (!branch) {
    throw new BadRequest(`${branchName} doesn't exist`);
  }
  const { today, tomorrow } = getTodayAndTomorrowDate();
  const onboardings = await Investor.find({
    branchId: branch._id,
    createdDate: { $gte: today, $lt: tomorrow },
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: 'All onboarded investors', onboardings });
};

const allSale = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.OK).json({ msg: 'created' });
};

const allSaleByBranch = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.OK).json({ msg: 'created' });
};

export {
  getAllOnboarding,
  getAllOnboardingByBranch,
  getAllOnboardingByBranchToday,
};
