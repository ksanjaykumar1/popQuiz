import mongoose from 'mongoose';

const { Schema } = mongoose;

const Branch = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Branch', Branch);
