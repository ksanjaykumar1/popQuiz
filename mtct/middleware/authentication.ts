import express from 'express';
import { UnAuthenticated, UnAuthorized } from '../errors';
import { isTokenValid } from '../utils/jwt';
import Logger from '../utils/logger';

/*authenticated User by validating JWT and 
adds JWT data to req.user for future use */
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
    const { userId, name, role, branchId, investorId, hqAdminId }: any =
      isTokenValid({
        token,
      });
    req.user = { name, userId, role, branchId, investorId, hqAdminId };
    Logger.info(JSON.stringify(req.user));
  } catch (error) {
    Logger.error(error);
  }
  next();
};

//  checks authorization based on roles
const authorizePermissions = (...roles: any) => {
  return (req: any, res: express.Response, next: express.NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new UnAuthorized('Unauthorized to access');
    }
    Logger.info(req.user.role);
    next();
  };
};

// checks the requesting resource belong to requesting user
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

export { authenticateUser, authorizePermissions, checkPermissions };
