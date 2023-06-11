import express from 'express';
import { submitKyc } from '../controllers/investorPortal';
import { authenticateUser } from '../middleware/authentication';

const router = express.Router();

router.route('/submitkyc').post(authenticateUser, submitKyc);

export default router;
