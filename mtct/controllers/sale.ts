import express from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import { BadRequest } from '../errors';
import Investor from '../models/Investor';
import { INVESTOR_STATUS } from '../utils/enum';
import Asset from '../models/Asset';
import Sale from '../models/Sale';
import Logger from '../utils/logger';

const saleOffer = async (req: any, res: express.Response) => {
  const { emailOfInvestor, assetName, quantity, salePrice } = req.body;
  Logger.info(JSON.stringify(req.body));
  const user = await User.findOne({ email: emailOfInvestor });
  if (!user) {
    throw new BadRequest("User doesn't exit");
  }
  const investor = await Investor.findOne({ userId: user._id });
  if (!investor) {
    throw new BadRequest("Email doesn't belong to investor");
  }
  if (investor.accountStatus !== INVESTOR_STATUS.ACTIVE) {
    throw new BadRequest('Investor is not active');
  }
  const asset = await Asset.findOne({
    name: assetName,
    availableQuantity: { $gt: 0 },
  });
  if (!asset) {
    throw new BadRequest("Asset doesn't exit or is not available");
  }
  const sale = await Sale.create({
    userId: user._id,
    investorId: investor._id,
    assetId: asset._id,
    quantity,
    salePrice,
    totalAmount: salePrice * quantity,
    branchId: req.user.branchId,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Sale offer created successfully', sale });
};

const buy = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const sell = async (req: express.Request, res: express.Response) => {
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

const allSaleByBranch = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const allBuyByBranch = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const allSellByBranch = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const updateInvestorPortfolio = async (
  req: express.Request,
  res: express.Response
) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

export { saleOffer };
