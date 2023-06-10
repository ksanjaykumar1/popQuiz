import mongoose from 'mongoose';

const { Schema } = mongoose;

const hqRepresentativeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  branchs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
  ],
  region: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const HQRepresentative = mongoose.model(
  'HQRepresentative',
  hqRepresentativeSchema
);

export default HQRepresentative;
