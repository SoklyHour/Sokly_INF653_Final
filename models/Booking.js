// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for a booking
const bookingSchema = new mongoose.Schema({
  // Reference to the user who made the booking
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Reference to the event being booked
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  // Number of tickets booked
  quantity: { type: Number, required: true },
  // Date when the booking was made
  bookingDate: { type: Date, default: Date.now },
  // QR code string (base64 or URL) for the booking
  qrCode: { type: String }
});

// Export the Booking model
module.exports = mongoose.model('Booking', bookingSchema);