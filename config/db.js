// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define an async function to connect to MongoDB using the URI from environment variables
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the provided connection string
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    // If connection fails, log the error and exit the process
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;