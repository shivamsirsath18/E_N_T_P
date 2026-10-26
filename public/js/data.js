// Mock Data for MediRail Emergency Booking System
// Academic Project Prototype

const CITIES = [
  { id: 'mumbai', name: 'Mumbai', code: 'CSMT', state: 'Maharashtra', hospitalHub: 'Lilavati, KEM, Kokilaben' },
  { id: 'pune', name: 'Pune', code: 'PUNE', state: 'Maharashtra', hospitalHub: 'Ruby Hall, Jehangir Hospital' },
  { id: 'delhi', name: 'Delhi', code: 'NDLS', state: 'Delhi NCR', hospitalHub: 'AIIMS, Apollo, Fortis' },
  { id: 'bengaluru', name: 'Bengaluru', code: 'SBC', state: 'Karnataka', hospitalHub: 'Narayana Health, Manipal, Aster' },
  { id: 'hyderabad', name: 'Hyderabad', code: 'SC', state: 'Telangana', hospitalHub: 'Yashoda, Apollo Jubilee Hills, AIG' },
  { id: 'chennai', name: 'Chennai', code: 'MAS', state: 'Tamil Nadu', hospitalHub: 'Apollo Greams, MGM Healthcare, CMC' },
  { id: 'kolkata', name: 'Kolkata', code: 'HWH', state: 'West Bengal', hospitalHub: 'Apollo Gleneagles, AMRI, Fortis' },
  { id: 'ahmedabad', name: 'Ahmedabad', code: 'ADI', state: 'Gujarat', hospitalHub: 'Zydus, Sterling, UN Mehta Cardiac' }
];

const MEDICAL_TRAINS = [
  {
    number: '22222',
    name: 'Vande Bharat Medi-Express',
    type: 'Semi High-Speed ICU Transit',
    departure: '06:15 AM',
    duration: '3h 45m',
    speed: '130 km/h',
    coach: 'M-1 (Dedicated Critical Care Unit)',
    doctorOnBoard: 'Dr. A. K. Sen (MD, Critical Care)',
    baseFare: 3800,
    tags: ['Fastest Corridor', 'Active Tele-ICU', 'Oxygen Piped'],
    status: 'High Priority Green Track'
  },
  {
    number: '12952',
    name: 'LifeLine Rajdhani Superfast',
    type: 'Overnight Intensive Care Transit',
    departure: '16:30 PM',
    duration: '5h 15m',
    speed: '120 km/h',
    coach: 'M-1 (Hospital Ward Coach)',
    doctorOnBoard: 'Dr. Rashmi Verma (MBBS, Emergency Medicine)',
    baseFare: 3200,
    tags: ['Full Isolation ICU', 'Dual Power Backup', 'Stretcher Lift'],
    status: 'Confirmed Daily Run'
  },
  {
    number: '12050',
    name: 'MediRail Shatabdi Express',
    type: 'Intercity Day Medical Care',
    duration: '4h 10m',
    departure: '13:45 PM',
    speed: '115 km/h',
    coach: 'M-1 (Medical Transfer Coach)',
    doctorOnBoard: 'Dr. Nikhil Kulkarni (Emergency Physician)',
    baseFare: 2900,
    tags: ['Wheelchair Friendly', 'Doctor + 2 Paramedics'],
    status: 'Priority Signal'
  },
  {
    number: '12246',
    name: 'Critical Care Duronto Express',
    type: 'Non-stop Metro Medical Corridor',
    duration: '4h 00m',
    departure: '20:15 PM',
    speed: '125 km/h',
    coach: 'M-1 (Advanced Life Support Coach)',
    doctorOnBoard: 'Dr. Farhan Siddiqui (MD, Anesthesia & Trauma)',
    baseFare: 3500,
    tags: ['Zero Commercial Stops', 'Direct Ambulance Transfer'],
    status: 'Express Medical Clearance'
  }
];

