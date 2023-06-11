import mongoose from 'mongoose';

const { Schema } = mongoose;

const kycSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  investorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor',
    required: true,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
  },
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  address: {
    type: String,
  },
  nationality: {
    type: String,
  },
  issueDate: {
    type: Date,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  verifed: {
    type: Boolean,
    default: false,
  },
});

const KYC = mongoose.model('KYC', kycSchema);

export default KYC;
