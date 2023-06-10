import mongoose from 'mongoose';

const { Schema } = mongoose;

const SaleSchema = new Schema({
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor',
    required: true,
  },
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock',
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
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
});

const Sale = mongoose.model('Sale', SaleSchema);

export default Sale;