const MEDICAL_SERVICES = [
  {
    id: 'oxygen',
    name: 'Oxygen Support',
    shortDesc: 'Piped O2 & High-Flow Backup Cylinder',
    longDesc: 'Continuous regulated medical oxygen with nasal cannula, venturi mask, and digital flowmeter.',
    price: 1500,
    icon: 'oxygen',
    recommendedFor: ['Respiratory distress', 'Hypoxia', 'Cardiac conditions'],
    selectedByDefault: true
  },
  {
    id: 'ventilator',
    name: 'Ventilator Support',
    shortDesc: 'ICU Transport Mechanical Ventilator',
    longDesc: 'Hamilton-T1 portable intensive care ventilator with invasive and non-invasive modes.',
    price: 4500,
    icon: 'ventilator',
    recommendedFor: ['Critical respiratory failure', 'Post-intubation transfers'],
    selectedByDefault: false
  },
  {
    id: 'cardiac_monitor',
    name: 'Cardiac Monitoring',
    shortDesc: 'Multi-Para Telemetry & ECG Display',
    longDesc: '5-lead ECG, SpO2, NIBP, temperature, and pulse rate continuous display connected to nurse console.',
    price: 2000,
    icon: 'cardiac',
    recommendedFor: ['Post-angioplasty', 'Arrhythmia', 'Cardiac monitoring'],
    selectedByDefault: true
  },
  {
    id: 'stretcher',
    name: 'Hydraulic Stretcher',
    shortDesc: 'Shock-Absorbing Rail Stretcher',
    longDesc: 'Anti-vibration pneumatic suspension stretcher locking securely to the coach floor track.',
    price: 1200,
    icon: 'stretcher',
    recommendedFor: ['Spinal trauma', 'Post-operative spine/ortho', 'Immobilized patients'],
    selectedByDefault: true
  },
  {
    id: 'wheelchair',
    name: 'Wheelchair Assistance',
    shortDesc: 'Station Platform Ramp & Coach Transfer',
    longDesc: 'Special narrow-aisle transit wheelchair with dedicated railway porter and paramedic assistance.',
    price: 500,
    icon: 'wheelchair',
    recommendedFor: ['Elderly', 'Partial mobility', 'Frailty'],
    selectedByDefault: false
  },
  {
    id: 'iv_support',
    name: 'IV Support & Infusion Pump',
    shortDesc: 'Electronic Syringe & Volumetric Pumps',
    longDesc: 'Precision micro-infusion pumps for inotropes, saline drips, and controlled emergency medicine delivery.',
    price: 800,
    icon: 'iv',
    recommendedFor: ['Medication drips', 'Fluid resuscitation', 'Chemotherapy transit'],
    selectedByDefault: true
  },
  {
    id: 'attendant_seat',
    name: 'Attendant Companion Seat',
    shortDesc: 'Reclining Berth Right Next to Patient',
    longDesc: 'Comfortable reclining companion seat directly beside patient bed with power charging and meal tray.',
    price: 900,
    note: '1 Primary Attendant Included Free in Base Fare',
    icon: 'attendant',
    recommendedFor: ['Immediate family member', 'Legal guardian'],
    selectedByDefault: true
  },
  {
    id: 'medical_staff',
    name: 'Critical Care Doctor & Nurse',
    shortDesc: 'On-Board ICU Medical Escort Team',
    longDesc: 'Certified Emergency Physician and ICU Nurse monitoring patient vitals throughout the rail journey.',
    price: 3500,
    icon: 'doctor',
    recommendedFor: ['All critical transfers', 'Doctor reference mandated'],
    selectedByDefault: true
  }
];

const COACH_BERTHS = [
  // Zone B: ICU Critical Stretcher Berths
  {
    id: 'M-ICU-01',
    label: 'Berth M-01',
    type: 'ICU Critical Berth',
    zone: 'Zone B: Intensive Care Bay',
    status: 'available',
    equipment: 'Dual Piped O2 + Ventilator Port + 230V UPS + Defibrillator Mount',
    priceModifier: 2000,
    pairedAttendant: 'ATT-01',
    description: 'Closest to doctor station. Anti-vibration pneumatic suspension mount with overhead vital screen.'
  },
  {
    id: 'M-ICU-02',
    label: 'Berth M-02',
    type: 'ICU Critical Berth',
    zone: 'Zone B: Intensive Care Bay',
    status: 'occupied',
    equipment: 'Dual Piped O2 + Ventilator Port + 230V UPS',
    priceModifier: 2000,
    pairedAttendant: 'ATT-02',
    description: 'Reserved for urgent trauma transfer.'
  },

  // Zone C: Standard Medical Stretchers
  {
    id: 'M-ST-03',
    label: 'Berth M-03',
    type: 'Semi-ICU Stretcher',
    zone: 'Zone C: Stretcher Transit Bay',
    status: 'available',
    equipment: 'Piped O2 + Multi-para Monitor Mount + IV Stand',
    priceModifier: 1000,
    pairedAttendant: 'ATT-03',
    description: 'Spacious stretcher berth with direct window view and adjustable backrest.'
  },
  {
    id: 'M-ST-04',
    label: 'Berth M-04',
    type: 'Semi-ICU Stretcher',
    zone: 'Zone C: Stretcher Transit Bay',
    status: 'available',
    equipment: 'Piped O2 + Multi-para Monitor Mount + IV Stand',
    priceModifier: 1000,
    pairedAttendant: 'ATT-04',
    description: 'Centrally positioned berth with easy wide-ramp stretcher transfer access.'
  },
  {
    id: 'M-ST-05',
    label: 'Berth M-05',
    type: 'Semi-ICU Stretcher',
    zone: 'Zone C: Stretcher Transit Bay',
    status: 'occupied',
    equipment: 'Piped O2 + IV Stand',
    priceModifier: 1000,
    pairedAttendant: 'ATT-05',
    description: 'Occupied by orthopedic transit patient.'
  },

  // Zone D: Oxygen Assisted Berths
  {
    id: 'M-OX-06',
    label: 'Berth M-06',
    type: 'Oxygen Assisted Recliner',
    zone: 'Zone D: Oxygen Support Bay',
    status: 'available',
    equipment: 'Regulated Piped Oxygen + Reclining Hospital Bed + Call Button',
    priceModifier: 500,
    pairedAttendant: 'ATT-06',
    description: 'Suitable for stable patients requiring constant oxygen inhalation and comfortable resting.'
  },
  {
    id: 'M-OX-07',
    label: 'Berth M-07',
    type: 'Oxygen Assisted Recliner',
    zone: 'Zone D: Oxygen Support Bay',
    status: 'available',
    equipment: 'Regulated Piped Oxygen + Reclining Hospital Bed + Call Button',
    priceModifier: 500,
    pairedAttendant: 'ATT-07',
    description: 'High comfort ergonomic medical bed with continuous medical gas pipeline support.'
  }
];

