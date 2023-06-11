import express from 'express';
import {
  getKYCbyInvestorEmail,
  onboarding,
  verifyKYCandApproveInvestor,
} from '../controllers/investor';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication';
import { ROLES } from '../utils/enum';

const router = express.Router();
router
  .route('/onboard')
  .post(authenticateUser, authorizePermissions(ROLES.BRANCH_REP), onboarding);
router
  .route('/getKYC')
  .post(
    authenticateUser,
    authorizePermissions(ROLES.BRANCH_REP),
    getKYCbyInvestorEmail
  );
router
  .route('/verifyKYCandApprove')
  .patch(
    authenticateUser,
    authorizePermissions(ROLES.BRANCH_REP),
    verifyKYCandApproveInvestor
  );

export default router;
