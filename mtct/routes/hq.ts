import express from 'express';
import { authorizePermissions } from '../middleware/authentication';
import { ROLES } from '../utils/enum';
import {
  getAllKyc,
  getAllKycByBranch,
  getAllKycByBranchToday,
  getAllOnboarding,
  getAllOnboardingByBranch,
  getAllOnboardingByBranchToday,
  getAllSale,
  getAllSaleByBranch,
  getAllSaleByBranchToday,
} from '../controllers/hq';

const router = express.Router();

router
  .route('/allOnboarding')
  .get(authorizePermissions(ROLES.HQ_ADMIN), getAllOnboarding);
router
  .route('/allOnboardingByBranch/:branchName')
  .get(authorizePermissions(ROLES.HQ_ADMIN), getAllOnboardingByBranch);
router
  .route('/allOnboardingByBranchToday/:branchName')
  .get(authorizePermissions(ROLES.HQ_ADMIN), getAllOnboardingByBranchToday);

router.route('/allSales').get(authorizePermissions(ROLES.HQ_ADMIN), getAllSale);
router
  .route('/allSalesByBranch/:branchName')
  .get(authorizePermissions(ROLES.HQ_ADMIN), getAllSaleByBranch);
router
  .route('/allSalesByBranchToday/:branchName')
  .get(authorizePermissions(ROLES.HQ_ADMIN), getAllSaleByBranchToday);

router.route('/allKYC').get(authorizePermissions(ROLES.HQ_ADMIN), getAllKyc);
router
  .route('/allKYCByBranch/:branchName')
  .get(authorizePermissions(ROLES.HQ_ADMIN), getAllKycByBranch);
router
  .route('/allKYCByBranchToday/:branchName')
  .get(authorizePermissions(ROLES.HQ_ADMIN), getAllKycByBranchToday);

export default router;
