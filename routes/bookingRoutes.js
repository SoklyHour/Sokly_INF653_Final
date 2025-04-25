// Import express and create a router
const express = require('express');
const router = express.Router();
// Import the booking controller
const bookingController = require('../controllers/bookingController');
// Import the authentication middleware
const auth = require('../middleware/auth');

// Route to create a new booking (user only)
router.post('/', auth, bookingController.createBooking);
// Route to get all bookings for the logged-in user
router.get('/', auth, bookingController.getUserBookings);
// Route to get a specific booking by ID for the logged-in user
router.get('/:id', auth, bookingController.getBookingById);

// BONUS: Ticket validation endpoint (no auth required)
router.get('/validate/:qr', bookingController.validateTicket);

// Export the router to be used in the main app
module.exports = router;