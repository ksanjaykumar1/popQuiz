import express from 'express';
import { StatusCodes } from 'http-status-codes';
import KYC from '../models/Kyc';

const submitKyc = async (req: any, res: express.Response) => {
  const kyc = await KYC.create({
    ...req.body,
    userId: req.user.userId,
    investorId: req.user.investorId,
  });
  res.status(StatusCodes.CREATED).json({ msg: 'KYC submitted', kyc });
};

const myPortfolio = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const myTransactionHistory = async (
  req: express.Request,
  res: express.Response
) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const allSale = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const allBuy = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const allSell = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

export { submitKyc };
