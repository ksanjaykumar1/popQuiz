import express from 'express';
import { customerOnboarding } from '../controllers/investor';

const router = express.Router();
router.route('/sign-up').post(customerOnboarding);

export default router;
