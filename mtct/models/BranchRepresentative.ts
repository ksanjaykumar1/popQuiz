import mongoose from 'mongoose';

const { Schema } = mongoose;

const BranchRepresentativeSchema = new Schema({
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
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model(
  'BranchRepresentative',
  BranchRepresentativeSchema
);
