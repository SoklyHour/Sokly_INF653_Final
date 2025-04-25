const Booking = require('../models/Booking');
const Event = require('../models/Event');
// Import the qrcode package to generate QR codes for bookings
const QRCode = require('qrcode');
// Import nodemailer to send booking confirmation emails
const nodemailer = require('nodemailer');

exports.createBooking = async (req, res) => {
  try {
    const { event: eventId, quantity } = req.body;
    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    // Check if enough seats are available
    if (event.seatCapacity - event.bookedSeats < quantity) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }
    // Update booked seats and save event
    event.bookedSeats += quantity;
    await event.save();

    // Generate a unique QR code string for this booking
    const qrString = `${req.user._id}-${eventId}-${Date.now()}`;
    // Generate a QR code image as a data URL
    const qrCode = await QRCode.toDataURL(qrString);

    // Create and save the booking with the QR code
    const booking = new Booking({ user: req.user._id, event: eventId, quantity, qrCode });
    await booking.save();

    // Send confirmation email with QR code if email credentials are set
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: req.user.email,
        subject: 'Booking Confirmation',
        text: `Your booking is confirmed! Booking ID: ${booking._id}`,
        html: `
          <div>
            <b>Your booking is confirmed!</b><br>
            Booking ID: ${booking._id}<br>
            QR Code:<br>
            <img src="${qrCode}" alt="QR Code" style="width:200px;height:200px;display:block;margin-top:10px;"/>
          </div>
        `
      });
    }

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all bookings for the logged-in user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a specific booking by ID for the logged-in user
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id }).populate('event');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// BONUS: Validate ticket by QR code
exports.validateTicket = async (req, res) => {
  try {
    const { qr } = req.params;
    // Find the booking by QR code string
    const booking = await Booking.findOne({ qrCode: qr });
    if (!booking) return res.status(404).json({ valid: false, message: 'Invalid ticket' });
    res.json({ valid: true, booking });
  } catch (err) {
    res.status(400).json({ valid: false, message: err.message });
  }
};