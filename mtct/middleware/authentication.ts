import express from 'express';
import { UnAuthenticated, UnAuthorized } from '../errors';
import { isTokenValid } from '../utils/jwt';
import Logger from '../utils/logger';

const authenticateUser = async (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticated('Authenctication invalid ');
  }

  const token = authHeader.split(' ')[1];
  Logger.info('Token present');
  try {
    const { userId, name, role }: any = isTokenValid({ token });
    req.user = { name, userId, role };
    Logger.info(JSON.stringify(req.user));
  } catch (error) {
    Logger.error(error);
  }
  next();
};

const authorizePermissions = (...roles: any) => {
  return (req: any, res: express.Response, next: express.NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new UnAuthorized('authorized to access');
    }
    Logger.info(req.user.role);
    next();
  };
};

const checkPermissions = (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.params.id !== req.user.userId) {
    throw new UnAuthorized(`User doesn't have permission`);
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizePermissions,
  checkPermissions,
};
