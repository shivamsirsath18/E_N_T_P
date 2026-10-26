const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  state: String,
  hospitalHub: String
});

const trainSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: String,
  departure: String,
  duration: String,
  speed: String,
  coach: String,
  doctorOnBoard: String,
  baseFare: Number,
  tags: [String],
  status: String
});

const berthSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  type: String,
  zone: String,
  status: { type: String, default: 'available' },
  equipment: String,
  priceModifier: Number,
  pairedAttendant: String,
  description: String
});

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  pnr: { type: String, required: true, unique: true },
  patient: {
    name: String,
    age: Number,
    gender: String,
    conditionCategory: String,
    conditionDetails: String
  },
  attendant: {
    name: String,
    phone: String
  },
  journey: {
    fromCity: String,
    toCity: String,
    date: String,
    trainNumber: String
  },
  berthId: String,
  selectedServices: [String],
  totalFare: Number,
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  City: mongoose.model('City', citySchema),
  Train: mongoose.model('Train', trainSchema),
  Berth: mongoose.model('Berth', berthSchema),
  Booking: mongoose.model('Booking', bookingSchema)
};
