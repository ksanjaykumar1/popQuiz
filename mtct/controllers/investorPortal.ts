import express from 'express';
import { StatusCodes } from 'http-status-codes';
import KYC from '../models/Kyc';
import Sale from '../models/Sale';
import { BadRequest } from '../errors';
import { checkPermissions } from '../middleware/authentication';
import InvestorPortfolio from '../models/Portfolio';
import { SALE_STATUS } from '../utils/enum';
import Asset from '../models/Asset';

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

const allSaleOffer = async (req: any, res: express.Response) => {
  const saleOffers = await Sale.find({ investorId: req.user.investorId });
  res.status(StatusCodes.CREATED).json({ msg: 'All sale offers', saleOffers });
};

const acceptSaleOffer = async (req: any, res: express.Response) => {
  const { id: saleOfferID } = req.params;
  const saleOffer = await Sale.findOne({ _id: saleOfferID });
  if (!saleOffer) {
    throw new BadRequest(`No such sale offer exits`);
  }
  const hasPermission = checkPermissions(
    req.user.userId,
    saleOffer.userId.toString()
  );
  if (hasPermission) {
    // check if portfolio exists if not create new one
    let portfolio = await InvestorPortfolio.findOne({
      userId: req.user.userId,
    });

    if (!portfolio) {
      portfolio = await InvestorPortfolio.create({
        userId: req.user.userId,
        investorId: req.user.investorId,
      });
    }

    // update asset quantity

    const asset = await Asset.findOne({ _id: saleOffer.assetId });
    if (!asset) {
      throw new BadRequest(`Asset doesn't exits`);
    }
    asset.availableQuantity = asset.availableQuantity - saleOffer.quantity;

    if (asset.availableQuantity < 0) {
      throw new BadRequest(
        'Assets not available, the sale cannot be completed'
      );
    }
    await asset.save();
    // update sale status

    // update portfolio
    portfolio.assets.push({
      assetId: saleOffer.assetId,
      assetName: asset.name,
      quantity: saleOffer.quantity,
    });
    await portfolio.save();
    saleOffer.status = SALE_STATUS.COMPLETED;
    await saleOffer.save();
  }

  res.status(StatusCodes.CREATED).json({ msg: 'Offer accepted' });
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

export { submitKyc, allSaleOffer, acceptSaleOffer };
