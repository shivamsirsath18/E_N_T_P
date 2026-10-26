// MediRail Confirmation Page Logic
document.addEventListener('DOMContentLoaded', async () => {
  const savedBooking = JSON.parse(localStorage.getItem('medirail_last_booking'));

  if (!savedBooking) {
    showToast('No booking found. Redirecting to home...', 'error');
    setTimeout(() => { window.location.href = 'index.html'; }, 2000);
    return;
  }

  const cities = await fetchAPI('/cities');
  const trains = await fetchAPI('/trains');
  const berths = await fetchAPI('/coach/berths');

  const fromCityObj = cities.find(c => c.id === savedBooking.journey.fromCity.toLowerCase().split(' ')[0]) || cities[0];
  const toCityObj = cities.find(c => c.id === savedBooking.journey.toCity.toLowerCase().split(' ')[0]) || cities[1];
  const trainObj = trains.find(t => t.number === savedBooking.journey.trainNumber) || trains[0];
  const berthObj = berths.find(b => b.id === savedBooking.berthId) || berths[0];

  document.getElementById('ticketPnr').textContent = savedBooking.pnr;
  document.getElementById('ticketBookingId').textContent = savedBooking.bookingId;
  document.getElementById('ticketFromCityCode').textContent = fromCityObj.code;
  document.getElementById('ticketFromCityName').textContent = `${fromCityObj.name} Central`;
  document.getElementById('ticketToCityCode').textContent = toCityObj.code;
  document.getElementById('ticketToCityName').textContent = `${toCityObj.name} Terminus`;
  document.getElementById('ticketTrainInfo').textContent = `${trainObj.number} | ${trainObj.name}`;
  document.getElementById('ticketCoachNum').textContent = 'Coach M-1';
  document.getElementById('ticketBerthNum').textContent = `${berthObj.label} (${berthObj.type})`;
  document.getElementById('ticketAttendantSeat').textContent = `Seat ${berthObj.pairedAttendant}`;
  document.getElementById('ticketPatientName').textContent = savedBooking.patient.name;
  document.getElementById('ticketPatientDemographics').textContent = `${savedBooking.patient.age} Years / ${savedBooking.patient.gender}`;
  document.getElementById('ticketAttendantInfo').textContent = `${savedBooking.attendant.name} (${savedBooking.attendant.phone})`;
  document.getElementById('ticketDoctorOnBoard').textContent = trainObj.doctorOnBoard;

  const ticketFacTags = document.getElementById('ticketFacilitiesList');
  if (ticketFacTags) {
    const selectedObjs = MEDICAL_SERVICES.filter(s => savedBooking.selectedServices.includes(s.id));
    ticketFacTags.innerHTML = selectedObjs.map(s => `<span class="t-fac-tag">${s.name}</span>`).join(' ');
  }

  document.getElementById('btnPrintTicket')?.addEventListener('click', () => window.print());
  document.getElementById('btnNewBooking')?.addEventListener('click', () => {
    localStorage.removeItem('medirail_last_booking');
    window.location.href = 'book.html';
  });
  document.getElementById('btnBackHome')?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
