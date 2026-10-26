const express = require('express');
const router = express.Router();
const { City, Train, Berth, Booking } = require('../models/db');

// GET /api/cities
router.get('/cities', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/trains
router.get('/trains', async (req, res) => {
  try {
    const { from, to } = req.query;
    let query = {};
    if (from && to) {
      // In this prototype, we simulate route filtering
      // Real production would have a 'routes' collection linking cities and trains
      console.log(`Filtering trains from ${from} to ${to}`);
    }
    const trains = await Train.find(query);
    res.json(trains);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/coach/berths
router.get('/coach/berths', async (req, res) => {
  try {
    const berths = await Berth.find();
    res.json(berths);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bookings
router.post('/bookings', async (req, res) => {
  try {
    const bookingData = req.body;

    // Backend Validation: Check if berth is still available
    const berth = await Berth.findOne({ id: bookingData.berthId });
    if (!berth) {
      return res.status(404).json({ error: 'Selected berth not found' });
    }
    if (berth.status === 'occupied') {
      return res.status(400).json({ error: 'This berth was just booked by another patient. Please select another.' });
    }

    const booking = new Booking(bookingData);
    await booking.save();

    // Mark berth as occupied
    await Berth.findOneAndUpdate({ id: bookingData.berthId }, { status: 'occupied' });

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/bookings/:id
router.get('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/bookings/:id
router.delete('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    // Mark berth as available again
    await Berth.findOneAndUpdate({ id: booking.berthId }, { status: 'available' });
    await Booking.deleteOne({ _id: booking._id });

    res.json({ message: 'Booking cancelled and berth released' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
