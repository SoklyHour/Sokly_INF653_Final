// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
  // User's name (required)
  name: { type: String, required: true },
  // User's email (required, must be unique)
  email: { type: String, required: true, unique: true },
  // User's hashed password (required)
  password: { type: String, required: true },
  // User role: either 'user' or 'admin' (default: 'user')
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// Export the User model
module.exports = mongoose.model('User', userSchema);