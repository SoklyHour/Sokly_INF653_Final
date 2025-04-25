// Import express and create a router
const express = require('express');
const router = express.Router();
// Import the event controller
const eventController = require('../controllers/eventController');
// Import authentication and admin middleware
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Route to get all events (with optional filters)
router.get('/', eventController.getAllEvents);
// Route to get a single event by ID
router.get('/:id', eventController.getEventById);
// Route to create a new event (admin only)
router.post('/', auth, admin, eventController.createEvent);
// Route to update an event (admin only)
router.put('/:id', auth, admin, eventController.updateEvent);
// Route to delete an event (admin only)
router.delete('/:id', auth, admin, eventController.deleteEvent);

// Admin dashboard route (admin only)
router.get('/admin/dashboard', auth, admin, eventController.adminDashboard);

// Export the router to be used in the main app
module.exports = router;