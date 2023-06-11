import mongooes from 'mongoose';

const connectDB = (url: any) => {
  return mongooes.connect(url);
};

export default connectDB;
