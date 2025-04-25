// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for an event
const eventSchema = new mongoose.Schema({
  // Event title (required)
  title: { type: String, required: true },
  // Event description (optional)
  description: String,
  // Event category (optional)
  category: String,
  // Venue/location of the event (optional)
  venue: String,
  // Date of the event (required)
  date: { type: Date, required: true },
  // Time of the event (optional)
  time: String,
  // Maximum number of seats available (required)
  seatCapacity: { type: Number, required: true },
  // Number of seats already booked (default: 0)
  bookedSeats: { type: Number, default: 0 },
  // Ticket price (required)
  price: { type: Number, required: true }
});

// Export the Event model
module.exports = mongoose.model('Event', eventSchema);