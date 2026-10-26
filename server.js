require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const { City, Train, Berth } = require('./models/db');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medirail';

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Serve static files from root
app.use(express.static('public'));

async function seedDatabase() {
  const count = await City.countDocuments();
  if (count === 0) {
    console.log('Seeding database with initial data...');

    const cities = [
      { id: 'mumbai', name: 'Mumbai', code: 'CSMT', state: 'Maharashtra', hospitalHub: 'Lilavati, KEM, Kokilaben' },
      { id: 'pune', name: 'Pune', code: 'PUNE', state: 'Maharashtra', hospitalHub: 'Ruby Hall, Jehangir Hospital' },
      { id: 'delhi', name: 'Delhi', code: 'NDLS', state: 'Delhi NCR', hospitalHub: 'AIIMS, Apollo, Fortis' },
      { id: 'bengaluru', name: 'Bengaluru', code: 'SBC', state: 'Karnataka', hospitalHub: 'Narayana Health, Manipal, Aster' },
      { id: 'hyderabad', name: 'Hyderabad', code: 'SC', state: 'Telangana', hospitalHub: 'Yashoda, Apollo Jubilee Hills, AIG' },
      { id: 'chennai', name: 'Chennai', code: 'MAS', state: 'Tamil Nadu', hospitalHub: 'Apollo Greams, MGM Healthcare, CMC' },
      { id: 'kolkata', name: 'Kolkata', code: 'HWH', state: 'West Bengal', hospitalHub: 'Apollo Gleneagles, AMRI, Fortis' },
      { id: 'ahmedabad', name: 'Ahmedabad', code: 'ADI', state: 'Gujarat', hospitalHub: 'Zydus, Sterling, UN Mehta Cardiac' }
    ];

    const trains = [
      { number: '22222', name: 'Vande Bharat Medi-Express', type: 'Semi High-Speed ICU Transit', departure: '06:15 AM', duration: '3h 45m', speed: '130 km/h', coach: 'M-1 (Dedicated Critical Care Unit)', doctorOnBoard: 'Dr. A. K. Sen (MD, Critical Care)', baseFare: 3800, tags: ['Fastest Corridor', 'Active Tele-ICU', 'Oxygen Piped'], status: 'High Priority Green Track' },
      { number: '12952', name: 'LifeLine Rajdhani Superfast', type: 'Overnight Intensive Care Transit', departure: '16:30 PM', duration: '5h 15m', speed: '120 km/h', coach: 'M-1 (Hospital Ward Coach)', doctorOnBoard: 'Dr. Rashmi Verma (MBBS, Emergency Medicine)', baseFare: 3200, tags: ['Full Isolation ICU', 'Dual Power Backup', 'Stretcher Lift'], status: 'Confirmed Daily Run' },
      { number: '12050', name: 'MediRail Shatabdi Express', type: 'Intercity Day Medical Care', duration: '4h 10m', departure: '13:45 PM', speed: '115 km/h', coach: 'M-1 (Medical Transfer Coach)', doctorOnBoard: 'Dr. Nikhil Kulkarni (Emergency Physician)', baseFare: 2900, tags: ['Wheelchair Friendly', 'Doctor + 2 Paramedics'], status: 'Priority Signal' },
      { number: '12246', name: 'Critical Care Duronto Express', type: 'Non-stop Metro Medical Corridor', duration: '4h 00m', departure: '20:15 PM', speed: '125 km/h', coach: 'M-1 (Advanced Life Support Coach)', doctorOnBoard: 'Dr. Farhan Siddiqui (MD, Anesthesia & Trauma)', baseFare: 3500, tags: ['Zero Commercial Stops', 'Direct Ambulance Transfer'], status: 'Express Medical Clearance' }
    ];

    const berths = [
      { id: 'M-ICU-01', label: 'Berth M-01', type: 'ICU Critical Berth', zone: 'Zone B: Intensive Care Bay', status: 'available', equipment: 'Dual Piped O2 + Ventilator Port + 230V UPS + Defibrillator Mount', priceModifier: 2000, pairedAttendant: 'ATT-01', description: 'Closest to doctor station. Anti-vibration pneumatic suspension mount with overhead vital screen.' },
      { id: 'M-ICU-02', label: 'Berth M-02', type: 'ICU Critical Berth', zone: 'Zone B: Intensive Care Bay', status: 'occupied', equipment: 'Dual Piped O2 + Ventilator Port + 230V UPS', priceModifier: 2000, pairedAttendant: 'ATT-02', description: 'Reserved for urgent trauma transfer.' },
      { id: 'M-ST-03', label: 'Berth M-03', type: 'Semi-ICU Stretcher', zone: 'Zone C: Stretcher Transit Bay', status: 'available', equipment: 'Piped O2 + Multi-para Monitor Mount + IV Stand', priceModifier: 1000, pairedAttendant: 'ATT-03', description: 'Spacious stretcher berth with direct window view and adjustable backrest.' },
      { id: 'M-ST-04', label: 'Berth M-04', type: 'Semi-ICU Stretcher', zone: 'Zone C: Stretcher Transit Bay', status: 'available', equipment: 'Piped O2 + Multi-para Monitor Mount + IV Stand', priceModifier: 1000, pairedAttendant: 'ATT-04', description: 'Centrally positioned berth with easy wide-ramp stretcher transfer access.' },
      { id: 'M-ST-05', label: 'Berth M-05', type: 'Semi-ICU Stretcher', zone: 'Zone C: Stretcher Transit Bay', status: 'occupied', equipment: 'Piped O2 + IV Stand', priceModifier: 1000, pairedAttendant: 'ATT-05', description: 'Occupied by orthopedic transit patient.' },
      { id: 'M-OX-06', label: 'Berth M-06', type: 'Oxygen Assisted Recliner', zone: 'Zone D: Oxygen Support Bay', status: 'available', equipment: 'Regulated Piped Oxygen + Reclining Hospital Bed + Call Button', priceModifier: 500, pairedAttendant: 'ATT-06', description: 'Suitable for stable patients requiring constant oxygen inhalation and comfortable resting.' },
      { id: 'M-OX-07', label: 'Berth M-07', type: 'Oxygen Assisted Recliner', zone: 'Zone D: Oxygen Support Bay', status: 'available', equipment: 'Regulated Piped Oxygen + Reclining Hospital Bed + Call Button', priceModifier: 500, pairedAttendant: 'ATT-07', description: 'High comfort ergonomic medical bed with continuous medical gas pipeline support.' }
    ];

    await City.insertMany(cities);
    await Train.insertMany(trains);
    await Berth.insertMany(berths);
    console.log('Database seeded successfully!');
  } else {
    console.log('Database already seeded.');
  }
}

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`MediRail Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

startServer();
