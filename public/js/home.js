// MediRail Home Page Logic
document.addEventListener('DOMContentLoaded', async () => {
  const { todayStr, tomorrowStr } = setupDates();

  // Setup Quick Search Date
  const quickDateInput = document.getElementById('quickDate');
  if (quickDateInput) {
    quickDateInput.min = todayStr;
    quickDateInput.value = tomorrowStr;
  }

  // Populate Quick Search Dropdowns
  const cities = await fetchAPI('/cities');
  if (cities) {
    const createOptions = (selectedId) => {
      return cities.map(city =>
        `<option value="${city.id}" ${city.id === selectedId ? 'selected' : ''}>${city.name} (${city.code})</option>`
      ).join('');
    };

    const qFrom = document.getElementById('quickFromCity');
    const qTo = document.getElementById('quickToCity');
    if (qFrom) qFrom.innerHTML = createOptions('pune');
    if (qTo) qTo.innerHTML = createOptions('mumbai');
  }

  // Quick Search Button Logic
  document.getElementById('btnQuickSearch')?.addEventListener('click', () => {
    const from = document.getElementById('quickFromCity').value;
    const to = document.getElementById('quickToCity').value;
    const date = document.getElementById('quickDate').value;

    if (from === to) {
      showToast('Source and Destination cannot be the same', 'error');
      return;
    }

    // Persist search to localStorage via state
    const currentData = state.formData;
    currentData.fromCity = from;
    currentData.toCity = to;
    currentData.journeyDate = date;
    state.formData = currentData;

    showToast('Found available medical trains! Redirecting...');
    setTimeout(() => {
      window.location.href = 'book.html';
    }, 800);
  });

  // Hero Demo Fill
  document.getElementById('btnHeroDemo')?.addEventListener('click', () => {
    const currentData = state.formData;
    currentData.fromCity = 'pune';
    currentData.toCity = 'mumbai';
    currentData.patientName = 'Rajesh Sharma';
    currentData.patientAge = 58;
    currentData.attendantName = 'Sunita Sharma (Spouse)';
    currentData.contactPhone = '+91 98201 44520';
    state.formData = currentData;

    showToast('Demo data loaded! Proceed to booking.');
    setTimeout(() => {
      window.location.href = 'book.html';
    }, 800);
  });
});
