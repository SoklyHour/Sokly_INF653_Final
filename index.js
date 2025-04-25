// Import express for creating the server
const express = require('express');
// Import dotenv to load environment variables from .env file
const dotenv = require('dotenv');
// Import the MongoDB connection function
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route: display a simple HTML welcome page
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Event Ticketing System API</h1>');
});

// Mount API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// 404 Catch-all for non-existent routes
app.use((req, res) => {
  if (req.accepts('html')) {
    res.status(404).send('<h1>404 Not Found</h1>');
  } else if (req.accepts('json')) {
    res.status(404).json({ error: '404 Not Found' });
  } else {
    res.status(404).send('404 Not Found');
  }
});

// Start the server on the specified port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});