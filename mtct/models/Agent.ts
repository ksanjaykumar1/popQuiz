import mongoose, { Schema } from 'mongoose';

const Agent = new Schema({
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
  expertise: {
    type: [String],
  },
  experienceYears: {
    type: Number,
    required: true,
    default: 1,
  },
  education: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Agent', Agent);
