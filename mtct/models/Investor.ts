import mongoose from 'mongoose';
import { INVESTOR_STATUS } from '../utils/enum';

const { Schema } = mongoose;

const investorSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
  },
  nationality: {
    type: String,
  },
  netWorth: {
    type: Number,
    required: true,
    default: 0,
  },
  investmentExperience: {
    type: String,
    required: true,
    default: 0,
  },
  investmentPreferences: {
    type: String,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  accountStatus: {
    type: String,
    enum: INVESTOR_STATUS,
    default: 'onboarded',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Investor = mongoose.model('Investor', investorSchema);

export default Investor;
