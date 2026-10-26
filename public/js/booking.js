// MediRail Booking Page Logic
document.addEventListener('DOMContentLoaded', async () => {
  const { todayStr, tomorrowStr } = setupDates();

  // Initialize form with persisted state
  const formData = state.formData;

  // Populate City Dropdowns
  const cities = await fetchAPI('/cities');
  if (cities) {
    const createOptions = (selectedId) => {
      return cities.map(city =>
        `<option value="${city.id}" ${city.id === selectedId ? 'selected' : ''}>${city.name} (${city.code})</option>`
      ).join('');
    };

    const fromCityEl = document.getElementById('fromCity');
    const toCityEl = document.getElementById('toCity');
    if (fromCityEl) fromCityEl.innerHTML = createOptions(formData.fromCity);
    if (toCityEl) toCityEl.innerHTML = createOptions(formData.toCity);
  }

  // Setup Date Input
  const dateInput = document.getElementById('journeyDate');
  if (dateInput) {
    dateInput.min = todayStr;
    dateInput.value = formData.journeyDate || tomorrowStr;
  }

  // Set other form values from state
  document.getElementById('patientName').value = formData.patientName;
  document.getElementById('patientAge').value = formData.patientAge;
  document.getElementById('patientGender').value = formData.patientGender;
  document.getElementById('attendantName').value = formData.attendantName;
  document.getElementById('contactPhone').value = formData.contactPhone;
  document.getElementById('doctorName').value = formData.doctorName;

  // Render Train Cards
  async function renderTrainCards() {
    const container = document.getElementById('trainCardsContainer');
    if (!container) return;
    const trains = await fetchAPI('/trains');
    if (!trains) return;

    container.innerHTML = trains.map(train => {
      const isSelected = train.number === formData.selectedTrainNumber;
      return `
        <div class="train-card ${isSelected ? 'selected' : ''}" data-train-number="${train.number}">
          <div class="train-card-header">
            <span class="train-num-name">${train.number} | ${train.name}</span>
            <span class="train-type-badge">${train.type}</span>
          </div>
          <div class="train-timing-row">
            <span><strong>Departure:</strong> ${train.departure}</span>
            <span><strong>Duration:</strong> ${train.duration}</span>
            <span><strong>Speed:</strong> ${train.speed}</span>
          </div>
          <div class="train-doctor-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            ${train.doctorOnBoard}
          </div>
          <div style="display: flex; gap: 0.35rem; margin-top: 0.5rem; flex-wrap: wrap;">
            ${train.tags.map(tag => `<span class="spec-badge" style="background:#e0f2fe; color:#0369a1;">${tag}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.train-card').forEach(card => {
      card.addEventListener('click', () => {
        const trainNum = card.getAttribute('data-train-number');
        formData.selectedTrainNumber = trainNum;
        state.formData = formData;
        container.querySelectorAll('.train-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        showToast(`Selected Train #${trainNum}`);
      });
    });
  }

  // Render Medical Services
  function renderMedicalServices() {
    const container = document.getElementById('medicalServicesGrid');
    if (!container) return;

    const icons = {
      oxygen: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>`,
      ventilator: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
      cardiac: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
      stretcher: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 13h18M3 17h18M5 13V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4M6 17v4M18 17v4"/></svg>`,
      wheelchair: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="4" r="2"/><path d="m15 8 1 5h4"/><path d="M6 13a5 5 0 1 0 5 5V9H8"/></svg>`,
      iv: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2v4M6 2v4M12 2v14M10 16h4M12 20v2"/></svg>`,
      attendant: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>`,
      doctor: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/></svg>`
    };

    container.innerHTML = MEDICAL_SERVICES.map(service => {
      const isChecked = state.selectedServices.includes(service.id);
      return `
        <div class="medical-check-card ${isChecked ? 'checked' : ''}" data-service-id="${service.id}">
          <div class="medical-check-top">
            <div class="med-icon">${icons[service.icon] || icons.doctor}</div>
            <div class="custom-checkbox-ui">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="display:${isChecked ? 'block' : 'none'}">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          <div class="med-service-name">${service.name}</div>
          <div class="med-service-desc">${service.shortDesc}</div>
          <div class="med-service-price">+₹${service.price.toLocaleString('en-IN')}</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.medical-check-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-service-id');
        const iconSvg = card.querySelector('.custom-checkbox-ui svg');
        if (state.selectedServices.includes(id)) {
          state.selectedServices = state.selectedServices.filter(s => s !== id);
          card.classList.remove('checked');
          if (iconSvg) iconSvg.style.display = 'none';
        } else {
          state.selectedServices.push(id);
          card.classList.add('checked');
          if (iconSvg) iconSvg.style.display = 'block';
        }
      });
    });
  }

  async function renderCoachBerths() {
    const container = document.getElementById('berthsGrid');
    if (!container) return;
    const berths = await fetchAPI('/coach/berths');
    if (!berths) return;

    container.innerHTML = berths.map(berth => {
      const isSelected = berth.id === state.selectedBerthId;
      const isOccupied = berth.status === 'occupied';
      let statusBadge = '<span class="berth-status-pill avail">Available</span>';
      if (isSelected) statusBadge = '<span class="berth-status-pill sel">Selected</span>';
      else if (isOccupied) statusBadge = '<span class="berth-status-pill occ">Occupied</span>';

      return `
        <div class="berth-card-interactive ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}"
             data-berth-id="${berth.id}">
          <div class="berth-card-top">
            <span class="berth-id-title">${berth.label}</span>
            ${statusBadge}
          </div>
          <div class="berth-type-label">${berth.type}</div>
          <div class="berth-attendant-pair">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
            Attendant: ${berth.pairedAttendant}
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.berth-card-interactive').forEach(card => {
      card.addEventListener('click', async () => {
        const berthId = card.getAttribute('data-berth-id');
        const berth = berths.find(b => b.id === berthId);
        if (!berth || berth.status === 'occupied') {
          showToast('This berth is already reserved', 'error');
          return;
        }
        state.selectedBerthId = berthId;
        renderCoachBerths();
        renderAttendantSeats();
        updateBerthCallout(berth);
        showToast(`Selected ${berth.label}`);
      });
    });
  }

  function renderAttendantSeats() {
    const container = document.getElementById('attendantSeatsList');
    if (!container) return;
    container.innerHTML = `<div class="attendant-seat-ui active">
      <span><strong>ATT-01</strong> (Linked to Selected Berth)</span>
      <span>★ Assigned</span>
    </div>`;
  }

  function updateBerthCallout(berth) {
    const titleEl = document.getElementById('selectedBerthTitle');
    const descEl = document.getElementById('selectedBerthDesc');
    const badgeEl = document.getElementById('selectedBerthBadge');
    if (berth && titleEl && descEl) {
      titleEl.textContent = `${berth.label} • ${berth.type} (${berth.zone})`;
      descEl.textContent = `${berth.description} Equipment: ${berth.equipment}. Linked Attendant Seat: ${berth.pairedAttendant}.`;
      if (badgeEl) badgeEl.textContent = berth.id;
    }
  }

  function goToStep(stepNum) {
    state.currentStep = stepNum;
    document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`stepPanel${stepNum}`)?.classList.add('active');

    if (stepNum === 3) {
      renderCoachBerths();
      renderAttendantSeats();
    }

    document.querySelectorAll('.step-indicator').forEach(ind => {
      const s = parseInt(ind.getAttribute('data-step'));
      ind.classList.remove('active', 'completed');
      if (s === stepNum) ind.classList.add('active');
      else if (s < stepNum) ind.classList.add('completed');
    });
    const fillPercent = ((stepNum - 1) / 3) * 100;
    document.getElementById('stepperFill') && (document.getElementById('stepperFill').style.width = `${fillPercent}%`);
  }

  async function populateSummaryStep() {
    const cities = await fetchAPI('/cities');
    const trains = await fetchAPI('/trains');
    const berths = await fetchAPI('/coach/berths');

    const fromCityObj = cities.find(c => c.id === state.formData.fromCity) || cities[0];
    const toCityObj = cities.find(c => c.id === state.formData.toCity) || cities[1];
    const trainObj = trains.find(t => t.number === state.formData.selectedTrainNumber) || trains[0];
    const berthObj = berths.find(b => b.id === state.selectedBerthId) || berths[0];

    document.getElementById('sumRoute').textContent = `${fromCityObj.name} (${fromCityObj.code}) ➔ ${toCityObj.name} (${toCityObj.code})`;
    document.getElementById('sumDate').textContent = state.formData.journeyDate;
    document.getElementById('sumTrain').textContent = `${trainObj.number} - ${trainObj.name}`;
    document.getElementById('sumDeparture').textContent = trainObj.departure;
    document.getElementById('sumPatient').textContent = `${state.formData.patientName}, ${state.formData.patientAge} yrs (${state.formData.patientGender})`;
    document.getElementById('sumAttendant').textContent = `${state.formData.attendantName} (${state.formData.contactPhone})`;
    document.getElementById('sumCondition').textContent = `${state.formData.conditionCategory.charAt(0).toUpperCase() + state.formData.conditionCategory.slice(1)} Transfer`;
    document.getElementById('sumBerth').textContent = `${berthObj.label} (${berthObj.type}) + Attendant ${berthObj.pairedAttendant}`;

    const facilitiesWrap = document.getElementById('sumFacilities');
    if (facilitiesWrap) {
      const selectedObjs = MEDICAL_SERVICES.filter(s => state.selectedServices.includes(s.id));
      facilitiesWrap.innerHTML = selectedObjs.map(s => `<span class="spec-badge" style="background:#e0f2fe; color:#0369a1; padding: 0.3rem 0.6rem;">${s.name}</span>`).join(' ');
    }

    calculateAndRenderFare(trainObj, berthObj);
  }

  function calculateAndRenderFare(trainObj, berthObj) {
    const PRICING = { baseRailwayFare: 3200, prioritySurcharge: 1000, governmentSubsidy: -1500 };
    const baseFare = trainObj.baseFare || PRICING.baseRailwayFare;
    const berthModifier = berthObj.priceModifier || 0;
    let servicesTotal = 0;
    MEDICAL_SERVICES.forEach(s => { if (state.selectedServices.includes(s.id)) servicesTotal += s.price; });

    const subtotal = baseFare + berthModifier + servicesTotal + PRICING.prioritySurcharge;
    const netTotal = subtotal + PRICING.governmentSubsidy;

    const fareListEl = document.getElementById('fareList');
    if (fareListEl) {
      fareListEl.innerHTML = `
        <div class="fare-item"><span>Base Fare:</span><span>₹${baseFare.toLocaleString('en-IN')}</span></div>
        <div class="fare-item"><span>Berth Upgrade:</span><span>₹${berthModifier.toLocaleString('en-IN')}</span></div>
        <div class="fare-item"><span>Medical Support:</span><span>₹${servicesTotal.toLocaleString('en-IN')}</span></div>
        <div class="fare-item"><span>Priority Signal:</span><span>₹${PRICING.prioritySurcharge.toLocaleString('en-IN')}</span></div>
        <div class="fare-divider"></div>
        <div class="fare-item subsidy"><span>Govt Subsidy:</span><span>-₹${Math.abs(PRICING.governmentSubsidy).toLocaleString('en-IN')}</span></div>
      `;
    }
    document.getElementById('fareTotalAmount').textContent = `₹${netTotal.toLocaleString('en-IN')}`;
  }

  async function handleBookingConfirmation() {
    const cities = await fetchAPI('/cities');
    const trains = await fetchAPI('/trains');
    const berths = await fetchAPI('/coach/berths');

    const fromCityObj = cities.find(c => c.id === state.formData.fromCity) || cities[0];
    const toCityObj = cities.find(c => c.id === state.formData.toCity) || cities[1];
    const trainObj = trains.find(t => t.number === state.formData.selectedTrainNumber) || trains[0];
    const berthObj = berths.find(b => b.id === state.selectedBerthId) || berths[0];

    const baseFare = trainObj.baseFare || 3200;
    const berthModifier = berthObj.priceModifier || 0;
    let servicesTotal = 0;
    MEDICAL_SERVICES.forEach(s => { if (state.selectedServices.includes(s.id)) servicesTotal += s.price; });
    const totalFare = baseFare + berthModifier + servicesTotal + 1000 - 1500;

    const bookingPayload = {
      bookingId: `MR-${fromCityObj.code}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      pnr: `84${Math.floor(1000000 + Math.random() * 9000000)}`,
      patient: {
        name: state.formData.patientName,
        age: state.formData.patientAge,
        gender: state.formData.patientGender,
        conditionCategory: state.formData.conditionCategory,
        conditionDetails: state.formData.conditionDetails
      },
      attendant: { name: state.formData.attendantName, phone: state.formData.contactPhone },
      journey: { fromCity: fromCityObj.name, toCity: toCityObj.name, date: state.formData.journeyDate, trainNumber: trainObj.number },
      berthId: state.selectedBerthId,
      selectedServices: state.selectedServices,
      paymentMethod: state.formData.paymentMethod,
      totalFare: totalFare
    };

    const savedBooking = await fetchAPI('/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingPayload)
    });

    if (!savedBooking) return;

    // Save final booking to localStorage for confirmation page
    localStorage.setItem('medirail_last_booking', JSON.stringify(savedBooking));

    window.location.href = 'confirmation.html';
  }

  function handleStep1Next() {
    clearErrors();
    let hasError = false;
    const fromCity = document.getElementById('fromCity').value;
    const toCity = document.getElementById('toCity').value;
    const journeyDate = document.getElementById('journeyDate').value;
    const patientName = document.getElementById('patientName').value.trim();
    const patientAge = document.getElementById('patientAge').value.trim();
    const attendantName = document.getElementById('attendantName').value.trim();
    const contactPhone = document.getElementById('contactPhone').value.trim();

    if (fromCity === toCity) { showError('toCity', 'Destination must be different'); hasError = true; }
    if (!journeyDate) { showError('journeyDate', 'Select date'); hasError = true; }
    if (!state.formData.selectedTrainNumber) {
      showToast('Please select a medical train from the available list', 'error');
      hasError = true;
    }

    if (!patientName) { showError('patientName', 'Name required'); hasError = true; }
    const ageNum = parseInt(patientAge);
    if (!patientAge || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      showError('patientAge', 'Valid age (1-120) required');
      hasError = true;
    }
    if (!attendantName) { showError('attendantName', 'Attendant required'); hasError = true; }
    const phoneRegex = /^\d{10}$/;
    if (!contactPhone || !phoneRegex.test(contactPhone)) {
      showError('contactPhone', 'Enter exactly 10 digits (numbers only)');
      hasError = true;
    }

    if (hasError) { showToast('Correct highlighted fields', 'error'); return; }

    const currentData = state.formData;
    Object.assign(currentData, {
      fromCity, toCity, journeyDate,
      patientName, patientAge: ageNum,
      patientGender: document.getElementById('patientGender').value,
      attendantName, contactPhone,
      doctorName: document.getElementById('doctorName').value.trim()
    });
    state.formData = currentData;

    goToStep(2);
    scrollToElement('bookingWizard');
  }

  function handleStep2Next() {
    const disclaimerCheck = document.getElementById('disclaimerCheck').checked;
    if (!disclaimerCheck) { showToast('Acknowledge disclaimer', 'error'); return; }

    const currentData = state.formData;
    currentData.conditionCategory = document.getElementById('conditionCategory').value;
    currentData.conditionDetails = document.getElementById('conditionDetails').value.trim();
    currentData.disclaimerAgreed = disclaimerCheck;
    state.formData = currentData;

    goToStep(3);
    scrollToElement('bookingWizard');
  }

  async function handleStep3Next() {
    if (!state.selectedBerthId) { showToast('Select a berth', 'error'); return; }
    await populateSummaryStep();
    goToStep(4);
    scrollToElement('bookingWizard');
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const parent = field.closest('.form-group');
    if (parent) { parent.classList.add('has-error'); const errEl = parent.querySelector('.error-text'); if (errEl) errEl.textContent = message; }
  }

  function clearErrors() { document.querySelectorAll('.form-group.has-error').forEach(g => g.classList.remove('has-error')); }

  // Event Listeners
  document.getElementById('btnStep1Next')?.addEventListener('click', handleStep1Next);
  document.getElementById('btnStep2Back')?.addEventListener('click', () => goToStep(1));
  document.getElementById('btnStep2Next')?.addEventListener('click', handleStep2Next);
  document.getElementById('btnStep3Back')?.addEventListener('click', () => goToStep(2));
  document.getElementById('btnStep3Next')?.addEventListener('click', handleStep3Next);
  document.getElementById('btnStep4Back')?.addEventListener('click', () => goToStep(3));
  document.getElementById('btnConfirmBooking')?.addEventListener('click', handleBookingConfirmation);
  document.getElementById('btnDemoAutofill')?.addEventListener('click', () => {
    const currentData = state.formData;
    currentData.fromCity = 'pune';
    currentData.toCity = 'mumbai';
    currentData.patientName = 'Rajesh Sharma';
    currentData.patientAge = 58;
    currentData.attendantName = 'Sunita Sharma (Spouse)';
    currentData.contactPhone = '+91 98201 44520';
    state.formData = currentData;
    renderTrainCards();
    showToast('Demo data loaded!');
  });

  // Initial Load
  await renderTrainCards();
  renderMedicalServices();
  await renderCoachBerths();
  renderAttendantSeats();

    // Sync initial form values
  document.getElementById('fromCity').value = formData.fromCity;
  document.getElementById('fromCity').value = formData.fromCity;
  document.getElementById('toCity').value = formData.toCity;
  document.getElementById('journeyDate').value = formData.journeyDate || tomorrowStr;
  document.getElementById('patientName').value = formData.patientName;
  document.getElementById('patientAge').value = formData.patientAge;
  document.getElementById('patientGender').value = formData.patientGender;
  document.getElementById('attendantName').value = formData.attendantName;
  document.getElementById('contactPhone').value = formData.contactPhone;
  document.getElementById('doctorName').value = formData.doctorName;

  goToStep(1);
});
