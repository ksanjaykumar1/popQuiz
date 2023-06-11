import { StatusCodes } from 'http-status-codes';
import CustomError from './CustomError.js';

export default class UnAuthorized extends CustomError {
  statusCode: any;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
