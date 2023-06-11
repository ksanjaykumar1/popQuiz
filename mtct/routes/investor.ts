import express from 'express';
import { onboarding } from '../controllers/investor';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication';
import { ROLES } from '../utils/enum';

const router = express.Router();
router
  .route('/onboard')
  .post(authenticateUser, authorizePermissions(ROLES.BRANCH_REP), onboarding);

export default router;
