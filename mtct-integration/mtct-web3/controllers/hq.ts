import express from 'express';
import { StatusCodes } from 'http-status-codes';
import Investor from '../models/Investor';
import Branch from '../models/Branch';
import { BadRequest } from '../errors';
import { getTodayAndTomorrowDate } from '../utils/mongo';
import Sale from '../models/Sale';
import KYC from '../models/Kyc';

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
  res.status(StatusCodes.OK).json({
    msg: `All onboarded investors in branch: ${branchName}`,
    onboardings,
  });
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
  res.status(StatusCodes.OK).json({
    msg: `All onboarded investors in branch: ${branchName} today`,
    onboardings,
  });
};

const getAllSale = async (req: express.Request, res: express.Response) => {
  const sales = await Sale.find();
  res.status(StatusCodes.OK).json({ msg: 'All sales', sales });
};

const getAllSaleByBranch = async (
  req: express.Request,
  res: express.Response
) => {
  const { branchName } = req.params;
  const branch = await Branch.findOne({ name: branchName });
  if (!branch) {
    throw new BadRequest(`${branchName} doesn't exist`);
  }
  const sales = await Sale.find({ branchId: branch._id });
  res.status(StatusCodes.OK).json({
    msg: `All sales in branch: ${branchName}`,
    sales,
  });
};

const getAllSaleByBranchToday = async (
  req: express.Request,
  res: express.Response
) => {
  const { branchName } = req.params;
  const branch = await Branch.findOne({ name: branchName });
  if (!branch) {
    throw new BadRequest(`${branchName} doesn't exist`);
  }
  const { today, tomorrow } = getTodayAndTomorrowDate();
  const sales = await Sale.find({
    branchId: branch._id,
    saleDate: { $gte: today, $lt: tomorrow },
  });
  res.status(StatusCodes.OK).json({
    msg: `All sales in branch: ${branchName} today`,
    sales,
  });
};

const getAllKyc = async (req: express.Request, res: express.Response) => {
  const kycs = await KYC.find();
  res.status(StatusCodes.OK).json({ msg: 'All kycs', kycs });
};

const getAllKycByBranch = async (
  req: express.Request,
  res: express.Response
) => {
  const { branchName } = req.params;
  const branch = await Branch.findOne({ name: branchName });
  if (!branch) {
    throw new BadRequest(`${branchName} doesn't exist`);
  }
  const kycs = await KYC.find({ branchId: branch._id });
  res.status(StatusCodes.OK).json({
    msg: `All kycs in branch: ${branchName}`,
    kycs,
  });
};

const getAllKycByBranchToday = async (
  req: express.Request,
  res: express.Response
) => {
  const { branchName } = req.params;
  const branch = await Branch.findOne({ name: branchName });
  if (!branch) {
    throw new BadRequest(`${branchName} doesn't exist`);
  }
  const { today, tomorrow } = getTodayAndTomorrowDate();
  const kycs = await KYC.find({
    branchId: branch._id,
    createdDate: { $gte: today, $lt: tomorrow },
  });
  res.status(StatusCodes.OK).json({
    msg: `All kycs in branch: ${branchName} today`,
    kycs,
  });
};
export {
  getAllOnboarding,
  getAllOnboardingByBranch,
  getAllOnboardingByBranchToday,
  getAllSale,
  getAllSaleByBranch,
  getAllSaleByBranchToday,
  getAllKyc,
  getAllKycByBranch,
  getAllKycByBranchToday,
};
