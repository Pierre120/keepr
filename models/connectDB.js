// Import Mongoose
const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;
console.log(MONGODB_URL);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB connected: ${conn.connection.host}`);
  } catch(err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;