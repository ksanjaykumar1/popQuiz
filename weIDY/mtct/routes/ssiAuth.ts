import express from 'express';
import { login, register } from '../controllers/ssiAuth';

const router = express.Router();

router.route('/sign-up').post(register);
router.route('/login').post(login);

export default router;
