const Event = require('../models/Event');
const Booking = require('../models/Booking');
const User = require('../models/User');

// Create a new event (admin only)
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all events, with optional filtering by category and date
exports.getAllEvents = async (req, res) => {
  try {
    const { category, date } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (date) filter.date = new Date(date);
    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single event by its ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an event (admin only)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    // Prevent reducing seatCapacity below the number of already booked seats
    if (req.body.seatCapacity && req.body.seatCapacity < event.bookedSeats) {
      return res.status(400).json({ message: 'seatCapacity cannot be less than bookedSeats' });
    }
    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an event (admin only)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    // Optionally: check for bookings and prevent deletion if any exist
    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Admin Dashboard Route: Return all events with a list of users who booked each event
exports.adminDashboard = async (req, res) => {
  try {
    const events = await Event.find();
    const dashboard = [];
    for (const event of events) {
      // Find all bookings for this event and populate user info
      const bookings = await Booking.find({ event: event._id }).populate('user', 'name email');
      dashboard.push({
        event,
        bookings: bookings.map(b => ({
          user: b.user,
          quantity: b.quantity,
          bookingDate: b.bookingDate
        }))
      });
    }
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};