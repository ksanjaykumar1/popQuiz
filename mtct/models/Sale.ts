import mongoose from 'mongoose';
import { SALE_STATUS } from '../utils/enum';

const { Schema } = mongoose;

const SaleSchema = new Schema({
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
  assetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  salePrice: {
    type: Number,
    required: true,
    min: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  saleDate: {
    type: Date,
    default: Date.now,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  status: {
    type: String,
    enum: SALE_STATUS,
    default: 'offered',
  },
});

const Sale = mongoose.model('Sale', SaleSchema);

export default Sale;
