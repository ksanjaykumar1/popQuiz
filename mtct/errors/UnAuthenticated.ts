import { StatusCodes } from 'http-status-codes';
import CustomError from './CustomError.js';

export default class UnAuthenticated extends CustomError {
  statusCode: any;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
