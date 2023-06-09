import express from 'express';
import { StatusCodes } from 'http-status-codes';
const register = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.CREATED).json({ msg: 'successfully created' });
};

const login = async (req: express.Request, res: express.Response) => {
  res.status(StatusCodes.OK).json({ msg: 'successfully logged In' });
};
export { register, login };
