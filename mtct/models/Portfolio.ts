import mongoose from 'mongoose';

const { Schema } = mongoose;

const investorPortfolioSchema = new Schema({
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investor',
    required: true,
  },
  assets: [
    {
      asset: {
        type: mongoose.Schema.Types.ObjectId,
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
