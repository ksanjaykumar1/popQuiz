import express from 'express';
import { StatusCodes } from 'http-status-codes';
import Asset from '../models/Asset';

const create = async (req: any, res: express.Response) => {
  const asset = await Asset.create({
    ...req.body,
    ownerId: req.user.hqAdminId,
  });
  res.status(StatusCodes.CREATED).json({ msg: 'asset created', asset });
};

const updateById = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const getAll = async (req: express.Request, res: express.Response) => {
  const assets = await Asset.find();
  res.status(StatusCodes.CREATED).json({ msg: 'All assets', assets });
};

const getById = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.CREATED).json({ msg: 'created' });
};

const getAllSold = async (req: express.Request, res: express.Response) => {
  const assets = await Asset.find({ availableQuantity: { $eq: 0 } });
  res.status(StatusCodes.CREATED).json({ msg: 'All sold assets', assets });
};

const getAllForSale = async (req: express.Request, res: express.Response) => {
  const assets = await Asset.find({ availableQuantity: { $gt: 0 } });

  res.status(StatusCodes.CREATED).json({ msg: 'All For sale assets', assets });
};
export { create, getAll, updateById, getById, getAllSold, getAllForSale };
