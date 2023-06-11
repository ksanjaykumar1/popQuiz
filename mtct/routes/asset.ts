import express from 'express';
import { authorizePermissions } from '../middleware/authentication';
import { ROLES } from '../utils/enum';
import {
  create,
  getAll,
  getAllForSale,
  getAllSold,
} from '../controllers/asset';

const router = express.Router();

router.route('/create').post(authorizePermissions(ROLES.HQ_ADMIN), create);
router
  .route('/all')
  .get(authorizePermissions(ROLES.HQ_ADMIN, ROLES.BRANCH_REP), getAll);
router
  .route('/allForSale')
  .get(authorizePermissions(ROLES.HQ_ADMIN, ROLES.BRANCH_REP), getAllForSale);
router
  .route('/allSold')
  .get(authorizePermissions(ROLES.HQ_ADMIN, ROLES.BRANCH_REP), getAllSold);

export default router;
