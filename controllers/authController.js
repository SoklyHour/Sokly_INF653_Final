const User = require('../models/User');
// Import bcryptjs for hashing and comparing passwords securely
const bcrypt = require('bcryptjs');
// Import jsonwebtoken for creating and verifying JWT tokens for authentication
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Respond with the new user's info (excluding password)
    res.status(201).json({
      message: 'User registered',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Authenticate a user and return a JWT token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Respond with the token and user info
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};