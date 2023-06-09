import mongoose, { Schema } from 'mongoose';
import { ROLES } from '../utils/enum';
import * as bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ROLES,
    default: 'investor',
  },
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(this.password, candidatePassword);
  return isMatch;
};

export default mongoose.model('User', UserSchema);
