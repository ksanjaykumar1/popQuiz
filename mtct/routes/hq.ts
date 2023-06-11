import express from 'express';
import { authorizePermissions } from '../middleware/authentication';
import { ROLES } from '../utils/enum';
import {
  getAllOnboarding,
  getAllOnboardingByBranch,
  getAllOnboardingByBranchToday,
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

export default router;
