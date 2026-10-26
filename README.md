# MediRail Emergency — Medical Train Coach Booking Portal

**Project Type:** College Prototype / Frontend-Only Demo  
**Problem Statement:** *“In a train, add 1 extra medical-equipped coach to transport emergency patients to Tier-1/metro cities.”*

---

## 🌟 Overview

**MediRail Emergency** is a modern, responsive, frontend-only web application designed to demonstrate a high-impact healthcare concept: attaching a specialized, ICU-equipped medical coach (**Coach M-1**) to high-speed express trains (like Vande Bharat and Rajdhani). 

This portal enables patients and families to reserve an ICU bed or stretcher berth for stabilized inter-city medical transfers at approximately **80–90% lower cost** than chartered air ambulances, with certified doctors and nurses on duty throughout the trip.

---

## 🚀 Key Features

### 1. Interactive Multi-Step Booking Wizard
* **Step 1: Journey Details & Patient Information**
  * Selection of Tier-1 metro destinations: Mumbai, Pune, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad.
  * Journey date validation (with today/future date constraints).
  * Express train selector with Coach M-1 status, departure schedules, and doctor assignments.
  * Patient demographics (Name, Age, Gender, Primary contact, Attendant name, Referring doctor).
* **Step 2: Medical Requirements & Life-Support Equipment**
  * Interactive selection cards for:
    * 🫁 Oxygen Support (Piped O2 & cylinder reserve)
    * 🫀 Ventilator Support (Hamilton-T1 portable ICU ventilator)
    * 📊 Cardiac Monitoring (Multi-parameter telemetry display)
    * 🛏️ Hydraulic Stretcher (Shock-absorbing rail mount)
    * ♿ Wheelchair Assistance (Platform ramp transfer)
    * 💉 IV Support & Precision Infusion Pumps
    * 💺 Attendant Companion Seat
    * 🩺 Critical Care Doctor & ICU Nurse Escort
  * Clinical category selector & special instructions input.
  * **Prominent Emergency Medical Disclaimer** alerting that immediate acute resuscitation cases must dial 108/112.
* **Step 3: Interactive Visual Coach Blueprint (Coach M-1)**
  * Visual schematic of a 24-meter air-conditioned LHB Medical Coach.
  * Designated zones:
    * **Zone A:** Medical Station (Doctor Desk, Nurse Monitoring Console, Defibrillator Bay)
    * **Zone B:** Critical Care ICU Stretcher Berths (M-ICU-01, M-ICU-02)
    * **Zone C:** Semi-ICU Stretcher Berths (M-ST-03, M-ST-04, M-ST-05)
    * **Zone D:** Oxygen Assisted Berths (M-OX-06, M-OX-07)
    * **Zone E:** Attendant Reclining Seats (ATT-01 through ATT-07)
  * Live status indicators: **Available (Green)**, **Selected (Blue)**, and **Occupied (Gray)**.
  * Dynamic Berth Details inspection card.
* **Step 4: Booking Summary & Subsidized Fare Breakdown**
  * Full patient and journey review table.
  * Itemized dynamic fare calculation:
    * Base Rail Transit Fare
    * ICU Berth Upgrade
    * Selected Life Support equipment fees
    * Emergency Rail Green Corridor Surcharge
    * National Health Mission Medi-Rail Subsidy discount
  * Simulated billing selector (PM-JAY Ayushman Bharat, CGHS, Health Insurance, Direct UPI).

### 2. Digital E-Ticket & Confirmation
* Celebratory confirmation screen with unique mock **Booking ID** (e.g., `MR-PUNE-2026-8812`) and **PNR** (e.g., `842-9918234`).
* Authentic Indian Railways & MediRail Medical Transit Pass:
  * Route display with green corridor clearance tags.
  * Assigned Coach M-1 and Berth Number.
  * Assigned Attendant Seat.
  * On-duty Critical Care Doctor designation.
  * SVG QR Code & Barcode for platform ambulance gate entry.
  * **Download / Print Ticket** button triggering formatted print CSS (`@media print`).

### 3. College Presentation Helpers
* **⚡ One-Click Demo Auto-Fill**: A dedicated button in the navbar and wizard that instantly loads realistic patient data (e.g., *Rajesh Sharma, 58 yrs, Post-Angioplasty stable transfer from Pune to Mumbai with ICU Berth M-01*). Perfect for rapid live demos during college viva or presentations.

### 4. Educational & Informational Sections
* **Key Benefits:** Medical Equipment, Trained Medical Staff, Fast Metro Connectivity, Emergency Support, Affordable Transit.
* **How It Works:** 4-step clear pipeline from patient intake to station ambulance transfer.
* **Specialized Medical Facilities:** 8 clinical feature cards with detailed equipment specifications.
* **The MediRail Concept & Modality Comparison:** Comprehensive comparison matrix comparing Train ICU vs Air Ambulance vs Road Ambulance.
* **Contact & FAQ Section:** 24/7 Helpline numbers, inquiry form with toast response, and interactive accordion FAQs.

---

## 📁 Project Structure

```
medirail-emergency-booking/
│
├── index.html                  # Single-Page Application HTML with all sections
├── README.md                   # Project documentation
│
├── css/
│   └── style.css               # Clean, responsive styles (Healthcare + Railway theme, Print CSS)
│
├── js/
│   ├── data.js                 # Static mock data (Cities, Trains, Berths, Services, FAQs, Demo Prefill)
│   └── app.js                  # Frontend state machine, wizard navigation, interactive coach map, fare calculation
│
└── assets/
    └── images/
        ├── hero-train.jpg      # Express train with illuminated Coach M-1 & platform ambulance
        └── coach-interior.jpg  # Photorealistic ICU ward interior inside the train coach
```

---

## 💻 How to Run Locally

Because this is a pure frontend project, no database or backend installation is required!

### Option 1: Direct File Opening
Double-click `index.html` or open it with any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended)
You can run a local development server using Python:
```bash
# In the project directory:
python -m http.server 8080
```
Then visit in your browser:
```
http://localhost:8080
```

---

## 🎨 Design System
* **Colors:**
  * Deep Medical Navy (`#0a2540`) — Railway & Trust
  * Healthcare Teal (`#0d9488`, `#14b8a6`) — Clinical & Recovery
  * Emergency Red (`#e11d48`) — High-priority life-saving indicators
  * Soft Slate / White (`#f8fafc`, `#ffffff`) — Modern, clean clinical surfaces
* **Typography:** Plus Jakarta Sans with crisp geometric readability.
* **Icons:** Embedded scalable inline SVGs for zero external dependency risks.
