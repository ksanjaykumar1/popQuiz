import express from 'express';
import { saleOffer } from '../controllers/sale';

const router = express.Router();

router.route('/createOfferSale').post(saleOffer);

export default router;
