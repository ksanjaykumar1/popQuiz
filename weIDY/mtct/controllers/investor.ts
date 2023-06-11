import express, { response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import { BadRequest } from '../errors';
import Investor from '../models/Investor';
import Logger from '../utils/logger';
import KYC from '../models/Kyc';
import { INVESTOR_STATUS } from '../utils/enum';
import InvestorPortfolio from '../models/Portfolio';

// Branch Rep will onboard investor once investor has signed up
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
  const portfolio = await InvestorPortfolio.create({
    userId: user._id,
    investorId: investor._id,
  });

  res.status(StatusCodes.CREATED).json({ msg: 'Investor oboarded ', investor });
};

// To get investor's Submitted details for review
const getKYCbyInvestorEmail = async (req: any, res: express.Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest(`Investor hasn't signed up`);
  }
  const kyc = await KYC.find({ userId: user._id });
  res.status(StatusCodes.OK).json({ kyc });
};

// verify investor kyc and approve the account
const verifyKYCandApproveInvestor = async (req: any, res: express.Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const investor = await Investor.findOne({ email });
  if (!user || !investor) {
    throw new BadRequest(`Investor hasn't signed up`);
  }
  const kyc = await KYC.findOne({ userId: user._id });
  if (!kyc) {
    throw new BadRequest(`Investor hasn't submitted kyc`);
  }
  kyc.verifed = true;
  kyc.branchId = req.user.branchId;
  await kyc.save();
  investor.approved = true;
  investor.accountStatus = INVESTOR_STATUS.ACTIVE;
  await investor.save();
  res.status(StatusCodes.CREATED).json({ msg: 'Verified and approved' });
};

export { onboarding, getKYCbyInvestorEmail, verifyKYCandApproveInvestor };
