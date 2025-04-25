// Import jsonwebtoken for verifying JWT tokens
const jwt = require('jsonwebtoken');
// Import the User model to fetch user details from the database
const User = require('../models/User');

// Middleware to authenticate requests using JWT
const auth = async (req, res, next) => {
  // Get the Authorization header from the request
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  // Extract the token from the header (format: "Bearer <token>")
  const token = authHeader.split(' ')[1];
  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user by ID and exclude the password field
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;