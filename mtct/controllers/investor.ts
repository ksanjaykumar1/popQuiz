import express from 'express';
import { StatusCodes } from 'http-status-codes';
const customerOnboarding = async (
  req: express.Request,
  res: express.Response
) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const verifyKYC = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const getAllCustomerOnboarding = async (
  req: express.Request,
  res: express.Response
) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const getAllCustomerOnboardingByBranch = async (
  req: express.Request,
  res: express.Response
) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const getCustomerOnboardingById = async (
  req: express.Request,
  res: express.Response
) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};


export {}