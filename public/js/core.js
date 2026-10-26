// MediRail Core Application Logic
// Shared utilities and state management across all pages

const API_BASE = '/api';

// Shared Application State using localStorage for persistence across pages
const state = {
  get formData() {
    const saved = localStorage.getItem('medirail_form_data');
    return saved ? JSON.parse(saved) : {
      fromCity: 'pune',
      toCity: 'mumbai',
      journeyDate: '',
      departureTime: 'morning',
      selectedTrainNumber: '',
      patientName: '',
      patientAge: '',
      patientGender: 'Male',
      attendantName: '',
      contactPhone: '',
      doctorName: '',
      conditionCategory: 'cardiac',
      conditionDetails: '',
      disclaimerAgreed: true,
      paymentMethod: 'pmjay'
    };
  },
  set formData(data) {
    localStorage.setItem('medirail_form_data', JSON.stringify(data));
  },
  get selectedServices() {
    const saved = localStorage.getItem('medirail_selected_services');
    return saved ? JSON.parse(saved) : ['oxygen', 'cardiac_monitor', 'stretcher', 'iv_support', 'attendant_seat', 'medical_staff'];
  },
  set selectedServices(services) {
    localStorage.setItem('medirail_selected_services', JSON.stringify(services));
  },
  get selectedBerthId() {
    return localStorage.getItem('medirail_selected_berth_id') || '';
  },
  set selectedBerthId(id) {
    localStorage.setItem('medirail_selected_berth_id', id);
  }
};

// Shared API Wrapper
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return await response.json();
  } catch (err) {
    console.warn(`API call failed for ${endpoint}, returning mock fallback data.`, err);

    const fallbacks = {
      '/cities': () => CITIES,
      '/trains': () => MEDICAL_TRAINS,
      '/coach/berths': () => COACH_BERTHS,
      '/bookings': (opts) => {
        if (opts.method === 'POST') {
          const data = JSON.parse(opts.body);
          return {
            ...data,
            pnr: `84${Math.floor(1000000 + Math.random() * 9000000)}`,
            bookingId: data.bookingId || `MR-GEN-${Math.floor(1000 + Math.random() * 9000)}`
          };
        }
        return [];
      }
    };

    const fallbackFn = fallbacks[endpoint];
    if (fallbackFn) return fallbackFn(options);

    showToast(err.message, 'error');
    return null;
  }
}

function setupDates() {
  const today = new Date();
  const tomorrow = new Date(Date.now() + 86400000);
  const formatDate = (d) => d.toISOString().split('T')[0];
  const todayStr = formatDate(today);
  const tomorrowStr = formatDate(tomorrow);

  // We don't modify state.formData directly here to avoid overwriting user choices,
  // but we return the strings for the page-specific logic to use.
  return { todayStr, tomorrowStr };
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer') || (() => {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  })();
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : 'toast-success'}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function scrollToElement(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top - 80, behavior: 'smooth' });
}
