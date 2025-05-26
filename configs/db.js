import mongoose from 'mongoose';

const dbConfig = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/board');
    console.log('MongoDB 연결 성공');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

export default dbConfig;