const ATTENDANT_SEATS = [
  { id: 'ATT-01', label: 'Seat A1', pairedWith: 'M-ICU-01', status: 'available' },
  { id: 'ATT-02', label: 'Seat A2', pairedWith: 'M-ICU-02', status: 'occupied' },
  { id: 'ATT-03', label: 'Seat A3', pairedWith: 'M-ST-03', status: 'available' },
  { id: 'ATT-04', label: 'Seat A4', pairedWith: 'M-ST-04', status: 'available' },
  { id: 'ATT-05', label: 'Seat A5', pairedWith: 'M-ST-05', status: 'occupied' },
  { id: 'ATT-06', label: 'Seat A6', pairedWith: 'M-OX-06', status: 'available' },
  { id: 'ATT-07', label: 'Seat A7', pairedWith: 'M-OX-07', status: 'available' }
];

const FAQS = [
  {
    q: 'How does the Medical Train Coach work on Indian Railways?',
    a: 'MediRail attaches one specialized, hospital-grade air-conditioned coach (Coach M-1) to select high-speed express trains (such as Vande Bharat and Rajdhani). The coach is retrofitted with ICU beds, oxygen pipelines, emergency power backup, and is staffed with certified doctors and nurses to transport stabilized patients to metro hospitals.'
  },
  {
    q: 'Why choose MediRail instead of an Air Ambulance or Road Ambulance?',
    a: 'Road ambulances often face severe traffic jams, road shocks, and long travel fatigue. Air ambulances cost ₹2.5 to ₹6 Lakhs per trip and cannot fly in adverse weather or carry patients with certain barometric sensitivity. MediRail provides a super-smooth, pressurized, all-weather ICU transfer at approximately 80–90% lower cost (typically ₹7,000 to ₹15,000 total).'
  },
  {
    q: 'Who is eligible to travel in the Medical Coach?',
    a: 'Patients requiring inter-city transfers for advanced tertiary care (cardiac surgery, cancer treatments, neuro-rehabilitation, organ transplant evaluations, or post-operative travel) who have been medically stabilized by their treating doctor. Patients in active, uncontrolled cardiac arrest or hemorrhage must be taken to the nearest emergency hospital immediately.'
  },
  {
    q: 'Can family attendants travel along with the patient?',
    a: 'Yes! Every patient berth has a designated reclining companion seat (ATT seat) placed directly beside the patient bed so family members can accompany them throughout the journey. One attendant seat is included with the base fare.'
  },
  {
    q: 'How is boarding and de-boarding handled at the railway station?',
    a: 'Coach M-1 features extra-wide sliding doors with a dedicated hydraulic stretcher ramp. At both the departure and arrival stations, our ground ambulance coordination team receives the patient at Platform Ramp Gate 1 for a seamless stretcher-to-stretcher transfer.'
  },
  {
    q: 'Is there a doctor present inside the coach during the journey?',
    a: 'Yes. Each MediRail Coach M-1 has an On-Duty Critical Care Physician and two certified Emergency ICU Nurses on active duty in Zone A (Medical Command Station), equipped with satellite telemetry and real-time hospital tele-consultation.'
  }
];

// Sample prefill data for demonstration / college presentations
const DEMO_PREFILL = {
  fromCity: 'pune',
  toCity: 'mumbai',
  journeyDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
  departureTime: 'morning',
  selectedTrainNumber: '22222',
  patientName: 'Rajesh Sharma',
  patientAge: 58,
  patientGender: 'Male',
  attendantName: 'Sunita Sharma (Spouse)',
  contactPhone: '+91 98201 44520',
  doctorName: 'Dr. Vivek Kulkarni (Ruby Hall Clinic, Pune)',
  conditionCategory: 'cardiac',
  conditionDetails: 'Post-angioplasty stabilized transfer for specialized bypass evaluation at Lilavati Hospital, Mumbai. Patient requires continuous ECG monitoring and low-flow nasal oxygen. Medically certified stable for rail transit.',
  selectedServices: ['oxygen', 'cardiac_monitor', 'stretcher', 'iv_support', 'attendant_seat', 'medical_staff'],
  selectedBerthId: 'M-ICU-01',
  paymentMethod: 'pmjay'
};
