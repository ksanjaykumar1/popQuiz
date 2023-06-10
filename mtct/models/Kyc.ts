import mongoose from 'mongoose';

const { Schema } = mongoose;

const kycSchema = new Schema({
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
  },
  nationality: {
    type: String,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
});

const KYC = mongoose.model('KYC', kycSchema);

export default KYC;
