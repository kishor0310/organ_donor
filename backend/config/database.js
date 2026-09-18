const mongoose = require('mongoose');

let mongodInstance = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/organ-donor-system';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.log(`ℹ️ External/Local MongoDB not reachable (${error.message}).`);
    console.log(`🚀 Starting embedded MongoMemoryServer for instant local run...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create();
      const memoryUri = mongodInstance.getUri() + 'organ-donor-system';
      const conn = await mongoose.connect(memoryUri);
      console.log(`✅ Embedded MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (memError) {
      console.error(`❌ MongoDB Connection Error: ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
