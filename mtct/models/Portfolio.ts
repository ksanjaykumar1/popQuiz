import mongoose from 'mongoose';

const { Schema } = mongoose;

const investorPortfolioSchema = new Schema({
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
  assets: [
    {
      assetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        required: true,
      },
      assetName: {
        type: String,
        ref: 'Asset',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const InvestorPortfolio = mongoose.model(
  'InvestorPortfolio',
  investorPortfolioSchema
);

export default InvestorPortfolio;
