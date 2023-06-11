import express from 'express';
import { acceptSaleOffer, allSaleOffer, submitKyc } from '../controllers/investorPortal';
import { authenticateUser } from '../middleware/authentication';

const router = express.Router();

router.route('/submitkyc').post(submitKyc);
router.route('/allSaleOffer').get(allSaleOffer);
router.route('/acceptSaleOffer/:id').post(acceptSaleOffer);

export default router;
